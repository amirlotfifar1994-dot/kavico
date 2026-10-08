# KAVICO Full Project QA Report v422

## Result

**PASS**

### Public Source

- Public HTML: **204**
- Indexable pages: **124**
- Local references checked: **10,846**
- Broken Public local references: **0**
- Images checked: **624**
- WebP `<img>` sources: **352**
- JPG/JPEG `<img>` sources: **8**
- Lazy images with explicit low fetch priority: **370**
- JSON-LD blocks: **132/132 valid**
- Responsive eligible images: **348**
- Responsive covered by `srcset` + `sizes`: **348/348 (100%)**
- Responsive LCP images: **120**
- Responsive LCP preloads: **120/120**
- Smaller same-stem WebP opportunities remaining: **0**
- LCP preload pages under the general Public audit: **110**
- Duplicate preload hints: **0** (47 exact duplicates removed)
- Source stylesheet references: **405**; max **4/page**
- Source script references: **380**; max **4/page**

### Production Build

- `dist-public` files: **623**
- `dist-public` bytes: **29,290,242**
- Deploy stylesheet references: **405**
- Deploy script references: **136**; exactly **1 generated runtime/page** for non-redirect pages
- Deterministic deploy runtime families: **14**
- Legacy raster fallbacks pruned by v422 safety rule: **22**
- Bytes pruned from Production: **2,653,604**
- Prunable legacy raster fallbacks remaining: **0**
- Duplicate preload hints in deploy: **0**
- Private Admin files in Public deploy: **0**

### Private Admin

- Embedded Private Admin: **v414**
- Tests: **38/38 PASS**
- Syntax check: **PASS**

### Version truth

- `VERSION`: **v422**
- `FULL_PROJECT_VERSION`: **KAVICO_v422_FULL_PROJECT**
- Root package: **4.22.0**
- Service Worker namespace: **kavico-v422**
- Service Worker dev flag: **422**

## CSS coverage decision

Browser-assisted selector coverage was attempted through Chrome DevTools Protocol. Chromium rejected local navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Because v422 cannot prove complete runtime selector coverage in this environment, **automatic selector pruning is intentionally not applied**. See `CSS_COVERAGE_REPORT_V422.json`.

## Full command

`npm run qa:full` → **PASS** on Source + generated Public deploy tree + Admin tests/checks.
