/**
 * Autonomous exploration of Mine Performance (StatStak) live site.
 * - Visits target pages, clicks nav, scrolls for lazy content
 * - Captures: full-page screenshots (desktop + mobile), headings, CTAs, nav, footer, links, text
 * - Output: artifacts/explore/{timestamp}/pages.json, links.json, screenshots/
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://mine-performance.statstak.io';
const TARGET_PATHS = ['/', '/trainers', '/trainers/', '/events', '/events/', '/leaderboard', '/leaderboard/'];
const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  mobile: { width: 390, height: 844 },
} as const;

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const OUT_DIR = path.join(process.cwd(), 'artifacts', 'explore', timestamp);
const SCREENSHOTS_DIR = path.join(OUT_DIR, 'screenshots');

interface PageSummary {
  url: string;
  title: string;
  headings: { level: number; text: string }[];
  ctas: { text: string; href?: string; role?: string }[];
  navItems: { text: string; href: string }[];
  footerText: string;
  internalLinks: string[];
  visibleTextSample: string;
  timestamp: string;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slug(url: string): string {
  const u = url.replace(BASE_URL, '').replace(/\/$/, '') || 'index';
  return u.replace(/\//g, '_').replace(/[^a-z0-9_-]/gi, '_') || 'index';
}

async function explorePage(
  page: any,
  url: string,
  viewportName: keyof typeof VIEWPORTS
): Promise<PageSummary> {
  const summary: PageSummary = {
    url,
    title: '',
    headings: [],
    ctas: [],
    navItems: [],
    footerText: '',
    internalLinks: [],
    visibleTextSample: '',
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
    if (!res || !res.ok()) return summary;
    await page.waitForTimeout(2500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    summary.title = (await page.title()) || '';

    summary.headings = await page.evaluate(() => {
      const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(els).map((el) => ({
        level: parseInt(el.tagName.charAt(1), 10),
        text: (el as HTMLElement).innerText?.trim().slice(0, 200) || '',
      }));
    });

    summary.ctas = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, [role="button"], a.btn, a[class*="button"], input[type="submit"]'));
      return buttons.slice(0, 20).map((el) => {
        const a = el.tagName === 'A' ? (el as HTMLAnchorElement).href : undefined;
        return {
          text: (el as HTMLElement).innerText?.trim().slice(0, 100) || (el as HTMLInputElement).value || '',
          href: a,
          role: el.getAttribute('role') || el.tagName.toLowerCase(),
        };
      });
    });

    summary.navItems = await page.evaluate((base: string) => {
      const nav = document.querySelector('nav, [role="navigation"], header');
      if (!nav) return [];
      const links = nav.querySelectorAll('a[href]');
      return Array.from(links)
        .map((a) => ({ text: (a as HTMLElement).innerText?.trim(), href: (a as HTMLAnchorElement).href }))
        .filter((x) => x.text && x.href.startsWith(base))
        .slice(0, 30);
    }, BASE_URL);

    summary.footerText = await page.evaluate(() => {
      const footer = document.querySelector('footer, [role="contentinfo"]');
      return footer ? (footer as HTMLElement).innerText?.trim().slice(0, 1500) : '';
    });

    const allLinks = await page.evaluate((base: string) => {
      const anchors = document.querySelectorAll('a[href]');
      return Array.from(anchors)
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((h) => h.startsWith(base));
    }, BASE_URL) as string[];
    summary.internalLinks = [...new Set(allLinks)];

    summary.visibleTextSample = await page.evaluate(() => {
      const body = document.body;
      if (!body) return '';
      const clone = body.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('script, style, noscript').forEach((e) => e.remove());
      return (clone.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 4000);
    });

    const ssDir = path.join(SCREENSHOTS_DIR, viewportName);
    ensureDir(ssDir);
    await page.screenshot({
      path: path.join(ssDir, `${slug(url)}.png`),
      fullPage: true,
    }).catch(() => {});
  } catch (e) {
    summary.visibleTextSample = `[Error: ${e instanceof Error ? e.message : String(e)}]`;
  }
  return summary;
}

async function main() {
  ensureDir(OUT_DIR);
  ensureDir(SCREENSHOTS_DIR);

  const baseOrigin = new URL(BASE_URL).origin;
  const visited = new Set<string>();
  const toVisit = new Set(TARGET_PATHS.map((p) => baseOrigin + (p === '/' ? '' : p)));
  const allPages: PageSummary[] = [];
  const linkGraph: Record<string, string[]> = {};

  const run = async (headless: boolean) => {
    const browser = await chromium.launch({
      headless,
      args: headless ? ['--no-sandbox'] : [],
    });
    const context = await browser.newContext({
      viewport: VIEWPORTS.desktop,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    let queue = Array.from(toVisit);
    while (queue.length) {
      for (const url of queue) {
        if (visited.has(url)) continue;
        visited.add(url);
        console.log('Exploring', url);
        try {
          await page.setViewportSize(VIEWPORTS.desktop);
          const summaryDesktop = await explorePage(page, url, 'desktop');
          allPages.push(summaryDesktop);
          linkGraph[url] = summaryDesktop.internalLinks;
          summaryDesktop.internalLinks.forEach((l) => toVisit.add(l));
          await page.setViewportSize(VIEWPORTS.mobile);
          await explorePage(page, url, 'mobile');
        } catch (e) {
          console.warn('Failed', url, e);
        }
      }
      queue = Array.from(toVisit).filter((u) => !visited.has(u));
    }

    await context.close();
    await browser.close();
  };

  await run(true);

  fs.writeFileSync(
    path.join(OUT_DIR, 'pages.json'),
    JSON.stringify({ timestamp, baseUrl: BASE_URL, pages: allPages }, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'links.json'),
    JSON.stringify({ timestamp, linkGraph }, null, 2),
    'utf-8'
  );
  console.log('Done. Output:', OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
