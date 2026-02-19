# Launch Checklist — Mine Performance Academy Marketing Site

Use this list before and after going live.

---

## Pre-launch

### Content & copy
- [ ] Replace placeholder content in `content/seed.json`: address, phone, email, hours
- [ ] Add real coach names/bios (run `npm run extract-trainers` or edit seed manually)
- [ ] Add real testimonials and event names/dates
- [ ] Add facility photos (update `/facility` and hero if desired)
- [ ] Confirm all StatStak deep-link URLs in seed and nav (booking, trainers, events, leaderboard)

### SEO
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL (e.g. `https://mineperformance.com`)
- [ ] Verify `metadataBase` in `src/app/layout.tsx` matches production URL
- [ ] Confirm unique `<title>` and meta description per page (see each page’s `metadata`)
- [ ] Test `sitemap.xml` and `robots.txt` at production URL
- [ ] Confirm JSON-LD (SportsActivityLocation) in layout and adjust address/contact if needed

### Functionality
- [ ] All internal links work (Programs, Coaches, Events, Results, Facility, About, Contact, FAQ, Start)
- [ ] All StatStak deep links open correctly (Book evaluation, trainers, events, leaderboard, privacy/terms)
- [ ] Contact form: wire to backend or email service (currently placeholder)
- [ ] “Start here” wizard: goal → age → recommended program → CTA to StatStak

### Design & UX
- [ ] Primary CTA visible on every page (e.g. “Book evaluation” in header/footer)
- [ ] Mobile: nav, tap targets (≥44px), readable text
- [ ] Consistent spacing and design tokens (see `docs/design-system.md`)

### Performance & accessibility
- [ ] Run Lighthouse (desktop + mobile) and record scores below
- [ ] Fix any critical a11y issues (labels, contrast, focus)
- [ ] Images: use Next.js `Image` where possible; add `alt` text

### Analytics
- [ ] Add real analytics (e.g. GA4, Plausible) and replace placeholder in `src/lib/analytics.ts`
- [ ] Track CTA clicks and Start-wizard completions

---

## Lighthouse (record after first production deploy)

| Metric        | Desktop (target) | Mobile (target) | Actual desktop | Actual mobile |
|---------------|------------------|-----------------|----------------|---------------|
| Performance   | ≥ 85             | ≥ 85            | ________       | ________      |
| Accessibility| ≥ 90             | ≥ 90            | ________       | ________      |
| Best Practices | —              | —               | ________       | ________      |
| SEO           | ≥ 90             | ≥ 90            | ________       | ________      |

*Run at production URL; document LCP/CLS/INP if needed.*

---

## Post-launch

- [ ] Point DNS to new hosting (Vercel, Netlify, or other)
- [ ] If replacing StatStak as main domain: set up redirects from old URLs to new (or to StatStak deep links)
- [ ] Submit sitemap in Google Search Console
- [ ] Monitor analytics and conversion paths
- [ ] Schedule review of content and links (e.g. quarterly)

---

## Quick commands

- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Crawl current StatStak site:** `npm run crawl` (output in `artifacts/crawl/`)
- **Extract trainers:** `npm run extract-trainers` (updates `content/seed.json`)
