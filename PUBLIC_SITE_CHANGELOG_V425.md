# KAVICO Public Site Changelog v425

v425 hardens the public Project Brief submission surface, browser security headers, and Service Worker cache boundary. It does not change the visual design or the Private Admin release (still v414).

## Project Brief abuse resilience

- Added a v425 progressive-enhancement form guard to both FA/EN Project Brief forms.
- Accidental double-submit is blocked after the first valid `submit` event.
- The submit control is disabled while the browser is sending the request and is safely restored after BFCache navigation.
- The existing `company` honeypot is enforced in the public runtime.
- Added non-PII advisory fields: `form_guard_version`, `form_rendered_at`, `form_elapsed_ms`, `form_nonce`, `abuse_score`, and `abuse_signals`.
- Advisory signals include very-fast submission, repeated characters, multiple URLs, repeated phone digits, URL-in-name, and honeypot activity.
- Client scoring is explicitly **not** a server trust boundary. Private Admin ingestion remains authoritative for replay/dedup.

## Existing server authority preserved

Private Admin v414 already rejects:

- duplicate `event_id` via `ingest_events`;
- duplicate non-followup `lead_reference`;
- replayed/stale signed ingestion through the existing HMAC nonce/timestamp boundary.

No Admin logic was weakened or replaced by browser heuristics.

## Security headers

Added/expanded:

- `Cross-Origin-Resource-Policy: same-origin`
- `Origin-Agent-Cluster: ?1`
- `X-Permitted-Cross-Domain-Policies: none`
- a broader deny-by-default `Permissions-Policy` for unused sensors/capabilities.

Existing CSP, COOP, HSTS, nosniff, referrer policy and Public/Private boundary controls remain active.

## Service Worker hardening

- Cache namespace and dev flag moved to v425.
- Navigation Preload is enabled and consumed for document requests.
- Requests with query strings, `Range`, or `Authorization` bypass SW asset caches.
- Only status `200` responses are eligible for cache storage.
- `no-store`, `private`, and `Set-Cookie` responses are rejected from cache.
- Image/font cache writes validate MIME family.
- API and Netlify Function writes remain outside Service Worker interception.
