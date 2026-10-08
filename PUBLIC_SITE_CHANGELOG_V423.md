# KAVICO Public Site Changelog v423

v423 is a Public/Private boundary and deploy-integrity hardening release built on verified v422.

## Changes

- Removed six internal-only Admin metadata fields from both Public project-brief forms while retaining all fields required by the v414 browser-to-lead ingestion bridge.
- Production now exposes only three shared lead contracts: `lead-conversion.v1.schema.json`, `lead-admin-export.v1.schema.json`, and `lead-lifecycle.v1.json`.
- Five internal Admin contract files (data model, ingestion, KPI, UI, manifest) remain in Source/private admin lineage but are excluded from `dist-public`.
- Shared Public contract responses now carry `X-Robots-Tag: noindex, nofollow, noarchive`.
- `build:public` adds SHA-384 Subresource Integrity to every local stylesheet reference and every generated page-runtime script reference.
- Added `audit-public-boundary-v423.mjs`; `qa:full` now fails if internal contracts leak into Production, required bridge fields disappear, or any deploy SRI hash mismatches the published file.
- Advanced Service Worker and generated page-runtime naming to v423.
- Carried forward the v422 CSS safety decision: no selector pruning is claimed while browser coverage remains blocked by the execution environment.

## Measured boundary result

- Source contract files retained: **8**
- Production shared contracts: **3**
- Internal contract files excluded from deploy: **5 / 22,205 bytes**
- Production stylesheet references with verified SRI: **405**
- Production runtime script references with verified SRI: **136**
- `dist-public` file count: **618** (v422: 623)

SRI attributes add integrity metadata to HTML, so v423 is not presented as a byte-reduction release. Its purpose is to reduce public architectural exposure and make executable/style assets tamper-evident at the browser boundary.
