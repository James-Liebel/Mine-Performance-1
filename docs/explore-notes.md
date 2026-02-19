# Exploration notes — autonomous site exploration

## Automation summary

- **Script:** `scripts/explore.ts` (Playwright, headless Chromium).
- **Run:** `npx tsx scripts/explore.ts`
- **Output:** `artifacts/explore/{timestamp}/` — `pages.json`, `links.json`, `screenshots/desktop/`, `screenshots/mobile/`.
- **Latest run:** `2026-02-19T03-29-10` (15 pages explored).

## Blocking / behavior

- **No auth blocking:** Site loaded without login. All target URLs returned 200.
- **Nav selector:** StatStak’s nav is not in a `<nav>` or `[role="navigation"]` that matches our selector; `navItems` in pages.json are empty. Top-level links were still discovered via `internalLinks` from footer and in-page links.
- **CTAs:** Many “buttons” are Material icon labels (e.g. `flip_camera_android`, `keyboard_arrow_down`), so CTA extraction reflects icon names rather than visible button copy. Human review of screenshots is needed for real CTA wording.
- **Viewport:** Fixed to use `page.setViewportSize()` (Playwright API); initial run failed with `context.setViewportSize` (not a function). Corrected in script.

## Pages discovered

| URL path | Title / H1 | Notes |
|----------|------------|--------|
| `/` | MINE PERFORMANCE ACADEMY | Home; sections: Upcoming Events, Packages, Trainers, JOIN form |
| `/trainers`, `/trainers/` | Trainers | 5 trainers: Nick Gooden, Braden Pickett, Marc Carney, Gavin Sunderman, Travis Clark; category filters |
| `/events`, `/events/` | Upcoming | Winter Training Program events; Sign up now; filter by category |
| `/leaderboard` | (no H1) | Metrics: 60yd, C Velo, Exit Velo, FB Velo |
| `/privacy/...`, `/terms/...`, `/reset_pw/...`, `/support/...` | — | Legal/support from footer |

## Evidence references for audit

- **Screenshots:** `artifacts/explore/2026-02-19T03-29-10/screenshots/desktop/` and `.../mobile/` — filenames by path (e.g. `index.png`, `trainers.png`, `events.png`, `leaderboard.png`).
- **Structured data:** `pages.json` (per-page headings, CTAs, internalLinks, visibleTextSample), `links.json` (link graph).

## Related docs

- **Audit:** `docs/audit.md` (Phase 1 — uses this exploration evidence).
- **Ship / E2E:** `docs/ship-checklist.md` lists build and E2E verification; `tests/e2e/smoke.spec.ts` covers home, nav, Start wizard, primary CTA, and StatStak deep links.

## Recommendations for future runs

- Run with `headed: true` once to confirm no captcha/overlay.
- Optionally increase scroll delay for heavy lazy-load.
- Add click-through on first-level nav (Scheduling, Member Registration, Leaderboard) if they open dropdowns or new views.
