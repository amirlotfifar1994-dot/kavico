# KAVICO Full Project QA Report v424

## Result

**PASS**

### CSP / HTML execution boundary

- Public HTML: **204**
- Executable inline scripts: **132**
- Theme-bootstrap hash matches: **132/132**
- Unique authorized executable inline hash: **1**
- JSON-LD: **132/132 parse-valid**
- Inline event attributes: **0**
- Inline style attributes: **0**
- CSP length: **445 characters**
- CSP unsafe-inline / unsafe-eval: **0**
- External submission hints in Public JS: **0**

### Project Brief forms

- Forms verified: **2/2**
- Method: **POST**
- FA action: `/contact/thanks/`
- EN action: `/en/contact/thanks/`
- Netlify binding: **PASS**
- Honeypot: **PASS**
- UTF-8 charset: **PASS**
- Same-origin `form-action` CSP: **PASS**

### Public regression

- HTML: **204**
- Indexable pages: **124**
- Broken local references: **0**
- Images: **624**
- JSON-LD: **132/132**
- Responsive coverage: **348/348 (100%)**
- Responsive LCP preload: **120/120**
- Source CSS refs: **405**, max **4/page**
- Source JS refs: **380**, max **4/page**
- Deploy JS refs: **136**, max **1/page**
- Production stylesheet SRI: **405/405**
- Production runtime SRI: **136/136**
- Public deploy files: **618**
- Private Admin files in deploy: **0**

### Private Admin

- Embedded Admin: **v414**
- Tests: **38/38 PASS**
- Syntax check: **PASS**

### Version truth

- `VERSION`: **v424**
- `FULL_PROJECT_VERSION`: **KAVICO_v424_FULL_PROJECT**
- root package: **4.24.0**
- Service Worker: **kavico-v424**
- dev flag: **424**

`npm run qa:full` → **PASS** on Source + rebuilt Production deploy + CSP/form boundary + Public/Private boundary/SRI + Admin tests/checks.
