# KAVICO v432 — Production Environment Handoff

## Public / Lead Bridge

Public delivery remains same-origin. Private Admin URLs, signing keys, fingerprint secrets and data keys stay server-side and are never embedded in browser assets.

Build and verify with:

```bash
npm run build:public
npm run qa:full
```

`dist-public/` is generated and intentionally excluded from the source release ZIP.

## Private Admin v432

Use `kavico_v432_admin/.env.example`. v432 adds/continues planning controls including calendar approval policy and forecast bucket sizing.

## Calendar boundary

- IANA calendar mode is resolved with Node `Intl` timezone data and supports DST transitions.
- Legacy fixed-offset calendars remain supported for rollback and migrated v431 data.
- `KAVICO_INGEST_CALENDAR_APPROVAL_REQUIRED=0` remains the safe compatibility default.
- The dedicated v432 promotion route requires approved calendar state.
- Reservation recovery is dry-run unless apply is explicitly requested.
- SLA forecast is deterministic operational capacity/load telemetry, not ML or statistical prediction.
