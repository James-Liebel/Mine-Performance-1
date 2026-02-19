# Mine Performance Academy — Marketing Site

Conversion-first marketing site for Mine Performance Academy. Built with Next.js 14+, TypeScript, and Tailwind. StatStak remains the backend for booking, events, and leaderboards; this site is the front door with clear CTAs and deep links.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run start:test` | Run production server on port 3010 (for e2e) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Playwright e2e (use `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3010` if server is already running) |
| `npm run validate` | lint + typecheck + build |
| `npm run prepush` | validate + test (run before pushing) |
| `npm run security:check` | secret scan + npm audit (fails on Critical) |
| `npm run security:audit` | full npm audit (High/Critical) |
| `npm run security:secrets` | scan source for likely committed secrets |
| `npm run crawl` | Crawl StatStak site (Playwright); output in `artifacts/crawl/` |
| `npm run extract-trainers` | Extract trainers from StatStak and update `content/seed.json` |

## Content

Edit `content/seed.json` for programs, coaches, testimonials, FAQs, events, and contact info. Run `npm run extract-trainers` to pull trainer data from the StatStak trainers page when feasible.

## Docs

- **Final review:** `docs/final-review.md` — last full run, upgrade note, one-command check
- **Bug bash:** `docs/bugbash.md` — QA checklist, issues found/fixed, how to validate
- **Audit:** `docs/audit.md` — UX, copy, mobile, a11y, SEO, performance
- **IA & flows:** `docs/ia-and-flows.md` — site map and user journeys
- **Design system:** `docs/design-system.md` — tokens and components
- **Launch:** `docs/launch-checklist.md` — pre/post launch checklist
- **Pitch:** `docs/pitch-1-narrative.md` — problem, solution, benefits

## Pages

- `/` — Home
- `/programs` — Programs with deep links
- `/coaches` — Coaches (seed or StatStak)
- `/events` — Events; deep link to StatStak registration
- `/results` — Leaderboard highlights; deep link to StatStak
- `/facility` — Facility photos and amenities
- `/about` — About
- `/contact` — Map and contact form
- `/faq` — FAQ
- `/start` — “Start here” wizard (goal → program → booking)

## Environment

- `NEXT_PUBLIC_SITE_URL` — Production URL (for sitemap/robots). Optional; defaults to `https://mineperformance.com`.
- Do not commit secrets or API keys; use `.env.local` (gitignored) and document placeholders in `.env.example`.

## Security

- **Before release:** See `docs/security-checklist.md`.
- **Audit:** `docs/security-audit.md` (threat model, findings, remediation).
- **Checks:** `npm run security:check` (secret scan + dependency audit; fails on Critical). `npm run security:audit` for full audit (High/Critical).

## Lighthouse

After deploy, run Lighthouse and record scores in `docs/launch-checklist.md`. Targets: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90.
