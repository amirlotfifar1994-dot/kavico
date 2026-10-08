# KAVICO v427 Full Project — QA Report

## Integrated status before release packaging

- Public source audit: PASS
- Public production build/re-audit: PASS
- Lead Bridge regression: PASS
- Browser form-guard regression: PASS
- Public CSP/SRI/Boundary/Responsive audits: PASS
- Private Admin tests: **40/40 PASS**
- Private Admin syntax check: PASS

## Public

- HTML: 204
- Indexable pages: 124
- Local references checked: 10,846
- Broken local references: 0
- Images checked: 624
- Responsive eligible/covered: 348/348
- Responsive LCP preload: 120/120
- JSON-LD: 132
- Public CSS refs: 405
- Production JS refs: 136
- Max Production JS/page: 1

## v427 quarantine operations

Regression coverage includes:

- accepted ingest remains accepted
- duplicate-content, rate-window and origin-mismatch quarantine
- encrypted quarantine plaintext-leakage check
- metadata-only server-side search/filter by reason, risk and reference
- 10m/1h/24h abuse telemetry and retention policy summary
- abuse-spike critical alert
- confirmation-guarded bulk reject
- authorized manual release
- stale/backlogged quarantine critical alert
- retention dry-run/apply
- old abuse-event deletion
- old resolved-quarantine deletion
- pending-quarantine preservation
- retention-run history persistence

## Migration

Direct `v426 -> v427` regression preserves existing abuse/quarantine rows and creates the retention-history table.

## Packaging

Final source-manifest, extracted-ZIP manifest verification and a fresh `npm run qa:full` are performed after this report is written. Final counts and SHA-256 are reported in the release response and `RELEASE_REPORT_V427.md` is updated with artifact verification status before delivery.

## Release-source hygiene

- Public deploy rebuilt during final QA: **618 files / 29,365,424 bytes**
- Private Admin test suite: **40/40 PASS**
- Admin artifact manifest: **166/166 PASS**
- Full Project source files before current Full manifest: **979**
- `dist-public/` is excluded from the Source ZIP and must be reproducibly rebuilt from the release source.
