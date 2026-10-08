# KAVICO v434 — Production Environment Handoff

## Public / Lead Bridge

The Public Site continues to use the same-origin Lead Bridge. Browser code receives no Private Admin signing or fingerprint secrets.

Build and verify with:

```bash
npm run build:public
npm run qa:full
```

`dist-public/` is generated and intentionally excluded from the source release ZIP.

## Private Admin v434

Current environment template:

`kavico_v434_admin/.env.example`

v434 planning controls include:

- `KAVICO_INGEST_CASE_LEAVE_ENTITLEMENT_REQUIRED=0`
- `KAVICO_INGEST_PLANNING_CHANGE_APPROVAL_QUORUM=1`
- `KAVICO_INGEST_CASE_FORECAST_TREND_POINTS=12`

## Rollout boundaries

- Leave entitlement enforcement is opt-in.
- Planning-change approval is durable and requester self-review is prohibited.
- Initial team context may be derived only from the server-side assignment-queue mapping. A browser cannot choose an arbitrary calendar version.
- Explicit Case SLA context/calendar changes use Planning Change Approval.
- Forecast trend is an operational comparison of persisted snapshots, not a predictive statistical/ML model.
- Lease recovery rotates token generation and ownership; raw lease tokens are not stored in SQLite.
