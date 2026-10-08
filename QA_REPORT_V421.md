# KAVICO Full Project QA Report v421

## Result

**PASS**

- Public HTML: 204
- Indexable pages: 124
- Local references checked in Source: 10,893
- Broken Public local references: 0
- Images checked: 624
- JSON-LD blocks: 132/132 valid under the existing Public audit
- Responsive-eligible image tags: 348
- Responsive image tags covered by `srcset` + `sizes`: 348/348 (100%)
- Responsive eager/high LCP images: 120
- Responsive LCP preloads with `imagesrcset` + `imagesizes`: 120/120
- Smaller same-stem WebP opportunities remaining: 0
- Source stylesheet references: 405; max 4/page
- Deploy script references: 136; exactly 1 runtime/page for non-redirect pages
- Admin tests: 38/38 PASS
- Admin syntax check: PASS
- `npm run qa:full`: PASS on Source + generated Public deploy tree

## CSS decision

Static analysis found 20 v389 surface bundles and an exact 11,262-byte common prefix across those bundles. v421 does not split or auto-prune that CSS because doing so would either add a render-blocking request or risk cascade/selector regressions. This is recorded in `CSS_COVERAGE_REPORT_V421.json` for a future browser-coverage-guided release.
