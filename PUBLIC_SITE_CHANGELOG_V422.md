# KAVICO Public Site Changelog v422

v422 is a resource-hint and Production payload hygiene release built on the verified v421 Full Project.

## Changes

- Removed **47 exact duplicate image preload hints** from 47 Public HTML pages. Responsive `imagesrcset`/`imagesizes` coverage remains intact.
- Fixed the Public audit so LCP preload validation is attribute-order independent; valid `<link>` tags no longer depend on a particular HTML attribute order.
- Added `audit-delivery-v422.mjs` and made delivery/version hygiene part of `npm run qa:full` for both Source and `dist-public`.
- Added a strict **Version Truth Contract** across `VERSION`, `FULL_PROJECT_VERSION`, `package.json`, and the Service Worker namespace/dev flag.
- Fixed root version drift left by prior releases (`VERSION` / `FULL_PROJECT_VERSION` had remained at v420 while the Public project had advanced).
- Advanced Service Worker cache namespace and deploy-only page runtime naming to **v422**.
- Hardened `build:public` to remove only provably unreachable legacy JPG/JPEG/PNG fallbacks when:
  1. the legacy filename is not referenced anywhere in the final Public text tree, and
  2. a same-stem WebP/AVIF exists and is referenced.
- The v422 Production build prunes **22 unreachable legacy raster fallbacks totaling 2,653,604 bytes**. All 22 remain in Source for provenance/rollback.
- `dist-public` now contains **623 files** and no prunable fallback matching the v422 safety rule remains.
- Added `RESOURCE_HINT_REPORT_V422.json`, `DELIVERY_HYGIENE_REPORT_V422*.json`, `DEPLOY_PAYLOAD_REPORT_V422.json`, and `CSS_COVERAGE_REPORT_V422.json`.

## CSS safety decision

Chromium DevTools Protocol could be started in the sandbox, but local page navigation is blocked by the environment with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. v422 therefore **does not claim browser selector coverage and does not auto-prune selectors**.

Static analysis still records the large legacy surface CSS footprint and common-prefix facts, but any selector-level pruning is intentionally deferred until a browser environment can cover every consumer page/state.

## Safety

- No Public page DOM/layout was intentionally changed.
- No source image was deleted.
- Private Admin v414 remains unchanged.
- Public deployment continues to exclude the Private Admin tree.
- Responsive image coverage and LCP preload coverage remain mandatory QA gates.
