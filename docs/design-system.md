# Design System — Mine Performance Academy

## 1. Design direction (Pitch #1)

- **Style:** Clean, premium sports performance brand. Minimal clutter. Strong typography. High-contrast CTAs.
- **Above the fold:** Clear value prop + primary CTA + secondary CTA.
- **Sections (home):** Programs, Coaches, Facility, Athlete Results (leaderboard highlights), Upcoming Events, Testimonials, FAQ, Footer (contact, location, hours).

---

## 2. Tokens

### 2.1 Color (Mine Performance Academy — original style)

| Token | Use | Value |
|-------|-----|--------|
| **Primary** | Brand, primary CTA, nav logo | Dark navy `hsl(220 35% 18%)` |
| **Primary foreground** | Text on primary buttons | Warm white |
| **Accent** | Secondary CTA, “Start here,” labels | Gold/amber `hsl(38 92% 48%)` |
| **Background** | Page background | Warm off-white `hsl(40 20% 98%)` |
| **Muted** | Section alt, secondary text | Warm gray `hsl(40 15% 94%)` |
| **Border** | Cards, dividers | Warm border `hsl(40 15% 88%)` |
| **Card** | Card background | White |

**Contrast:** All text and CTAs meet WCAG AA (4.5:1 normal, 3:1 large).

### 2.2 Typography

| Role | Use | Implementation |
|------|-----|----------------|
| **Font sans** | Body, UI | Inter — 16px base |
| **Font display** | Headlines, logo | Bebas Neue — condensed, athletic |
| **H1** | Page title | `font-display` 2.25rem–3rem, normal tracking-tight |
| **H2** | Section title | `font-display` 1.875rem, normal |
| **H3** | Card/subsection | 1.25rem, semibold |
| **Body** | Paragraphs | 1rem, normal |
| **Small** | Captions, labels | 0.875rem |

### 2.3 Spacing

- **Section padding:** `py-16` or `py-24` (mobile: `py-12`).
- **Container:** `max-w-6xl` or `max-w-7xl` mx-auto, `px-4` / `px-6`.
- **Gap between elements:** `gap-6` to `gap-12` for grids/layouts.

### 2.4 Radii & shadows

- **Cards:** `rounded-lg` or `rounded-xl`, `shadow-sm` or `shadow-md`.
- **Buttons:** `rounded-md` or `rounded-lg`.
- **Images:** `rounded-lg` for consistency.

### 2.5 Motion

- **Transitions:** Short (150–200ms) for hover/focus.
- **Avoid:** Auto-playing carousels; prefer user-controlled or reduced motion.

---

## 3. Components

### 3.1 Buttons

- **Primary:** Solid background (primary color), white text, clear hover state. Use for “Book evaluation,” “Join,” “Register.”
- **Secondary:** Outline or muted fill. Use for “Learn more,” “See full leaderboard.”
- **Size:** Min height ~44px for touch; padding `px-6 py-3` (or equivalent).

### 3.2 Cards (program, coach, event)

- **Layout:** Image (or placeholder) on top, then title, short description, CTA.
- **CTA:** One primary action per card (e.g. “View program,” “Schedule with [name]”).

### 3.3 Navigation

- **Desktop:** Horizontal nav with logo, links, primary CTA on the right.
- **Mobile:** Hamburger or compact nav; primary CTA visible (e.g. in drawer or sticky bar).

### 3.4 Sections

- **Alternating background:** e.g. `bg-background` / `bg-muted` for rhythm.
- **Headings:** H2 for section title; optional short subtext.

### 3.5 Forms (contact, Start wizard)

- **Labels:** Visible, associated with inputs.
- **Validation:** Inline or below field; clear error messages.
- **Submit:** Single primary button; loading state when submitting.

### 3.6 Footer

- **Columns:** Contact (address, phone, hours), Quick links (Programs, Events, FAQ), Legal (Privacy, Terms).
- **Consistent with nav:** Same primary CTA or “Contact” in footer.

---

## 4. Implementation

- **Stack:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui.
- **Tokens:** Implement via Tailwind theme in `tailwind.config.ts` and CSS variables (e.g. `--primary`, `--background`) for easy theming.
- **Components:** Reusable React components in `components/`; use shadcn/ui as base and customize to match tokens above.
