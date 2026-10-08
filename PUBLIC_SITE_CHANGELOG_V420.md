# KAVICO Public Site v420 Changelog

v420 is a delivery-efficiency release derived from the verified v419 full-project baseline. It preserves the v416-v419 visual/accessibility/page-experience behavior while reducing global CSS requests, production JavaScript requests, and raster image transfer weight.

## Changes

- Merged the adjacent global `v396-system.v396.css` + `v419-public-core.v419.css` cascade into one `v420-system-core.v420.css` bundle on all 136 non-redirect Public pages.
- Removed the two retired global CSS source files after the merge; their exact rule order is preserved in v420.
- Switched 328 `<img>` occurrences from JPG/PNG to an existing same-dimension WebP only when the WebP is at least 10% smaller. Social/OG metadata and original fallback assets remain unchanged.
- The 328 markup replacements resolve to 57 unique physical image pairs; unique-pair byte reduction is 2,633,462 bytes. Occurrence-weighted page-reference reduction is 15,525,190 bytes.
- Every lazy image now carries `fetchpriority="low"`; existing eager/high LCP policy is preserved.
- Added deploy-only deterministic JS bundling: each of the 136 non-redirect pages emits exactly one deferred content-hashed page-runtime bundle in `dist-public` while Source stays modular.
- Source script references remain modular for maintainability; Production script references fall from 380 to 136.
- Advanced Service Worker namespace/dev marker to v420.
- Added v420 source/deploy performance contracts: max 4 stylesheets/page in Source/Deploy, max 4 scripts/page in Source, exactly 1 script/page in Deploy, zero runtime on redirect stubs.

## Measured delta vs v419

| Metric | v419 | v420 Source | v420 Deploy | Delta |
|---|---:|---:|---:|---:|
| Stylesheet references across 204 HTML files | 541 | 405 | 405 | -136 (-25.1%) |
| Script references across 204 HTML files | 380 | 380 | 136 | -244 in Deploy (-64.2%) |
| Combined CSS/JS references | 921 | 785 | 541 | -380 in Deploy (-41.3%) |
| Max stylesheets/page | 5 | 4 | 4 | -1 |
| Max external scripts/page | 4 | 4 | 1 | -3 in Deploy |
| Aggregate referenced CSS/JS bytes | 45,240,354 | 44,945,642 | 44,946,374 | ~-294 KB |
| Public HTML bytes | 4,689,233 | 4,679,745 | 4,660,094 | -29,139 in Deploy |
| Deployable Public files | 649 | — | 645 | -4 |
| WebP `<img>` src occurrences | 8 (v419 baseline estimate from v420 diff lineage excluded) | 336 | 336 | substantially increased |
| JPG `<img>` src occurrences | 352 (v420 pre-transform baseline) | 24 | 24 | -328 replacements |

The image byte metrics above are deterministic file-size comparisons, not observed network telemetry. Browser caching, CDN compression and page navigation patterns affect real transferred bytes. No Lighthouse/Core Web Vitals score is claimed by this release.
