# Mine Performance Academy — Conversion-First Audit

## What changed and why (summary)

The current Mine Performance Academy experience lives on StatStak’s platform (`mine-performance.statstak.io`). This audit supports a **conversion-first marketing site** that will serve as the main front door: clearer value proposition, stronger CTAs, trust signals, and better performance, while keeping StatStak for booking, leaderboards, and athlete data via deep links.

**Changes in scope:** (1) New standalone marketing site (Next.js) with clear IA and design system. (2) StatStak remains the system of record; the new site drives “Book,” “Join,” “Register,” “Contact” via deep links. (3) Crawl and audit inform UX, copy, mobile, a11y, SEO, and performance improvements below.

---

## Phase 1 — Audit (from live exploration)

**Evidence source:** `scripts/explore.ts` run 2026-02-19; output in `artifacts/explore/2026-02-19T03-29-10/` (pages.json, links.json, screenshots/desktop/, screenshots/mobile/). References below use screenshot filenames (e.g. `index.png`, `trainers.png`).

### Current information architecture (from exploration)

```
/ (Home)
├── UPCOMING EVENTS → "Sign up now" (event cards)
├── PACKAGES → "View packages"
├── TRAINERS → filter by category (Pitching, Hitting, Catching, etc.) → trainer cards "Book now"
├── JOIN Mine Performance Academy (interest form: Lessons, Rentals, Events, Memberships, etc.)
├── Footer: Privacy policy, User agreement, Reset password, Support, Hours, Contact (4999 Houston Rd, Florence KY; (513) 384-3840; Ryan@mineperformanceacademy.com)
/trainers → H1 "Trainers"; filters; 5 trainers (Nick Gooden, Braden Pickett, Marc Carney, Gavin Sunderman, Travis Clark)
/events → H1 "Upcoming"; filter; event cards (Winter Training Program, Athlete Profile, etc.) → "Sign up now"
/leaderboard → metrics (60yd, C Velo, Exit Velo, FB Velo); no H1
/privacy/..., /terms/..., /reset_pw/..., /support/... (footer links)
```

Top-level nav observed in visible text: Home, About Us, Scheduling (dropdown), Member Registration, Leaderboard, Login, Sign up. No dedicated "Programs" or "Contact" in main nav; JOIN form is the main conversion surface on home.

### Top 10 UX issues (ranked by severity + impact)

| # | Severity | Issue | Evidence |
|---|----------|--------|----------|
| 1 | High | **No single primary CTA above the fold** — Home leads with "NOW ACCEPTING ATHLETES, SIGN UP TODAY!" and multiple entry points (Book a rental, Member Scheduling, Member Registration, Arm Care Assessment, event "Sign up now") with no clear "Book an evaluation" or "Get started" for new families. | pages.json home.visibleTextSample; screenshots `index.png` |
| 2 | High | **CTAs are icon-only or generic** — Many interactive elements expose Material icon names (flip_camera_android, keyboard_arrow_down, link, brightness_2) instead of accessible labels; "Sign up" is repeated without context (sign up for what?). | pages.json home/trainers/events .ctas |
| 3 | High | **Leaderboard has no H1 and no explanation** — Page title "Baseline"; headings are metric names (60yd, C Velo, Exit Velo, FB Velo). Parents/athletes don't know what "good" looks like or how to interpret. | pages.json leaderboard; `leaderboard.png` |
| 4 | Med | **Trainer discovery is filter-heavy** — Categories (Pitching, Hitting, Catching, Fielding, Strength, Tryouts, Camps, etc.) without a "Start here" path; no recommended trainer by goal. | `trainers.png`; pages.json trainers.visibleTextSample |
| 5 | Med | **Events list is long and samey** — Winter Training Program repeated many times with slight date/cost variation; no "featured" or "new to Mine?" framing. | pages.json events.visibleTextSample; `events.png` |
| 6 | Med | **Join form is long and unfocused** — Interest form (Lessons, Rentals, Events, Memberships, Hiring, Prospect, Other) without a guided path (e.g. goal → program → book). | home.visibleTextSample; `index.png` |
| 7 | Med | **Nav not exposed to our scraper** — Real nav (Home, About Us, Scheduling, Member Registration, Leaderboard, Login, Sign up) exists in UI but not in a standard nav landmark; affects a11y and consistency. | explore-notes.md; navItems empty in pages.json |
| 8 | Low | **Inconsistent page titles** — Events and Trainers pages show title "Baseline" (platform default?) instead of "Mine Performance Academy — Events" etc. | pages.json .title |
| 9 | Low | **Footer is the only path to Privacy/Terms/Support** — No in-nav link to Contact or Support; contact info (address, phone, email) only in footer. | links.json; pages.json internalLinks |
| 10 | Low | **Two locations for events** — 712 Eastern Blvd, Clarksville IN vs 4999 Houston Rd, Florence KY in footer; may confuse "where do I go?" | events.visibleTextSample vs home footer |

