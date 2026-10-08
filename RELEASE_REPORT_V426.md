# KAVICO v426 Full Project — Release Report

## Scope

v426 is an ingestion-boundary release. It does not claim a visual redesign or a Core Web Vitals score change.

### Public

- Same-origin Lead bridge under `netlify/functions/lead-bridge.mjs`.
- HMAC-signed bridge-to-Admin request using the existing ingestion signature contract.
- Raw client IP is not forwarded; only an HMAC fingerprint is included.
- Browser origin is checked at the bridge and the signed origin is independently allowlisted by Admin when configured.

### Private Admin

- Schema latest: v426.
- Direct migration path from v414 to v426.
- Durable `ingest_abuse_events` and encrypted `ingest_quarantine` tables.
- 10-minute / 24-hour network rate windows, content fingerprint duplicate detection and server-side quarantine threshold.
- HTTP 202 for quarantined ingest, HTTP 201 for accepted Lead.
- Quarantine list / manual release / manual reject APIs with RBAC + CSRF + Audit.
- All v414 production-trust/deployment controls retained.

## Security boundary

Client scoring is not a server rate limit. v426 treats it only as an advisory input. The authoritative decisions are made after HMAC authentication inside Private Admin and persisted in SQLite.
