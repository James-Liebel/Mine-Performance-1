# Mine Performance Academy — Conversion-First Audit

## What changed and why (summary)

The current Mine Performance Academy experience lives on StatStak’s platform (`mine-performance.statstak.io`). This audit supports a **conversion-first marketing site** that will serve as the main front door: clearer value proposition, stronger CTAs, trust signals, and better performance, while keeping StatStak for booking, leaderboards, and athlete data via deep links.

**Changes in scope:** (1) New standalone marketing site (Next.js) with clear IA and design system. (2) StatStak remains the system of record; the new site drives “Book,” “Join,” “Register,” “Contact” via deep links. (3) Crawl and audit inform UX, copy, mobile, a11y, SEO, and performance improvements below.

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
