# KAVICO v426 Full Project — QA Report

## Final integrated status

- Public source audit: PASS
- Public production build/re-audit: PASS
- Lead bridge core regression: PASS
- Browser form-guard regression: PASS
- Private Admin tests: **39/39 PASS**
- Private Admin syntax check: PASS

## Public

- HTML: 204
- Indexable pages: 124
- Local references checked: 10,846
- Broken local references: 0
- Images checked: 624
- Responsive eligible/covered: 348/348
- Responsive LCP preload: 120/120
- JSON-LD: 132
- CSP executable hashes: 1
- Public CSS refs: 405
- Production JS refs: 136

## v426 ingestion boundary

- Two Project Brief forms post to same-origin `/.netlify/functions/lead-bridge`.
- Bridge origin/HMAC/fingerprint unit regression: PASS.
- Admin schema: v426.
- Durable abuse/quarantine regression: PASS.
- Duplicate-content, rate-window and origin-mismatch quarantine: PASS.
- Quarantine payload plaintext leakage test: PASS.
- Manual release/reject workflow: PASS.

## Production build

- Files: 618
- Bytes: 29365424
- Private Admin tree inside static publish directory: 0
- Netlify Function source is outside `dist-public` and deployed through the configured functions directory.
