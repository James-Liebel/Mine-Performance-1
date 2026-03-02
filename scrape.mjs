import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to memberships...');
    await page.goto('https://mine-performance.statstak.io/memberships/mine-performance-academy', { waitUntil: 'networkidle' });

    // Wait a few seconds to ensure dynamic content loads completely
    await page.waitForTimeout(5000);

    console.log('Extracting text content...');
    // The packages are likely within some inner container, but let's just grab the whole body's inner text,
    // or specifically look for all text components that might be pricing/package names.
    const data = await page.evaluate(() => {
        // Try to find the container holding the cards.
        // If we just grab body.innerText it might be messy but it should have everything.
        return document.body.innerText;
    });

    fs.writeFileSync('all_packages.txt', data);
    console.log('Done, saved to all_packages.txt');

    await browser.close();
})();
