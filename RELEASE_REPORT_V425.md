# KAVICO Full Project Release Report v425

## Release scope

v425 is a public form-abuse-resilience and browser/cache-boundary hardening release built on verified Full Project v424. Private Admin v414 remains unchanged.

## Public form guard

Both FA/EN Project Brief forms now carry six non-PII guard fields and a progressive-enhancement runtime that:

- initializes a per-page nonce and render timestamp;
- records elapsed form time and advisory abuse signals;
- blocks a filled honeypot;
- prevents accidental repeated submission after the first valid submit event;
- restores controls correctly when a page is returned from BFCache.

A Node VM regression harness executes the guard and verifies first-submit, duplicate-submit, and honeypot behavior.

### Trust boundary

Client abuse scoring is advisory and can be spoofed by a hostile client. v425 does not present it as server-side rate limiting. The existing Private Admin v414 ingestion boundary remains authoritative and already rejects duplicate `event_id` and duplicate non-followup `lead_reference`, while signed ingestion retains its replay/skew controls.

## Header hardening

The public header policy adds CORP, Origin-Agent-Cluster, X-Permitted-Cross-Domain-Policies and a broader deny-by-default Permissions Policy while retaining v424 CSP/form-action restrictions.

## Service Worker cache boundary

v425 avoids cache-key amplification and unsafe partial/mismatched cache entries:

- no SW cache for query-string, Range, or Authorization-bearing requests;
- cache writes require HTTP 200;
- no-store/private/Set-Cookie responses are rejected;
- image/font MIME family is verified;
- document navigation uses Navigation Preload when available;
- API/write paths remain bypassed.

## Preserved delivery contracts

- 204 Public HTML files / 124 indexable pages.
- Responsive coverage remains 348/348 eligible images.
- Production SRI remains 405/405 CSS and 136/136 JS.
- Public deploy still contains only the three shared lead contracts and no Private Admin tree.
- Production remains 618 files; this is a security-hardening release, not a payload-reduction release.
- Private Admin v414 remains 38/38 tests passing.
- Private Admin runtime is unchanged; one legacy QA assertion was stabilized to check exact sensitive values instead of the collision-prone substring `0912`.

## Parent

`KAVICO_v424_FULL_PROJECT_CSP_FORM_BOUNDARY_PRIVATE_ADMIN_V414_COMPLETE.zip`

SHA-256: `a919aa858ae6d0d9fbe65d845e1a54e3a0c632b171dec9ec14ecf630f3ca06b6`
