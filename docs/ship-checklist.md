# Ship Checklist — Build verification & release

Use this checklist to verify the build and E2E before shipping. For content, SEO, and launch steps see `docs/launch-checklist.md`.

---

## Build verification

- [ ] `npm ci` (or `npm install`) completes without errors
- [ ] `npm run build` completes successfully (no TypeScript or build errors)
- [ ] No critical linter errors: `npm run lint` (if configured)
- [ ] Production URL / env: `NEXT_PUBLIC_SITE_URL` (or equivalent) set for production
- [ ] StatStak base URL in content (`statstakBaseUrl` in seed) points to correct tenant

---

## E2E verification (Playwright)

Run: `npx playwright test` (or `npm run test:e2e` if script exists).

- [ ] **Home loads** — home page loads, title contains “Mine Performance Academy”, H1 visible
- [ ] **Hero CTAs** — “Book evaluation” and “Start here” visible on home
- [ ] **Primary CTA** — “Book evaluation” link points to StatStak and is clickable
- [ ] **Navigation** — all routes render (/, /programs, /coaches, /events, /results, /facility, /about, /contact, /faq, /start)
- [ ] **Header nav** — Programs link from home goes to /programs
- [ ] **Mobile menu** — at 390px width, toggle opens and Programs link works
- [ ] **Start wizard** — goal → age → Next → “We recommend” + CTA visible; CTA links to StatStak
- [ ] **Primary CTA on each page** — “Book evaluation” (or “Book”) visible and clickable on Home, Programs, Coaches, Events, Results, Contact
- [ ] **Deep links** — Book evaluation, program card CTA, events page link, results leaderboard CTA all point to StatStak and open in new tab where expected
- [ ] **404** — unknown route returns 404 and shows not-found message

---

## Pre-ship summary

| Check            | Status |
|------------------|--------|
| Build passes     | ☐      |
| E2E passes       | ☐      |
| StatStak links   | ☐      |
| Content reviewed | ☐ (see launch-checklist) |
| SEO / metadata   | ☐ (see launch-checklist) |

---

## Quick commands

- **Build:** `npm run build`
- **E2E:** `npx playwright test`
- **E2E headed:** `npx playwright test --headed`
- **Explore live site:** `npm run explore` (if script exists; outputs to `artifacts/explore/`)

---

## Troubleshooting

### Webpack cache / vendor-chunks errors and 404s for `_next/static/*`

If you see:
- `ENOENT: no such file or directory, lstat '.next\server\vendor-chunks\clsx.js'` (or similar)
- `Can't resolve './vendor-chunks/...' in '.next\server'`
- `GET /_next/static/css/app/layout.css 404` and other `_next/static` 404s

the `.next` build cache is stale or corrupted. Fix:

1. Stop the dev/server process.
2. Delete the cache: `Remove-Item -Recurse -Force .next` (PowerShell) or `rm -rf .next` (bash).
3. Rebuild: `npm run build`.
4. Start again: `npm run start` or `npm run dev`.

---

*Ship checklist created for Phase 5. Keep in sync with `tests/e2e/smoke.spec.ts`.*
