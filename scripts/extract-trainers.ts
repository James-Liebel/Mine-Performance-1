/**
 * Extract trainer/coach names, bios, and categories from StatStak trainers page.
 * Populates or merges into content/seed.json.
 * If scraping is blocked or structure differs, fall back to manual seed.json and document.
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const TRAINERS_URL = 'https://mine-performance.statstak.io/trainers';
const SEED_PATH = path.join(process.cwd(), 'content', 'seed.json');

interface ExtractedCoach {
  name: string;
  title?: string;
  bio?: string;
  categories: string[];
  image?: string | null;
  statstakPath: string;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const coaches: ExtractedCoach[] = [];

  try {
    const page = await browser.newPage();
    await page.goto(TRAINERS_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000);

    // Try common patterns: cards with name, bio, categories
    const cards = await page.locator('[data-testid="trainer-card"], .trainer-card, article, .coach-card').all();
    if (cards.length === 0) {
      // Fallback: any repeated block that might be a trainer (e.g. list items or divs with name-like text)
      const possibleBlocks = await page.locator('main [class*="trainer"], main [class*="coach"], main [class*="staff"]').all();
      for (const block of possibleBlocks.length ? possibleBlocks : []) {
        const name = await block.locator('h2, h3, [class*="name"]').first().textContent().catch(() => null);
        if (name?.trim()) {
          const bio = await block.locator('p, [class*="bio"]').first().textContent().catch(() => null);
          const categories: string[] = [];
          const links = await block.locator('a').all();
          for (const a of links) {
            const text = await a.textContent();
            if (text && text.length < 30) categories.push(text.trim());
          }
          coaches.push({
            name: name.trim(),
            bio: bio?.trim() || undefined,
            categories: categories.length ? categories : ['Training'],
            statstakPath: '/trainers',
          });
        }
      }
    } else {
      for (const card of cards) {
        const name = await card.locator('h2, h3, h4, [class*="name"]').first().textContent().catch(() => null);
        if (!name?.trim()) continue;
        const title = await card.locator('[class*="title"], [class*="role"]').first().textContent().catch(() => null);
        const bio = await card.locator('p, [class*="bio"]').first().textContent().catch(() => null);
        const tags = await card.locator('[class*="tag"], [class*="category"], a').all();
        const categories: string[] = [];
        for (const t of tags) {
          const text = await t.textContent();
          if (text && text.length < 40 && !text.startsWith('http')) categories.push(text.trim());
        }
        const img = await card.locator('img').first().getAttribute('src').catch(() => null);
        coaches.push({
          name: name.trim(),
          title: title?.trim(),
          bio: bio?.trim(),
          categories: categories.length ? [...new Set(categories)] : ['Training'],
          image: img || null,
          statstakPath: '/trainers',
        });
      }
    }

    // If we found nothing, try grabbing any h2/h3 names in main content as last resort
    if (coaches.length === 0) {
      const headings = await page.locator('main h2, main h3').all();
      for (const h of headings) {
        const name = await h.textContent();
        if (name && name.trim().length > 1 && name.trim().length < 80) {
          coaches.push({
            name: name.trim(),
            categories: ['Training'],
            statstakPath: '/trainers',
          });
        }
      }
    }
  } catch (e) {
    console.warn('Extract failed:', e);
  } finally {
    await browser.close();
  }

  let seed: Record<string, unknown> = {};
  if (fs.existsSync(SEED_PATH)) {
    seed = JSON.parse(fs.readFileSync(SEED_PATH, 'utf-8'));
  }
  const seedCoaches = (seed.coaches as ExtractedCoach[] | undefined) || [];
  if (coaches.length > 0) {
    (seed as { coaches: ExtractedCoach[] }).coaches = coaches.map((c, i) => ({
      ...c,
      id: `coach-${i + 1}`,
    }));
    fs.writeFileSync(SEED_PATH, JSON.stringify(seed, null, 2), 'utf-8');
    console.log('Extracted', coaches.length, 'coaches; updated', SEED_PATH);
  } else {
    console.log('No coaches extracted. Keep manual content/seed.json. Document: StatStak trainers page structure may differ or require auth.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
