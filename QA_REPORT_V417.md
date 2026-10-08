# KAVICO Full Project QA Report — v417

## Release composition

- Public Site: **v417**
- Private Admin: **v414**
- Full Project: **v417**
- Parent: `KAVICO_v416_FULL_PROJECT_PUBLIC_VISUAL_UX_HARDENING_PRIVATE_ADMIN_V414_COMPLETE.zip`
- Parent SHA-256: `724fb38aa9ea70caca6d0fefe4381bcb50f2e0b7f748c52f08a02f0df1a04992`

## Public source QA

`npm run audit:public` passes with:

- HTML files: **204**
- Indexable pages: **124**
- Local HTML references checked: **10,029**
- Missing local references: **0**
- HTML images checked: **624**
- JSON-LD blocks parsed: **132**
- v417 body coverage: **204/204**
- Persian article hero set: **32 unique**
- English article hero set: **32 unique**
- Duplicate article hero errors: **0**
- Duplicate HTML ID errors: **0**
- Image policy errors: **0**
- Required SEO errors: **0**
- Knowledge Hub cross-locale route errors: **0**
- Key page-structure contract errors: **0**

## v417 asset QA

- `v417-page-experience.v417.css`: parsed successfully with `tinycss2`; **0 parser errors**.
- `v417-public-runtime.v417.js`: `node --check` **PASS**.
- Article runtime is progressive enhancement and only activates article-specific behavior on `.page-article` pages.

## Safe Public deployment

`npm run build:public` + `npm run audit:dist`:

- Public deploy files: **651**
- HTML: **204**
- CSS: **35**
- JavaScript: **19**
- Private Admin files in Public deploy: **0**
- Dist Public audit: **PASS**

## Private Admin regression

The embedded Private Admin remains v414:

- Tests: **38/38 PASS**
- `npm run check`: **PASS**

## Full project QA

`npm run qa:full`: **PASS**

This command audits Public source, builds and audits the Public-only deployment tree, runs the complete Admin test suite, and runs Admin syntax checks.

## Packaging security checks

Before release packaging, the source tree is checked for:

- Runtime SQLite/database files: none
- External backup `.kbx` artifacts: none
- Real `.env`: none
- PEM/private-key material: none
- Generated `dist-public/`: removed before source archive creation

The final ZIP is independently extracted and verified against `FULL_PROJECT_SHA256SUMS.txt` before release.
