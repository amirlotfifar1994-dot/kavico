# KAVICO Full Project QA Report v423

## Result

**PASS**

### Public Source

- Public HTML: **204**
- Indexable pages: **124**
- Local references checked: **10,846**
- Broken local references: **0**
- Images checked: **624**
- WebP `<img>` sources: **352**
- JPG/JPEG `<img>` sources: **8**
- JSON-LD blocks: **132/132 valid**
- Responsive eligible images: **348**
- Responsive covered: **348/348 (100%)**
- Responsive LCP preloads: **120/120**
- Source stylesheet references: **405**, max **4/page**
- Source script references: **380**, max **4/page**

### Public / Private boundary

- Full contract lineage retained in Source: **8 files**
- Shared contracts exposed in Production: **3 files**
- Internal Admin contracts excluded from Production: **5 files / 22,205 bytes**
- Internal-only public form metadata remaining: **0**
- Required lead-bridge fields present in FA + EN contact forms: **PASS**
- Contract indexing policy (`noindex, nofollow, noarchive`): **PASS**
- Production stylesheet SRI references verified: **405/405**
- Production runtime script SRI references verified: **136/136**

### Production Build

- `dist-public` files: **618**
- `dist-public` bytes: **29,312,410**
- Deploy stylesheet references: **405**
- Deploy script references: **136**, exactly **1 generated runtime/page** for non-redirect pages
- Deterministic runtime families: **14**
- Prunable legacy raster fallbacks remaining: **0**
- Private Admin tree in Public deploy: **0**

### Private Admin

- Embedded Admin: **v414**
- Tests: **38/38 PASS**
- Syntax check: **PASS**
- Existing v414 ingestion integration tests pass without any of the six removed public-only metadata fields.

### Version truth

- `VERSION`: **v423**
- `FULL_PROJECT_VERSION`: **KAVICO_v423_FULL_PROJECT**
- Root package: **4.23.0**
- Service Worker namespace: **kavico-v423**
- Service Worker dev flag: **423**

### CSS coverage decision

Browser-assisted selector coverage remains unavailable in this sandbox. v423 therefore makes no selector-pruning claim and retains the v422 conservative CSS policy. See `CSS_COVERAGE_REPORT_V423.json`.

## Full command

`npm run qa:full` → **PASS** on Source + generated Public deploy + boundary/SRI audits + Admin tests/checks.
