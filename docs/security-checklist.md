# Security checklist — before release

Use this list before each production release. For full context, see `docs/security-audit.md`.

---

## Before release

### Secrets and environment

- [ ] No secrets, API keys, or tokens in the repo (run `npm run security:check`).
- [ ] `.env.example` documents only non-secret placeholders; real values in `.env.local` or host env.
- [ ] Required env vars (if any) are validated at startup or documented for deploy.

### Dependencies

- [ ] `npm audit` run; no **Critical** or **High** in production runtime deps (or accepted with documented exception).
- [ ] `npm run security:check` passes (audit + secret scan).

### Headers and transport

- [ ] Security headers present on responses: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP (see `next.config.js`).
- [ ] App served over HTTPS in production.

### Input and abuse (when applicable)

- [ ] If contact (or other) API exists: server-side validation (e.g. zod), rate limiting, and CSRF protection (if session-based) are in place.
- [ ] No user-controlled redirects (open redirects); links to external sites use allowlisted bases (e.g. StatStak from config).

### Code and config

- [ ] No `dangerouslySetInnerHTML` with user-controlled or unsanitized input (JSON-LD from server-only seed is acceptable).
- [ ] No `eval`, `new Function`, or unsafe template usage with user input.
- [ ] Error pages and logging do not expose stack traces or sensitive data to clients.

### CI

- [ ] CI runs `npm run security:check` and fails on configured thresholds (e.g. High/Critical audit).

---

## After adding new features

- **New API routes:** Add validation, rate limiting, and document in security-audit.
- **New env vars / secrets:** Document in `.env.example` (placeholders only); never commit real values.
- **New third-party scripts (analytics, chat):** Update CSP in `next.config.js` if needed; prefer allowlisting origins over `unsafe-inline` where possible.
- **Auth or sessions:** Use secure cookies (Secure, HttpOnly, SameSite), CSRF protection, and standard auth best practices.
