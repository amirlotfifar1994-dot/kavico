# KAVICO Full Project QA Report — v418

## Versions

- Public Site: **v418**
- Private Admin: **v414**
- Full Project: **v418**
- Parent Full Project: **v417** (`f567bb8a1c40170d1733915a5c6cccbf10a5c722966e003900ba3356b83b628b`)

## Public source audit

- HTML files: **204**
- Indexable pages: **124**
- Local HTML references checked: **10,437**
- Missing local references: **0**
- Images checked: **624**
- JSON-LD blocks parsed: **132**
- v418 body coverage: **204/204**
- Persian article hero images: **32 unique**
- English article hero images: **32 unique**
- Duplicate article hero errors: **0**
- Duplicate HTML IDs: **0**
- SEO essential errors: **0**
- Hub cross-locale routing errors: **0**
- v418 shell/landmark errors on indexable pages: **0**
- First-main-image eager/high-priority errors: **0**

## Accessibility static scan

Across all **124 indexable pages**:

- Buttons without accessible name: **0**
- Links without accessible name: **0**
- Unlabelled form controls: **0**
- Missing `lang` / `dir`: **0**

## Public assets

- `v418-shell-accessibility-performance.v418.css`: syntax/parser verification PASS.
- `v418-shell-runtime.v418.js`: `node --check` PASS.
- Public JavaScript bundle syntax verification: PASS.
- Public JSON hygiene: PASS.
- Reduced-motion and increased-contrast policies are present in the v418 stylesheet.

## Safe deployment

- `npm run build:public`: PASS
- `npm run audit:dist`: PASS
- Private Admin files in `dist-public`: **0**
- `dist-public/` is generated for QA/deployment and intentionally excluded from the source release ZIP.

## Private Admin regression

The embedded Private Admin remains v414.

- Tests: **38/38 PASS**
- `npm run check`: **PASS**

## Browser-render note

Chromium is present in the execution environment, but headless screenshot generation hung at the browser process during this run. No automated visual screenshot PASS is claimed for v418. Structural, accessibility, CSS/JS, deployment-boundary and Admin regression checks are independently enforced and passed.
