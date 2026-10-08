# KAVICO v427 — Netlify Lead Bridge Environment

Configure these values in the Netlify environment/secret store; never commit real values.

- `KAVICO_ADMIN_INGEST_URL` — full Private Admin `/api/ingest` HTTPS URL.
- `KAVICO_INGEST_HMAC_SECRET` — same current HMAC secret configured on Private Admin.
- `KAVICO_BRIDGE_FINGERPRINT_SECRET` — independent 32+ character secret used to HMAC client IP/User-Agent before forwarding. Independent from the ingest secret is recommended.
- `KAVICO_PUBLIC_ALLOWED_ORIGINS` — comma-separated Public origins accepted by the bridge.

The browser never receives these secrets. Raw client IP is never forwarded to Private Admin; the bridge forwards only HMAC fingerprints.

v427 does not add a new Public secret. Quarantine telemetry, alert thresholds and retention policy are configured in Private Admin through `kavico_v427_admin/.env.example`.
