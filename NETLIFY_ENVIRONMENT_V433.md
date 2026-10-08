# KAVICO v433 — Production Environment Handoff

## Public / Lead Bridge

The browser receives no Private Admin secrets. Keep the Admin URL, bridge HMAC secret and network-fingerprint secret in the Netlify Function environment only.

```bash
npm run build:public
npm run qa:full
```

`dist-public/` is generated and intentionally excluded from the source release ZIP.

## Private Admin v433

Current runtime template: `kavico_v433_admin/.env.example`.

v433 planning variables:

- `KAVICO_INGEST_CALENDAR_APPROVAL_QUORUM=1`
- `KAVICO_INGEST_CASE_RESERVATION_HEARTBEAT_TTL_MIN=15`
- `KAVICO_INGEST_CASE_LEAVE_MAX_DAYS=31`
- `KAVICO_INGEST_CASE_FORECAST_HISTORY_RETENTION_DAYS=90`

## Scope boundaries

Calendar scope selection for operator availability uses `location -> team -> global`. Case intake SLA without an operator context still uses the global/fallback calendar. This release does not claim that every new intake is automatically assigned a team/location SLA.

Forecast history is an operational record, not predictive/ML forecasting.
