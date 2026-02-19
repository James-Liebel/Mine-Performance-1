import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('home loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mine Performance Academy/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('hero has primary and secondary CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Book evaluation' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Start here/ }).first()).toBeVisible();
  });

  test('primary CTA is clickable and points to StatStak', async ({ page }) => {
    await page.goto('/');
    const bookCta = page.getByRole('link', { name: 'Book evaluation' }).first();
    await expect(bookCta).toBeVisible();
    await expect(bookCta).toHaveAttribute('href', /statstak\.io/);
  });
});

test.describe('Navigation', () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/programs', name: 'Programs' },
    { path: '/coaches', name: 'Coaches' },
    { path: '/events', name: 'Events' },
    { path: '/results', name: 'Results' },
    { path: '/facility', name: 'Facility' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/faq', name: 'FAQ' },
    { path: '/start', name: 'Start' },
  ];

  for (const { path, name } of routes) {
    test(`${name} (${path}) renders`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('body')).toContainText(
        path === '/' ? 'Mine Performance' : name,
        { timeout: 10000, ignoreCase: true }
      );
    });
  }

  test('header nav links work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Programs', exact: true }).first().click();
    await expect(page).toHaveURL(/\/programs/, { timeout: 15000 });
    await expect(page.locator('body')).not.toContainText('page not found', { timeout: 2000 });
  });

  test('mobile menu opens and Programs link works', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /toggle menu/i }).click();
    await page.getByRole('link', { name: 'Programs', exact: true }).first().click();
    await expect(page).toHaveURL(/\/programs/);
  });
});

test.describe('Deep links to StatStak', () => {
  test('Book evaluation link points to StatStak', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Book evaluation' }).first();
    await expect(link).toHaveAttribute('href', /statstak\.io/);
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('Program card CTA links to StatStak', async ({ page }) => {
    await page.goto('/programs');
    const statstakLink = page.locator('main a[href*="statstak"]').first();
    await expect(statstakLink).toBeVisible();
    await expect(statstakLink).toHaveAttribute('href', /statstak\.io/);
  });

  test('Events page has link to StatStak', async ({ page }) => {
    await page.goto('/events');
    const link = page.locator('main a[href*="statstak"]').first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /statstak\.(io|labs\.com)/);
  });

  test('Results page leaderboard CTA points to StatStak', async ({ page }) => {
    await page.goto('/results');
    const link = page.getByRole('link', { name: /See full leaderboard/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /statstak\.io\/leaderboard/);
  });
});

test.describe('404 and errors', () => {
  test('404 page renders for unknown route', async ({ page }) => {
    const res = await page.goto('/no-such-page-404');
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/not found|404|could not be found/i).first()).toBeVisible({ timeout: 5000 });
  });
});
