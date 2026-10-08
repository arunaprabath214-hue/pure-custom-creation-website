# PCC Release Candidate Regression Checklist

Branch: `pcc-audit-improvements-2026-10`

## Route smoke test

- [x] `/`
- [x] `/custom-water`
- [x] `/solutions`
- [x] `/industries`
- [x] `/our-work`
- [x] `/how-it-works`
- [x] `/about`
- [x] `/contact`
- [x] `/request-a-quote`
- [x] `/privacy`
- [x] Unknown route returns 404

## Source-level functional checks

- [x] Header contains all implemented primary routes.
- [x] Mobile menu has open/close state, Escape handling, and closes on navigation.
- [x] Skip link targets `#main-content`.
- [x] Main content has a programmatic focus target.
- [x] Primary quote CTAs target `/request-a-quote`.
- [x] Quote form uses native required-field validation.
- [x] Phone field requires at least 9 characters.
- [x] Quantity is constrained to 1–1,000,000.
- [x] Logo file is limited to 5 MB and accepted file types are constrained.
- [x] Honeypot prevents submission when populated.
- [x] Quote database failure is surfaced as a fallback state before WhatsApp continuation.
- [x] WhatsApp message is URL-encoded before continuation.
- [x] Privacy route is linked from the quote form and footer.
- [x] No hardcoded Supabase URL/key fallback remains in source.

## Automated checks

- [x] `npm run build` passes on the audit branch snapshot.
- [ ] `npm run lint` currently fails on the remote audit branch snapshot with 325 Prettier errors and 5 Fast Refresh warnings. Formatter-only remediation was verified locally but could not be pushed from the sandbox.

## Browser-only checks requiring owner/manual verification

- [ ] Desktop visual/navigation click-through.
- [ ] Mobile visual/navigation click-through.
- [ ] Mobile menu interaction on a real browser.
- [ ] Keyboard tab-order and focus visibility across every route.
- [ ] Quote form submission against the intended production Supabase project.
- [ ] RLS/security behavior against the intended production Supabase project.

These items are intentionally not marked PASS because this cycle does not have verified production infrastructure or a browser automation harness.
