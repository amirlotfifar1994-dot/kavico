# KAVICO v431 — Production Environment Handoff

## Public / Lead Bridge

The browser receives no Private Admin secrets. Keep Admin URL, bridge signing secret and network-fingerprint secret in the Netlify Function environment only.

Build and verify the public surface with:

```bash
npm run build:public
npm run qa:full
```

`dist-public/` is generated and intentionally excluded from the source release ZIP.

## Private Admin v431

Current Admin environment template:

`kavico_v431_admin/.env.example`

v431 planning variables include:

- `KAVICO_INGEST_CASE_CAPACITY_RESERVATION_TTL_MIN`
- `KAVICO_INGEST_CASE_HANDOFF_APPROVAL_REQUIRED`
- `KAVICO_INGEST_CASE_FORECAST_HOURS`

Existing business-hours variables remain available as the fallback calendar policy.

## Deployment boundaries

- A durable active database calendar overrides the environment fallback calendar.
- The calendar uses a fixed UTC offset. v431 does **not** claim IANA timezone / DST support.
- Operator shifts restrict availability only when shift rows are explicitly configured.
- Handoff approval is opt-in and defaults to disabled.
- SLA forecast is an operational horizon indicator, not a predictive model.
