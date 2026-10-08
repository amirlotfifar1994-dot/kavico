# KAVICO Public Site v419 Changelog

v419 is a performance/request hardening release derived from the verified v418 full-project baseline. It preserves the v416/v417/v418 visual, page-experience and accessibility behavior while reducing avoidable render-blocking/network work.

## Changes

- Consolidated the v416 public system, v417 page-experience and v418 shell/accessibility styles into one versioned `v419-public-core.v419.css` bundle.
- Consolidated the v417 and v418 enhancement runtimes into one deferred `v419-public-runtime.v419.js` bundle.
- Removed the superseded five v416-v418 public layer files and one genuinely unreferenced legacy JS bundle from deployable assets.
- Added explicit same-origin LCP image preloads to 110 indexable pages whose first `<main>` image is the eager/high-priority candidate.
- Reduced 68 legacy noindex/meta-refresh compatibility pages to minimal redirect stubs with zero CSS/JS runtime cost.
- Advanced the Service Worker namespace and dev marker to v419.
- Added a v419 performance contract that fails QA when stylesheet/script request budgets regress, old public layers reappear, redirect stubs load runtime assets, or LCP preloads disappear.

## Measured markup/dependency delta vs v418

| Metric | v418 | v419 | Delta |
|---|---:|---:|---:|
| Stylesheet references across 204 HTML files | 1,017 | 541 | -476 (-46.8%) |
| Script references across 204 HTML files | 720 | 380 | -340 (-47.2%) |
| Combined CSS/JS references | 1,737 | 921 | -816 (-47.0%) |
| Max stylesheets on one page | 7 | 5 | -2 |
| Max external scripts on one page | 5 | 4 | -1 |
| Aggregate referenced CSS/JS bytes across page markup | 47,987,350 | 45,240,354 | -2,746,996 (-5.7%) |
| Public HTML bytes | 4,718,489 | 4,689,233 | -29,256 |
| Deployable Public files | 653 | 649 | -4 |

These are static dependency/markup measurements, not synthetic Lighthouse scores. No browser-based Core Web Vitals score is claimed by this release.
