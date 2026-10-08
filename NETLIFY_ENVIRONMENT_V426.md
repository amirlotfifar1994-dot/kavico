# KAVICO v426 — Netlify Lead Bridge Environment

Configure these values in the Netlify environment/secret store; do not put real values in the repository.

- `KAVICO_ADMIN_INGEST_URL` — full Private Admin `/api/ingest` HTTPS URL.
- `KAVICO_INGEST_HMAC_SECRET` — same current HMAC secret configured on Private Admin.
- `KAVICO_BRIDGE_FINGERPRINT_SECRET` — independent 32+ character secret used to HMAC client IP/User-Agent before forwarding. It may fall back to the ingest HMAC secret, but an independent secret is recommended.
- `KAVICO_PUBLIC_ALLOWED_ORIGINS` — comma-separated public origins accepted by the bridge, e.g. `https://www.example.com,https://example.com`.

The browser never receives these secrets. The bridge forwards only HMAC fingerprints, never raw client IP.
