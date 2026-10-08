# KAVICO Public Site Changelog v421

v421 is a responsive-delivery hardening release built on the verified v420 Full Project.

## Changes

- Activated existing responsive image variants across the Public site instead of generating duplicate assets.
- Added `srcset` and `sizes` to every WebP `<img>` that already had local responsive variants available.
- Responsive-eligible image coverage is now 348/348 (100%).
- Added responsive `imagesrcset`/`imagesizes` LCP preload coverage for all 120 responsive eager/high images.
- Switched 16 image occurrences across 5 unique raster sources to smaller same-stem WebP files; no smaller same-stem WebP opportunity remains.
- Advanced deploy-only page runtime bundle naming and Service Worker cache namespace to v421.
- Added `audit-responsive-v421.mjs` and made responsive delivery part of `npm run qa:full` for both Source and `dist-public`.
- Added `CSS_COVERAGE_REPORT_V421.json`. Large legacy surface CSS remains intentionally unpruned in v421 because automatic selector removal could create visual regressions; the release records the coverage facts instead of claiming unsafe savings.

## Safety

- No images were deleted.
- No new image variants were generated; v421 reuses assets already present in the verified project.
- Existing Admin v414 remains unchanged.
- Public deployment still excludes the Private Admin tree.
