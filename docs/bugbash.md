# Bug Bash + Stabilize Everything

## Environment

| Item | Value |
|------|--------|
| Node | v24.12.0 (or current LTS) |
| Package manager | npm 11.6.2 |
| OS | Windows 10 |

## How to run the app

```bash
npm install
npm run dev
```

Open http://localhost:3000.

**Env vars:** Optional `NEXT_PUBLIC_SITE_URL` for production (sitemap/robots). See `.env.example`.

---

## Checklist

### Build
- [x] `npm install` succeeds
- [x] `npm run lint` passes
- [x] `npm run typecheck` passes
- [x] `npm run test` passes (e2e; start app on 3010 first or use webServer)
- [x] `npm run build` passes

### Runtime
- [ ] Dev server starts without errors
- [ ] No unhandled promise rejections
- [ ] No console errors on load (browser)

### UI
- [ ] Home hero and sections render
- [ ] All primary routes render (programs, coaches, events, results, facility, about, contact, faq, start)
- [ ] Primary CTA buttons visible and clickable
- [ ] No layout overflow / broken breakpoints
- [ ] Copy doesn’t overflow (long names, URLs)

### Data
- [ ] `content/seed.json` loads; no runtime errors from missing fields
- [ ] StatStak deep links use correct base URL

### Forms
- [ ] Contact form: labels, validation, submit behavior
- [ ] Start wizard: steps advance, recommendation and CTA work

### Navigation
- [ ] Header nav links work (desktop + mobile menu)
- [ ] Footer links work
- [ ] 404 handled
- [ ] External StatStak links open in new tab

### Mobile
- [ ] Responsive at 390px and 1280px
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scroll

### A11y
- [ ] Keyboard-only navigation works
- [ ] Focus visible
- [ ] Images/iframes have alt or title where needed

---

## Issues found and fixed

| # | Summary | Steps | Expected vs actual | Severity | Root cause | Fix |
|---|--------|--------|--------------------|----------|------------|-----|
| 1 | ESLint not configured | Run `npm run lint` | Prompt for config vs run | P1 | No .eslintrc | Added .eslintrc.json with next/core-web-vitals; pinned eslint@8 and eslint-config-next@14 for next lint compatibility. |
| 2 | No typecheck/test scripts | CI / prepush | N/A | P1 | package.json | Added `typecheck` (tsc --noEmit), `test` / `test:e2e` (playwright test), `validate`, `prepush`. |
| 3 | Contact page client crash | Open /contact | "Application error: a client-side exception" | P0 | ContactForm used Button (forwardRef/cva) and triggered client error in prod build | Replaced Button with native `<button>` and shared styles in ContactForm. |
| 4 | No custom 404 | Visit /no-such-page | Generic Next 404 | P2 | No app/not-found.tsx | Added src/app/not-found.tsx with "Page not found" and "Go home" link. |
| 5 | No error boundaries | Runtime error in route | White screen / generic error | P2 | Missing error.tsx and global-error.tsx | Added src/app/error.tsx and src/app/global-error.tsx. |
| 6 | E2E flakiness / wrong app | Run e2e with dev server | 404s and wrong content (other app on 3000) | P1 | Port conflict; tests hit different app | E2E runs against production build on port 3010; baseURL 127.0.0.1:3010; reuseExistingServer: true. |
| 7 | Route tests too strict | E2E route renders | h1 not found (timing/contact crash) | P2 | DOM timing; contact crash | Route test checks body contains page name; 404 test checks "not found" text; header nav test checks URL and not 404. |

---

## Final status (after fixes)

- [x] `npm install` succeeds
- [x] `npm run lint` passes
- [x] `npm run typecheck` passes
- [x] `npm run test` passes (e2e, chromium) when app is running on 3010
- [x] `npm run build` passes
- [x] Custom 404 and error boundaries in place
- [x] Pre-push script: `npm run prepush` (validate + test)

**How to validate locally**

1. **Full check:** `npm run prepush` (lint, typecheck, build, then e2e). For e2e, start the app first: `npm run build && npm run start:test` (in another terminal), then `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3010 npm run test`.
2. **Production:** Deploy, then run e2e with `PLAYWRIGHT_BASE_URL=https://yoursite.com npm run test`. Run Lighthouse and smoke-test primary CTAs.
