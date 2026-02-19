/**
 * Playwright crawl of Mine Performance Academy (StatStak) site.
 * Saves: screenshots (desktop + mobile), extracted text, discovered links.
 * Output: /artifacts/crawl/
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://mine-performance.statstak.io';
const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts', 'crawl');

const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 390, height: 844 },
} as const;

interface CrawlResult {
  url: string;
  timestamp: string;
  links: string[];
  textContent: string;
  title: string;
  h1: string | null;
  navLinks: string[];
}

const initialPaths = ['/', '/trainers', '/events', '/leaderboard'];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function sanitizeFilename(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '_') || 'index';
}

async function crawlPage(
  page: any,
  url: string,
  viewportName: keyof typeof VIEWPORTS
) {
  const result: CrawlResult = {
    url,
    timestamp: new Date().toISOString(),
    links: [],
    textContent: '',
    title: '',
    h1: null,
    navLinks: [],
  };

  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    if (!response || !response.ok()) {
      result.textContent = `[HTTP ${response?.status() ?? 'error'}]`;
      return result;
    }

    await page.waitForTimeout(2000);

    result.title = (await page.title()) || '';
    result.h1 = await page
      .locator('h1')
      .first()
      .textContent()
      .catch(() => null);

    const rawLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      return anchors
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((href) => href.startsWith('http') || href.startsWith('/'));
    });
    result.links = [...new Set(rawLinks as string[])];

    const nav = await page.locator('nav a[href], [role="navigation"] a[href]');
    const navCount = await nav.count();
    for (let i = 0; i < Math.min(navCount, 30); i++) {
      const href = await nav.nth(i).getAttribute('href');
      if (href) result.navLinks.push(href.startsWith('http') ? href : new URL(href, url).href);
    }
    result.navLinks = [...new Set(result.navLinks)];

    result.textContent = await page.evaluate(() => {
      const body = document.body;
      if (!body) return '';
      const clone = body.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
      return clone.innerText?.replace(/\s+/g, ' ').trim().slice(0, 50000) || '';
    });
  } catch (e) {
    result.textContent = `[Crawl error: ${e instanceof Error ? e.message : String(e)}]`;
  }

  return result;
}

async function main() {
  ensureDir(ARTIFACTS_DIR);
  ensureDir(path.join(ARTIFACTS_DIR, 'screenshots'));
  ensureDir(path.join(ARTIFACTS_DIR, 'desktop'));
  ensureDir(path.join(ARTIFACTS_DIR, 'mobile'));
  ensureDir(path.join(ARTIFACTS_DIR, 'content'));

  const baseOrigin = new URL(BASE_URL).origin;
  const toVisit = new Set<string>();
  initialPaths.forEach((p) => toVisit.add(p.startsWith('http') ? p : BASE_URL + (p === '/' ? '' : p)));
  const visited = new Set<string>();
  const results: Record<string, CrawlResult> = {};

  const browser = await chromium.launch({ headless: true });

  const collectAndVisit = async (page: any, viewportName: 'desktop' | 'mobile') => {
    let queue = Array.from(toVisit);
    while (queue.length) {
      for (const url of queue) {
        if (visited.has(url)) continue;
        visited.add(url);
        console.log(`[${viewportName}] ${url}`);
        try {
          const result = await crawlPage(page, url, viewportName);
          results[url] = result;
          result.links.forEach((href) => {
            try {
              const u = new URL(href, BASE_URL);
              if (u.origin === baseOrigin) {
                const full = u.pathname ? u.origin + u.pathname + (u.search || '') : u.href;
                toVisit.add(full);
              }
            } catch (_) {}
          });
          const slug = sanitizeFilename(url.replace(BASE_URL, '') || 'index');
          const subDir = path.join(ARTIFACTS_DIR, viewportName);
          await page.screenshot({
            path: path.join(subDir, `${slug}.png`),
            fullPage: true,
          }).catch(() => {});
        } catch (e) {
          console.warn(`Failed ${url}:`, e);
        }
      }
      queue = Array.from(toVisit).filter((u) => !visited.has(u));
    }
  };

  try {
    for (const viewportName of ['desktop', 'mobile'] as const) {
      const viewport = VIEWPORTS[viewportName];
      const context = await browser.newContext({
        viewport,
        userAgent:
          viewportName === 'mobile'
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
            : undefined,
      });
      const page = await context.newPage();
      await collectAndVisit(page, viewportName);
      await context.close();
    }

    const contentDir = path.join(ARTIFACTS_DIR, 'content');
    const allDiscovered = new Set<string>();
    Object.values(results).forEach((r) => r.links.forEach((l) => allDiscovered.add(l)));
    const summary: { urls: string[]; links: string[]; results: Record<string, { title: string; h1: string | null; linkCount: number }> } = {
      urls: Array.from(visited),
      links: Array.from(allDiscovered),
      results: {},
    };
    for (const [url, r] of Object.entries(results)) {
      const slug = sanitizeFilename(url.replace(BASE_URL, '') || 'index');
      fs.writeFileSync(
        path.join(contentDir, `${slug}.txt`),
        `URL: ${url}\nTitle: ${r.title}\nH1: ${r.h1 ?? '(none)'}\n\n--- LINKS ---\n${r.links.join('\n')}\n\n--- NAV ---\n${r.navLinks.join('\n')}\n\n--- BODY TEXT ---\n${r.textContent.slice(0, 15000)}`,
        'utf-8'
      );
      summary.results[url] = { title: r.title, h1: r.h1, linkCount: r.links.length };
    }
    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, 'crawl-summary.json'),
      JSON.stringify(summary, null, 2),
      'utf-8'
    );
    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, 'crawl-results.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log('Crawl complete. Output:', ARTIFACTS_DIR);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
