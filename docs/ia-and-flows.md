# Information Architecture & Primary User Journeys

## 1. Site map (proposed)

```
/ (Home)
├── /programs          — Programs with cards + deep links
├── /coaches           — Coaches (from StatStak trainers or seed)
├── /events            — Featured events → StatStak registration
├── /results           — Leaderboard highlights → StatStak leaderboard
├── /facility          — Photos + amenities
├── /about             — Story, mission, values
├── /contact           — Map, form, hours
├── /faq               — FAQ
└── /start             — “Start here” wizard (goal, age, availability → program + booking)
```

**Legal (footer):** Privacy, Terms — can link to StatStak policy URLs or host own.

---

## 2. Primary user journeys

### 2.1 Parent: “I want to buy training for my kid”

1. **Land on Home** → See value prop + “Book evaluation” / “Start here.”
2. **Optional: Start here** → Goal (e.g. velo, hitting), age, availability → Recommended program + CTA to book.
3. **Programs** → Browse programs → “Book evaluation” or “Schedule lesson” (→ StatStak).
4. **Coaches** → See credentials and bios → “Schedule with [name]” (→ StatStak).
5. **Trust:** Facility, testimonials, FAQ, Contact.

**Key pages:** Home, Start, Programs, Coaches, FAQ, Contact.

---

### 2.2 Athlete: “I want to get better / see my results”

1. **Land on Home or Results** → See “Join” or “View leaderboard.”
2. **Programs** → Choose program → “Join membership” or “Register” (→ StatStak).
3. **Events** → See camps/clinics → “Register” (→ StatStak).
4. **Results** → See leaderboard highlights → “See full leaderboard” (→ StatStak).

**Key pages:** Home, Programs, Events, Results.

---

### 2.3 Coach / Recruiter: “I want to see athlete data”

1. **Land on Home or Results** → Understand facility and data.
2. **Results** → Leaderboard highlights + “View full leaderboard” (→ StatStak).
3. **Contact** → For access or partnership.

**Key pages:** Home, Results, Contact.

---

## 3. Cross-cutting elements

- **Global nav:** Home, Programs, Coaches, Events, Results, About, FAQ, Contact. Primary CTA (e.g. “Book evaluation”) in nav.
- **Footer:** Contact, location, hours, Privacy, Terms, social (if any).
- **Every page:** One clear primary CTA; consistent design system and spacing.

---

## 4. StatStak deep-link strategy

| Marketing page | StatStak target |
|----------------|-----------------|
| Book evaluation / Schedule | StatStak booking or trainer page |
| Join membership | StatStak membership/plans |
| Register for event | StatStak events/registration |
| Full leaderboard | `https://mine-performance.statstak.io/leaderboard` |
| Trainers/coaches | `https://mine-performance.statstak.io/trainers` |

Use a single config (e.g. `STATSTAK_BASE_URL`) so links can be updated in one place.
