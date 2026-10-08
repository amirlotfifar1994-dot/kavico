# KAVICO v420 QA Report

## Release scope

- Full Project: v420
- Public Site: v420
- Private Admin: v414 (unchanged)
- Parent full project: v419 (`509266a9b58179570658f9950174867e5c7a859bb2f0463e4c928fe3270ebdb0`)

## Public structural QA

- HTML files: 204
- Indexable pages: 124
- Legacy redirect stubs: 68
- Local references checked in Source: 9,595
- Images checked: 624
- WebP `<img>` src occurrences: 336
- JPG/JPEG `<img>` src occurrences: 24
- Lazy images with explicit low fetch priority: 370
- JSON-LD blocks: 132
- LCP image preload pages: 110
- Persian article hero images: 32 unique
- English article hero images: 32 unique
- Public audit errors: 0
- Public audit warnings: 0

## v420 request / delivery contract

### Source

- Maximum stylesheets/page: 4
- Maximum external scripts/page: 4
- Total stylesheet references: 405
- Total script references: 380
- Retired v396/v419 global CSS references: 0
- Redirect stubs carrying CSS/JS: 0

### Production `dist-public`

- Maximum stylesheets/page: 4
- External scripts on every non-redirect page: exactly 1
- Total stylesheet references: 405
- Total script references: 136
- Deterministic generated page-runtime bundles: 14
- Redirect stubs carrying CSS/JS: 0
- Private Admin files exposed: 0

## Image delivery QA

- Same-dimension smaller-WebP replacements: 328 markup occurrences
- Unique physical image pairs: 57
- Unique image-pair byte reduction: 2,633,462 bytes
- Occurrence-weighted byte reduction: 15,525,190 bytes
- Missing `fetchpriority` on images: 0
- First `<main>` LCP candidates remain `loading="eager"` + `fetchpriority="high"`

## Private Admin regression

- Private Admin version: v414
- Test suite: 38/38 PASS
- `npm run check`: PASS

## Packaging / security expectations

The release is expected to contain no runtime SQLite/DB, `.kbx`, real `.env`, PEM or private-key artifact. Final archive checksum/manifest verification is performed during release packaging.

## Performance claim boundary

v420 records deterministic static request, dependency and image-file improvements. It does not claim a synthetic Lighthouse/Core Web Vitals score because no reliable browser-performance trace is part of the evidence set.
