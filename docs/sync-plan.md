# Sync plan: Mine-Performance-1 ← Mine-Performance-2 (source of truth)

**MP2 is read-only.** This doc lists what MP2 contains so MP1 can mirror logic/structure; only presentation/theme differs in MP1.

## Framework & tooling (MP2)

- **Framework:** Next.js 14.2.35, **App Router** (root `app/`, not `src/app/`)
- **Package manager:** npm
- **Test runner (unit):** Vitest (`lib/**/*.test.ts`, `packages/core/**/*.test.ts`, `src/**/*.test.ts`)
- **Test runner (e2e):** Playwright (`tests/e2e/*.spec.ts`)
- **TypeScript:** paths `@/*` → `./*`, `@mine-performance/core` → `./packages/core/src`, `@mine-performance/core/hooks` → `./packages/core/src/hooks`

## Routes (MP2 app/)

| Route | File(s) |
|-------|--------|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx`, `app/about/AboutPageContent.tsx` |
| `/contact` | `app/contact/page.tsx`, `ContactForm.tsx`, `ContactPageContent.tsx`, `BookingBanner.tsx` |
| `/coaches` | `app/coaches/page.tsx`, `app/coaches/CoachesClient.tsx` |
| `/events` | `app/events/page.tsx`, `EventsClient.tsx`, `EventsPageContent.tsx` |
| `/faq` | `app/faq/page.tsx` |
| `/programs` | `app/programs/page.tsx` |
| `/rentals` | `app/rentals/page.tsx` |
| `/results` | `app/results/page.tsx`, `ResultsClient.tsx`, `ResultsPageContent.tsx` |
| `/start` | `app/start/page.tsx` |
| `/login` | `app/login/page.tsx` |
| `/member-registration` | `app/member-registration/page.tsx` |
| `/profile` | `app/profile/layout.tsx`, `page.tsx`, `calendar/page.tsx`, `payments/page.tsx`, `stats/page.tsx` |
| `/admin` | `app/admin/layout.tsx`, `AdminNav.tsx`, `page.tsx`, `coaches/page.tsx`, `events/page.tsx`, `login/page.tsx`, `pricing/page.tsx`, `results/page.tsx`, `users/page.tsx`, `waivers/page.tsx`, `components/AdminConfirmModal.tsx` |
| **API** | `app/api/admin/*`, `app/api/contact`, `app/api/coaches`, `app/api/events`, `app/api/health`, `app/api/member/*`, `app/api/memberships`, `app/api/results`, `app/api/site-content`, `app/api/stripe/*`, `app/api/waivers/*`, `app/api/webhooks/stripe` |
| **Root** | `app/layout.tsx`, `globals.css`, `error.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts` |

## Shared libraries & content

- **content/**  
  - `content/faq.ts` — FAQ entries for chatbot
- **lib/**  
  - `lib/faq-matcher.ts`, `lib/faq-matcher.test.ts`  
  - `lib/utils.ts`, `lib/nav-config.ts`, `lib/seo.ts`, `lib/config.ts`, `lib/env.ts`  
  - `lib/auth.ts`, `lib/auth-options.ts`, `lib/booking-store.ts`, `lib/coach-store.ts`, `lib/event-store.ts`, `lib/events-server.ts`, `lib/events-types.ts`, `lib/membership-store.ts`, `lib/memberships.ts`, `lib/percentiles.ts`, `lib/percentiles.test.ts`, `lib/plans.ts`, `lib/rate-limit.ts`, `lib/results-store.ts`, `lib/site-content-store.ts`, `lib/user-store.ts`, `lib/user-service.ts`, `lib/waiver-store.ts`  
  - `lib/credit-transactions.ts`, `lib/images.ts`, `lib/integrations.ts`, `lib/metrics.ts`, `lib/persist.ts`, `lib/rentals.ts`, `lib/slot-display.ts`, `lib/stripe/server.ts`, `lib/subscription.ts`, `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/api-schemas.ts`  
- **Chat widget:** `components/ChatWidget.tsx` (uses `content/faq.ts`, `lib/faq-matcher.ts`), wired in `app/layout.tsx`
- **Start wizard:** `app/start/page.tsx` (redirect to login in MP2); logic in `packages/core/src/wizard.ts`
- **Results logic:** `app/results/`, `lib/results-store.ts`, `lib/percentiles.ts`, `components/ProgressChart.tsx`, `MetricCard.tsx`
- **Integrations:** `src/integrations/` — `index.ts`, `index.test.ts`, `noop.ts`, `noop.test.ts`, `statstak.ts`, `statstak.test.ts`, `types.ts`
- **Core package:** `packages/core/` — `package.json`, `tsconfig.json`, `src/index.ts`, `constants.ts`, `hooks.ts`, `links.ts`, `links.test.ts`, `metrics.ts`, `transforms.ts`, `transforms.test.ts`, `types.ts`, `wizard.ts`, `subscription.ts`

## Tests (MP2)

- **E2E (Playwright):** `tests/e2e/smoke.spec.ts`, `chat-widget.spec.ts`, `deep-links.spec.ts`, `faq-chatbot.spec.ts`, `filters.spec.ts`, `integrations.spec.ts`, `nav.spec.ts`, `start-wizard.spec.ts`
- **Unit (Vitest):** `lib/faq-matcher.test.ts`, `lib/percentiles.test.ts`, `packages/core/src/links.test.ts`, `packages/core/src/transforms.test.ts`, `src/integrations/index.test.ts`, `noop.test.ts`, `statstak.test.ts`

## Configs to align (MP1)

- `next.config.js`, `tsconfig.json` (paths), `playwright.config.ts`, `vitest.config.ts`, `.env.example`
- `package.json`: scripts and dependencies to match MP2 (Next 14.2.x, vitest, next-auth, supabase, stripe, etc.)
