# KAVICO Full Project Changelog v430

## Scope

v430 keeps the Public conversion/delivery boundary stable and advances Private Admin case operations. Public runtime, form guard, Service Worker and QA version truth are synchronized to v430.

## Public continuity

- 204 Public HTML pages remain in the verified site tree.
- Same-origin Lead Bridge remains the Public submission boundary.
- CSP, SRI, responsive-image/LCP rules and Public/Private deployment separation remain enforced.
- Service Worker cache namespace and development reset marker advance to v430.

## Private Admin v430

- optional fixed-offset business-hours SLA calculation,
- durable operator capacity profiles,
- capacity-aware / non-admin-first auto-assignment,
- explicit handoff with append-only history,
- Supervisor Queue without customer-payload decryption,
- supervisor separation-of-duties against owner/requester self-review,
- rejected-case reopening with append-only history,
- telemetry for queue/capacity/handoff/reopen/business-hours state.

Business-hours mode is opt-in and defaults off, preserving existing elapsed-time SLA behavior during upgrade.