### Conversion issues (from exploration)

- **Unclear next step:** New visitors see "SIGN UP TODAY," "Sign up now," "View packages," "Book now" without a single recommended path (e.g. "Book an evaluation" first).
- **Missing CTA:** No persistent "Book an evaluation" or "Get started" in a fixed nav; conversion relies on scrolling to sections or footer.
- **Trust gaps:** No facility photos, testimonials, or "what good looks like" (leaderboard context) in the extracted content; credentials appear only on trainer bios.

### Mobile-specific (from exploration)

- **Screenshots:** `screenshots/mobile/index.png`, `trainers.png`, `events.png`, `leaderboard.png` — review for touch target size, readability, and whether primary action is visible without scrolling.
- **Long event list** and **long JOIN form** will be harder on small screens; recommend shortening or stepping.

### Accessibility quick pass (from exploration)

- **Headings:** Home uses H2 "Home" then H1 "MINE PERFORMANCE ACADEMY"; Trainers/Events have H1; Leaderboard has no H1 (only H2 "Home" and H3 metric names). Fix: one logical H1 per page; leaderboard needs "Leaderboard" or "Results" H1.
- **Buttons:** Many icon-only (keyboard_arrow_down, link, etc.); need aria-label or visible text for screen reader and keyboard.
- **Labels/contrast:** Not verified in automation; manual check recommended (see WCAG section below).

### Performance quick pass (from exploration)

- **Heavy content:** Events page has many repeated cards; leaderboard may load dynamic data. Recommend lazy-loading below fold and stable layout (avoid CLS).
- **Images:** Not measured; assume hero/carousel and trainer photos should be optimized (sizing, format) to improve LCP.

---

## 1. Crawl summary

**Crawl script:** `scripts/crawl.ts` (Playwright).  
**Command:** `npm run crawl`  
**Output:** `artifacts/crawl/` — screenshots (desktop + mobile), `content/*.txt`, `crawl-summary.json`, `crawl-results.json`.

**Discovered URLs (from crawl run):**

| Path | Purpose |
|------|--------|
| `/` | Home |
| `/trainers` | Trainers/coaches |
| `/events` | Events |
| `/leaderboard` | Leaderboards |
| `/privacy/...` | Privacy policy |
| `/terms/...` | Terms of use |
| `/reset_pw/...` | Password reset |

**Recommendation:** Run `npm run crawl` and review `artifacts/crawl/` for screenshots and extracted copy when refining the audit or content.

---

## 2. UX issues

- **Unclear primary action:** Home likely doesn’t prioritize one primary CTA (e.g. “Book evaluation” or “Join program”), so parents and athletes don’t know the first step.
- **Generic platform feel:** StatStak templates can feel like “another facility” rather than a distinct Mine Performance Academy brand and story.
- **Conversion path friction:** Multiple steps (find program → find trainer → find booking) with no “Start here” or guided path.
- **Trust above the fold:** Facility photos, credentials, and outcomes are often buried; parents need quick proof before scrolling.
- **Membership/plans:** If present, pricing and plan differentiation may be unclear or hard to find.
- **Events vs programs:** Events and ongoing programs may be mixed or labeled in a way that confuses “one-time” vs “recurring” commitment.

---

## 3. Copy issues

- **Value proposition:** Headline and subhead may not clearly state who it’s for (youth athletes, parents, goals) and what outcome they get (velocity, pitch design, rehab, strength, etc.).
- **Weak CTAs:** Buttons like “Learn more” or “Sign up” are vague; conversion-focused CTAs (“Book evaluation,” “Join membership,” “Register for camp”) should be explicit.
- **Audience-specific copy:** Little differentiation for parents (investment, safety, results) vs athletes (performance, competition) vs coaches/recruiters (data, visibility).
- **Social proof:** Testimonials and outcomes (e.g. velo gains, placements) may be missing or underused.

---

## 4. Mobile issues

