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

  test('primary CTA is clickable and points to contact', async ({ page }) => {
    await page.goto('/');
    const bookCta = page.getByRole('link', { name: 'Book evaluation' }).first();
    await expect(bookCta).toBeVisible();
    await expect(bookCta).toHaveAttribute('href', /\/contact/);
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
    { path: '/privacy', name: 'Privacy' },
    { path: '/terms', name: 'Terms' },
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

test.describe('Start wizard', () => {
  test('wizard works end-to-end: goal → age → recommended program + CTA', async ({ page }) => {
    await page.goto('/start');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Start here');
    await expect(page.getByRole('heading', { level: 2 })).toContainText('your main goal');
    await page.getByRole('button', { name: 'Velocity / throwing' }).click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Age group');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('We recommend')).toBeVisible();
    const ctaLink = page.getByRole('link', { name: /Book evaluation|Schedule session|Join program|Contact us/ }).first();
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', /\/contact/);
  });
});

test.describe('Primary CTA on every page', () => {
  const pagesWithCta = [
    { path: '/', name: 'Home' },
    { path: '/programs', name: 'Programs' },
    { path: '/coaches', name: 'Coaches' },
    { path: '/events', name: 'Events' },
    { path: '/results', name: 'Results' },
    { path: '/contact', name: 'Contact' },
  ];
  for (const { path } of pagesWithCta) {
    test(`primary CTA (Book evaluation) exists and is clickable on ${path}`, async ({ page }) => {
      await page.goto(path);
      const bookCta = page.getByRole('link', { name: /Book evaluation|Book/ }).first();
      await expect(bookCta).toBeVisible();
      await expect(bookCta).toBeEnabled();
    });
  }
});

test.describe('Internal CTAs (no external links)', () => {
  test('Book evaluation link points to contact page', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Book evaluation' }).first();
    await expect(link).toHaveAttribute('href', /\/contact/);
  });

  test('Program card CTA links to contact', async ({ page }) => {
    await page.goto('/programs');
    const ctaLink = page.locator('main a[href="/contact"]').first();
    await expect(ctaLink).toBeVisible();
  });

  test('Events page Register links to contact', async ({ page }) => {
    await page.goto('/events');
    const link = page.locator('main a[href="/contact"]').first();
    await expect(link).toBeVisible();
  });

  test('Results page CTA points to results', async ({ page }) => {
    await page.goto('/results');
    const link = page.getByRole('link', { name: /View results & metrics/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /\/results/);
  });

  test('Privacy and Terms are internal', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Privacy policy/i }).first()).toHaveAttribute('href', /\/privacy/);
    await expect(page.getByRole('link', { name: /Terms of use/i }).first()).toHaveAttribute('href', /\/terms/);
  });
});

test.describe('404 and errors', () => {
  test('404 page renders for unknown route', async ({ page }) => {
    const res = await page.goto('/no-such-page-404');
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/not found|404|could not be found/i).first()).toBeVisible({ timeout: 5000 });
  });
});
