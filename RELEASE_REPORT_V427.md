# KAVICO v427 Full Project — Release Report

## Scope

v427 is a Quarantine Operations / Telemetry / Retention release. It does not claim a Public visual redesign or browser-measured Core Web Vitals change.

### Public

- Public version truth advanced to v427.
- Existing same-origin Lead Bridge and all v426 browser/security/delivery controls are retained.

### Private Admin

- Latest schema: **v427**.
- Direct migration from v426 preserves existing abuse/quarantine data.
- Quarantine list supports server-side search, status/reason/risk/time filters and pagination without payload decryption.
- Individual release/reject remains RBAC + CSRF protected.
- Bulk resolve is limited to 20 pending IDs and requires an exact confirmation phrase.
- Telemetry exposes accepted/quarantined windows, pending/high-risk counts, oldest-pending age, unique network fingerprints and top reasons.
- Alerts cover abuse spikes and quarantine backlog/staleness.
- Retention supports dry-run/apply, records run history and deletes only old abuse events and old **resolved** quarantine rows; pending rows are never deleted.

## Privacy boundary

Quarantine listing and telemetry are metadata-only. Sensitive quarantined payload stays AES-256-GCM encrypted at rest and is decrypted server-side only when an authorized operator releases an item.

## Operational commands

```bash
npm run migrate
npm test
npm run check
npm run ingest:prune          # dry-run
npm run ingest:prune -- --apply
```

See `kavico_v427_admin/OPERATIONS_V427.md` for operator workflow and policy variables.

## Release engineering

The source release excludes generated `dist-public/`. Final packaging locks the current Admin manifest first, then a Full Project manifest over the complete source tree. The packaged ZIP is extracted into a clean directory, both manifests are verified, and `npm run qa:full` is rerun from the extracted source before delivery.