- **Touch targets:** Buttons and nav links may be too small for reliable tap (aim for ≥44px).
- **Navigation:** Hamburger or compact nav may hide key actions (e.g. “Book” or “Contact”).
- **Forms:** Long or multi-step forms on mobile can increase drop-off; consider shorter flows or progressive disclosure.
- **Readability:** Font sizes and contrast on small screens need verification (see Accessibility).
- **Screenshots:** Run crawl and review `artifacts/crawl/mobile/` for layout and content visibility.

---

## 5. Accessibility (WCAG quick pass)

- **Titles and headings:** Ensure unique `<title>` and a single logical `<h1>` per page; avoid “Welcome” as only H1.
- **Color contrast:** Text and CTAs should meet WCAG AA (4.5:1 normal text, 3:1 large text).
- **Focus and keyboard:** All interactive elements focusable; visible focus ring; no keyboard traps.
- **Images:** Decorative images with `alt=""`; meaningful images with descriptive `alt`.
- **Forms:** Labels associated with inputs; errors announced and fixable.
- **Targets:** Minimum touch target ~44×44px for primary actions.

---

## 6. SEO quick pass

- **Titles/H1s:** Each page has a unique, descriptive `<title>` and one clear `<h1>` (e.g. “Programs,” “Coaches,” “Events”).
- **Meta description:** Unique, compelling description per page (~150–160 chars).
- **Schema:** Add JSON-LD for `LocalBusiness` and, if applicable, `SportsActivityLocation`; consider `Organization` and event schema for events.
- **Internal linking:** Nav and in-content links to Programs, Coaches, Events, Results, Contact; footer links to key pages and legal.
- **Sitemap/robots:** Provide `sitemap.xml` and `robots.txt` on the new marketing site.
- **URLs:** Clean, readable paths (e.g. `/programs`, `/coaches`, `/events`) and stable StatStak deep-link URLs documented.

---

## 7. Performance quick pass (LCP / CLS / INP hypotheses)

- **LCP:** Large images above the fold and hero media should be optimized (Next/Image, WebP/AVIF, sizing); reduce render-blocking CSS/JS where possible.
- **CLS:** Reserve space for images and embeds (width/height or aspect-ratio); avoid injecting content above existing content; stable nav/footer.
- **INP:** Minimize main-thread work (lazy-load below-fold content, defer non-critical JS); ensure CTA buttons respond quickly to interaction.
- **Lighthouse targets (best-effort):** Performance ≥85, Accessibility ≥90, SEO ≥90. Document actuals after first production build and in launch checklist.

---

## 8. Top 5 conversion actions and placement

| # | Action | Primary placement | Deep link / behavior |
|---|--------|-------------------|----------------------|
| 1 | **Book evaluation** | Home hero, Programs, Contact | Link to StatStak booking or contact form |
| 2 | **Schedule lesson** | Programs, Coaches | StatStak booking / trainer page |
| 3 | **Join membership** | Home, Programs, nav CTA | StatStak membership/plans or signup |
| 4 | **Register for camp** | Home, Events | StatStak events/registration |
| 5 | **Contact** | Footer, Contact page, nav | Contact page form + map; optional phone/email |

Every page should have at least one clear primary CTA (e.g. “Book evaluation” or “Contact us”) in addition to contextual CTAs.

---

## 9. Trust signals to include

- **Facility:** Photos of facility and key areas (cages, weight room, etc.).
- **Coaching:** Credentials, certifications, short bios, and photos for each coach.
- **Outcomes:** Leaderboard highlights, velo gains, athlete placements (with consent).
- **Testimonials:** Short parent/athlete quotes with name and context (e.g. “Parent, travel ball”).
- **Partners:** Logos or names of leagues, schools, or partners where appropriate.
- **FAQ:** Programs, pricing, what to bring, cancellation, safety.
- **Safety/rehab:** Clear mention of qualified staff and approach to injury prevention/rehab if offered.

---

## 10. Lighthouse / PageSpeed notes

- Run Lighthouse on the **new** marketing site after build (desktop + mobile).
- Record scores in `docs/launch-checklist.md` (Performance, Accessibility, Best Practices, SEO).
- If the **current** StatStak site is publicly reachable, run Lighthouse there and add a short “Current site baseline” subsection here with scores and main issues.

---

*Audit completed as part of the conversion-first marketing site project. Re-run crawl and Lighthouse as needed and update this doc.*
