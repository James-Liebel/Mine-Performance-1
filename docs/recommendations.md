# Mine Performance Academy — Recommendations (MVP + V2)

**Purpose:** Prioritized changes based on audit (Phase 1) and competitive benchmark (Phase 2). Each item includes user problem → solution → outcome, UI-level description, dependencies, and validation metric.

**References:** `docs/audit.md`, `docs/competitive-benchmark.md`, `docs/ia-and-flows.md`.

---

## MVP (1–2 weeks)

### 1. Clear nav: Programs, Coaches, Events, Results, Start Here, Contact

| Item | Detail |
|------|--------|
| **User problem** | Current StatStak nav (Home, About Us, Scheduling, Member Registration, Leaderboard, Login, Sign up) doesn’t surface “Programs” or “Contact”; “Start here” doesn’t exist. Visitors don’t know where to go first. |
| **Proposed solution** | Marketing site nav: **Programs** \| **Coaches** \| **Events** \| **Results** \| **Start Here** \| **About** \| **Contact**, plus persistent primary CTA (see #2). |
| **Expected outcome** | Lower confusion; higher engagement with program discovery and conversion pages. |
| **Exact UI change** | Top nav bar (desktop) and hamburger (mobile) with these labels. “Start Here” visually emphasized (e.g. secondary style or badge). Footer: Contact, Facility, FAQ, Privacy, Terms. |
| **Dependencies** | Content: page titles and meta; technical: nav component, routing to /programs, /coaches, /events, /results, /start, /contact. |
| **Validation metric** | Nav click-through rate (Programs, Coaches, Events, Start Here); time to first CTA click. |

---

### 2. Persistent primary CTA: “Book an Evaluation” or “Get Started”

| Item | Detail |
|------|--------|
| **User problem** | Home and other pages offer many CTAs (Sign up, View packages, Book now) with no single recommended first step; no sticky CTA in nav. |
| **Proposed solution** | One primary CTA label site-wide: **“Book an evaluation”** (or “Get started”) in nav and hero. Button links to StatStak booking or /start wizard. |
| **Expected outcome** | Clear next step; higher conversion to first touch (booking or start wizard). |
| **Exact UI change** | Nav: primary button right-aligned “Book an evaluation” (or “Get started”). Home hero: same CTA above the fold. Every page: at least one instance of this CTA (nav and/or in-page). |
| **Dependencies** | StatStak booking URL or /start; CTA component; copy approval. |
| **Validation metric** | CTA click rate; conversion to booking or start-wizard completion. |

---

### 3. Start Here wizard: goal + age + schedule → recommended program/trainer + next action

| Item | Detail |
|------|--------|
| **User problem** | Long JOIN form and filter-heavy trainer/event lists don’t guide new families to a single path. |
| **Proposed solution** | **/start** wizard: 3–4 steps — (1) Goal (e.g. velo, hitting, strength), (2) Age band, (3) Schedule/availability → output: recommended program(s) and/or trainer(s) + “Book evaluation” or “View program” linking to StatStak. |
| **Expected outcome** | Higher completion of a guided path; higher quality leads. |
| **Exact UI change** | Stepped form with progress indicator; result screen with 1–2 program/trainer cards and primary CTA. Mobile-friendly. |
| **Dependencies** | Logic mapping goal/age/schedule to program/trainer (can be rule-based from seed content); deep links to StatStak. |
| **Validation metric** | Wizard start → completion rate; CTA click from result screen. |

---

### 4. Coaches/trainer browsing: filters by specialty + credential highlights

| Item | Detail |
|------|--------|
| **User problem** | Trainer page is filter-heavy without “recommended for you”; credentials buried in bios. |
| **Proposed solution** | **/coaches** page: cards with photo, name, 1–2 specialty tags, short credential line; optional filters (Pitching, Hitting, Catching, Strength). “Start here” or “Not sure? Take the quiz” link. |
| **Expected outcome** | Faster coach discovery; more “Schedule with [name]” clicks. |
| **Exact UI change** | Grid of coach cards; filter chips or sidebar; each card: “Schedule” / “Book” → StatStak. Placeholder where client content needed. |
| **Dependencies** | Coach data (from StatStak or seed); specialty/credential fields. |
| **Validation metric** | Filter usage; “Schedule” / “Book” clicks per coach. |

---

### 5. Events discovery: featured + filter + clear registration

| Item | Detail |
|------|--------|
| **User problem** | Events list is long and repetitive; no “featured” or “new to Mine?”; registration intent unclear. |
| **Proposed solution** | **/events** page: “Featured” or “Recommended” section (e.g. 1–2 events); then full list with filter (age, type, date). Each card: title, date, location, “Register” → StatStak. |
| **Expected outcome** | More event page visits and registrations. |
| **Exact UI change** | Hero or section “Featured events”; event cards with Register button; optional filter. Deep link each “Register” to StatStak event. |
| **Dependencies** | Event feed or manual curation; StatStak event URLs. |
| **Validation metric** | Event page views; “Register” clicks; (if measurable) StatStak registration completions. |

---

### 6. Results/leaderboards: metric explanations + age bands + “what good looks like”

| Item | Detail |
|------|--------|
| **User problem** | Leaderboard has no H1, no explanation of 60yd, C Velo, Exit Velo, FB Velo; parents/athletes don’t know what “good” is. |
| **Proposed solution** | **/results** page: H1 “Results” or “Leaderboard”; short copy explaining each metric (placeholder: “Placeholder — needs client content”); age bands if data allows; “What good looks like” (ranges or percentiles with client approval). CTA “See full leaderboard” → StatStak. |
| **Expected outcome** | Trust and clarity; more clicks to full leaderboard. |
| **Exact UI change** | Headings and definitions block; optional leaderboard highlight widget or table; primary CTA to StatStak leaderboard. |
| **Dependencies** | Client-provided metric definitions and “what good looks like”; no fabricated outcomes. |
| **Validation metric** | “See full leaderboard” CTR; time on page. |

---

### 7. Trust: facility story, credentials, testimonials, safety/rehab, location/hours

| Item | Detail |
|------|--------|
| **User problem** | Facility photos, testimonials, and safety/rehab messaging absent or buried; contact only in footer. |
| **Proposed solution** | **Facility** page (or section on About): photos + short copy (placeholder where needed). **About**: story, mission. **Coaches**: credentials in cards. **Home**: 1–2 testimonial quotes (placeholder) and address/hours in footer + Contact page. **FAQ**: safety, what to bring, cancellation (placeholder). |
| **Expected outcome** | Higher trust; lower bounce on key pages; more contact/form submissions. |
| **Exact UI change** | Facility: image grid + captions. About: narrative. Home: testimonial strip + footer with address, phone, email, hours. Contact: form + map. FAQ: accordion or list. |
| **Dependencies** | Client content (photos, copy, testimonials); map embed. |
| **Validation metric** | Contact form submits; scroll depth on Facility/About; FAQ opens. |

---

## V2 (1–2 months)

### 8. Deeper Start Here logic and email capture

| Item | Detail |
|------|--------|
| **User problem** | Wizard may not capture lead if user doesn’t book immediately. |
| **Proposed solution** | At end of /start: optional email capture (“Get your recommendation by email”); follow-up email with program/trainer summary + link to book. |
| **Expected outcome** | More leads; nurture path. |
| **UI** | Optional email field on result step; thank-you state; backend or 3rd-party email. |
| **Dependencies** | Email sending (e.g. Resend, SendGrid) and consent; privacy policy. |
| **Validation metric** | Email capture rate; open/click from follow-up. |

---

### 9. Program pathways and pricing clarity

| Item | Detail |
|------|--------|
| **User problem** | “Packages” and “programs” may be unclear; pricing opaque. |
| **Proposed solution** | **/programs** page: pathway view (e.g. “New to Mine?” → Evaluation → Program A/B/C); cards with outcome-focused copy; “From $X” or “View packages” → StatStak where applicable. |
| **Expected outcome** | Clearer commitment level; more package views. |
| **UI** | Pathway diagram or stepped list; program cards; CTA to StatStak packages. |
| **Dependencies** | Program names, outcomes, pricing (client); StatStak package URLs. |
| **Validation metric** | Program card clicks; “View packages” CTR. |

---

### 10. Testimonials and outcomes (with consent)

| Item | Detail |
|------|--------|
| **User problem** | No visible testimonials or outcome stories on live site. |
| **Proposed solution** | Dedicated testimonials section (Home + optional /about); short quotes + name + context (“Parent, travel ball”); optional outcome (e.g. velo gain) only with client-provided, consent-based data. |
| **Expected outcome** | Higher trust and conversion. |
| **UI** | Carousel or grid; quote + attribution; “Placeholder — needs client content” until real. |
| **Dependencies** | Client-collected testimonials and consent; no fabricated outcomes. |
| **Validation metric** | Section visibility/scroll; correlation with form submits. |

---

### 11. Accessibility and performance hardening

| Item | Detail |
|------|--------|
| **User problem** | Icon-only CTAs, missing H1 on leaderboard, possible contrast/touch target issues. |
| **Proposed solution** | All interactive elements have accessible names (aria-label or visible text); one H1 per page; focus order and focus visible; contrast and touch targets (≥44px) verified; images optimized; lazy-load below fold. |
| **Expected outcome** | Lighthouse A11y ≥90; better Performance; fewer support issues. |
| **UI** | Code and design pass; no visible layout change. |
| **Dependencies** | Audit list from docs/audit.md; image pipeline. |
| **Validation metric** | Lighthouse scores; manual keyboard/screen reader check. |

---

### 12. SEO and schema

| Item | Detail |
|------|--------|
| **User problem** | Inconsistent titles; no LocalBusiness schema; sitemap/robots not confirmed. |
| **Proposed solution** | Unique title and meta description per page; JSON-LD LocalBusiness (and events if applicable); sitemap.xml and robots.txt; clean URLs. |
| **Expected outcome** | Better discoverability; rich results where supported. |
| **UI** | No visible change; meta and script output. |
| **Dependencies** | Address, hours, phone (client); sitemap generation. |
| **Validation metric** | Search Console coverage; rich result test. |

---

## Summary table

| Priority | Area | MVP / V2 | Key metric |
|----------|------|----------|------------|
| 1 | Nav | MVP | Nav CTR (Programs, Coaches, Events, Start Here) |
| 2 | Primary CTA | MVP | CTA clicks; booking/wizard completion |
| 3 | Start Here wizard | MVP | Wizard completion; CTA from result |
| 4 | Coaches | MVP | Schedule/Book clicks per coach |
| 5 | Events | MVP | Register clicks; registrations |
| 6 | Results/leaderboard | MVP | Full leaderboard CTR |
| 7 | Trust (facility, testimonials, contact) | MVP | Contact submits; scroll depth |
| 8 | Email capture at /start | V2 | Email capture rate |
| 9 | Program pathways + pricing | V2 | Package view CTR |
| 10 | Testimonials/outcomes | V2 | Client content; conversion correlation |
| 11 | A11y + performance | V2 | Lighthouse scores |
| 12 | SEO + schema | V2 | Search Console; rich results |

---

*Recommendations completed. Implement in repo per Phase 4; validate with Phase 5 tests and docs/ship-checklist.md.*
