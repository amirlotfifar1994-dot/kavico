# KAVICO v430 — Public / Lead Bridge Environment

Public deployment remains the same-origin Lead Bridge architecture inherited from v426-v429. Browser code never receives Private Admin signing secrets.

## Public deployment

```bash
npm run build:public
npm run qa:full
```

Static publish output is `dist-public/`. Netlify Functions are sourced separately from `netlify/functions/`. The source release intentionally excludes generated `dist-public/`; it must be rebuilt from the artifact.

## Lead Bridge

Configure the Admin HTTPS endpoint plus Bridge HMAC/fingerprint secrets only in the Netlify Function environment. Do not embed those values in Public HTML or JavaScript.

## Private Admin

Current Admin environment contract is `kavico_v430_admin/.env.example`.

v430 adds optional business-hours SLA and operator-capacity settings. Business-hours mode is disabled by default. The current calendar implementation uses an explicit fixed UTC offset and does not claim IANA/DST-aware timezone behavior.
