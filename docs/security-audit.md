# Security Audit — Mine Performance Academy

## 1. Threat model

### 1.1 Assets

| Asset | Location / flow | Sensitivity |
|-------|------------------|-------------|
| Site content (programs, coaches, FAQs, contact info) | `content/seed.json`, build-time load in `src/lib/content.ts` | Low (public marketing content) |
| Contact form submissions | Client-only placeholder; no backend yet | When wired: PII (name, email, message) |
| Analytics (placeholder) | `src/lib/analytics.ts` — no keys | N/A |
| StatStak deep-link URLs | From seed; used in links | Low (public URLs) |
| Deployment / build artifacts | Next.js static output, Vercel or similar | Standard |

No session tokens, auth cookies, or admin endpoints in scope. No user accounts.

### 1.2 Actors

- **Visitors:** Anonymous; browse marketing pages, may submit contact form (future).
- **Operators:** Deploy and edit content (seed.json, code); no in-app admin UI.
- **External:** StatStak (booking/events); Google Maps (embed); future analytics provider.

### 1.3 Entry points

| Entry point | Type | Trust boundary |
|-------------|------|----------------|
| All pages (/, /programs, /contact, etc.) | Static / server-rendered | Public |
| Contact form | Client-side only (no API yet) | When backend added: validate + rate limit |
| Links to StatStak | Outbound; URL from seed | No user-controlled redirect |
| Google Maps iframe | Embed; `src` from seed (address) | Server-controlled |
| Sitemap / robots | Static files | Public |

No API routes, file uploads, or user-controlled redirects in current codebase.

### 1.4 Dependencies and external services

- **Next.js 14** — SSR/static; Image optimization with `remotePatterns` (StatStak only).
- **StatStak** — External; links only; no server-side fetch from app.
- **Scripts** (`crawl.ts`, `extract-trainers.ts`) — Run locally; fetch StatStak; not in request path.
- **npm** — ESLint chain has known ReDoS/glob issues (dev-only). Next.js has published DoS advisories for 10–15.x; we use 14.x (see §2).

### 1.5 Deployment surface

- Next.js app: static export + optional Node server.
- No API gateway or separate backend in repo.
- Security headers apply to all responses (see §3).

---

## 2. Findings and severity

| ID | Finding | Severity | Rationale |
|----|---------|----------|------------|
| F1 | No security headers (CSP, HSTS, X-Frame-Options, etc.) | **High** | Defaults leave app exposed to clickjacking, MIME sniffing, and missing transport/redirect hardening. |
| F2 | Dependency vulnerabilities (npm audit) | **High** | 19 high, 1 moderate (ESLint chain ReDoS/glob; Next.js DoS advisories). Dev/build exposure; fix where possible without breaking. |
| F3 | No automated secret scanning | **Med** | Risk of committing secrets; no pre-commit or CI check. |
| F4 | Contact form has no backend yet | **Med** | When backend is added: must validate input (zod), rate limit, and protect against CSRF if using sessions. |
| F5 | `dangerouslySetInnerHTML` for JSON-LD | **Low** | Data is server-only (site, contact from seed). No user input; acceptable with documentation. |
| F6 | No explicit rate limiting | **Low** | No API today; when contact API exists, add rate limiting. |
| F7 | Env vars not validated at startup | **Low** | Optional NEXT_PUBLIC_SITE_URL; fail-safe defaults; add validation when more env added. |

**Not in scope / no finding:** No auth, no CORS (no API), no file upload, no user-controlled redirects, no eval/Function, no unpinned critical runtime deps beyond audit list.

---

## 3. Remediation (implemented)

### 3.1 Security headers (F1)

**Next.js:** `next.config.js` — added `headers()` returning:

- **Strict-Transport-Security** — max-age; includeSubDomains (when HTTPS).
- **X-Content-Type-Options: nosniff**
- **X-Frame-Options: DENY**
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** — restrict camera, microphone, geolocation, etc.
- **Content-Security-Policy** — baseline: default-src 'self'; script/style allow 'unsafe-inline'/'unsafe-eval' for Next.js; frame-src allows Google Maps and StatStak; frame-ancestors 'none'.

**Verification:** Run app, inspect response headers (e.g. DevTools → Network → document request).

### 3.2 Dependencies (F2)

- **npm audit** in CI; fail on High/Critical (see §5).
- **npm audit fix** (no `--force`) applied where safe.
- Remaining high/critical in ESLint/Next.js: documented; upgrade path is major version (Next 16, ESLint 10). Track in security-checklist.

### 3.3 Secret scanning (F3)

- **Gitleaks** (or similar) config in repo; run in CI and as part of `security:check`.
- **.env.example** documents only non-secret placeholders; no real keys.

### 3.4 Contact form / future API (F4, F6)

- When adding a contact API: validate body with **zod** (or equivalent) server-side; enforce **rate limiting** (e.g. in-memory or middleware); use **CSRF** if session-based.
- Placeholder in audit and checklist.

### 3.5 JSON-LD (F5)

- Left as-is; data source is server-only seed. Noted in audit so future changes (e.g. user-driven content in JSON-LD) get reviewed.

### 3.6 Env validation (F7)

- Optional startup check for required env when they exist; document in checklist.

---

## 4. What was changed (summary)

- **next.config.js:** Added security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP).
- **.env.example:** Confirmed no secrets; comment that no API keys belong in repo.
- **CI / scripts:** `security:check` runs: npm audit (fail on high+), secret scan (gitleaks or grep), and optionally header check. CI runs same.
- **Docs:** This audit, security-checklist.md, and README note for `npm run security:check`.

---

## 5. How to verify

```bash
# Install (if not already)
npm install

# Security check (secret scan + audit; fails on Critical vulns)
npm run security:check

# Full audit (includes High; use before release)
npm run security:audit

# Build and run; then inspect headers for root document
npm run build && npm run start
# In browser: DevTools → Network → select document → Headers → Response Headers
```

**Expected:** `security:check` passes when there are no Critical vulnerabilities (current state: 0 Critical, 19 High in dev/ESLint/Next). Response headers include Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy.

**CI:** `.github/workflows/security.yml` runs on push/PR: secret scan + `npm audit --audit-level=critical`. Before release, run `npm run security:audit` and address or document High findings.

---

## 6. Top risks remaining (product decisions)

- **Next.js/ESLint major upgrades:** Fixing some high/critical vulns requires Next 16 and/or ESLint 10. Plan upgrade and regression testing.
- **CSP tightening:** If third-party scripts (analytics, chat) are added, CSP may need to allow their origins; avoid `unsafe-inline` if possible.
- **Contact backend:** When implemented, must include input validation, rate limiting, and (if applicable) CSRF and secure cookie settings.
