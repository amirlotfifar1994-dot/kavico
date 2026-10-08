# KAVICO v419 QA Report

## Release scope

- Full Project: v419
- Public Site: v419
- Private Admin: v414 (unchanged)
- Parent full project: v418

## Public structural QA

- HTML files: 204
- Indexable pages: 124
- Legacy redirect stubs: 68
- Local references checked: 9,731
- Images checked: 624
- JSON-LD blocks: 132
- LCP image preload pages: 110
- Persian article hero images: 32 unique
- English article hero images: 32 unique
- Public audit errors: 0
- Public audit warnings: 0

## v419 performance contract

- Maximum stylesheet requests/page: 5
- Maximum external script requests/page: 4
- Total stylesheet references: 541
- Total script references: 380
- Superseded v416/v417/v418 layer references: 0
- Redirect stubs carrying CSS/JS: 0
- Obsolete deploy assets checked by performance audit: absent

## Static asset QA

- Public CSS files: 34; parser errors: 0
- Public JavaScript files including service worker: 18; syntax errors: 0
- Public/root JSON files: valid
- Public-only build files: 649
- Public-only HTML files: 204
- Private Admin files in `dist-public`: 0

## Private Admin regression

- Private Admin version: v414
- Test suite: 38/38 PASS
- `npm run check`: PASS

## Security / packaging hygiene

No runtime SQLite/DB, `.kbx`, real `.env`, PEM or private-key artifact is intentionally included in the release source.

## Note on performance claims

v419 records deterministic static request/dependency improvements. It does not claim a Lighthouse/Core Web Vitals score because no reliable browser-performance run is included in the release evidence.
