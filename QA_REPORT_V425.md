# KAVICO Full Project QA Report v425

## Public structural QA

- HTML: 204
- Indexable: 124
- Local references: 10,846
- Broken references: 0
- Images: 624
- JSON-LD: 132/132 valid
- Responsive eligible: 348
- Responsive covered: 348/348
- Responsive LCP preload: 120/120

## CSP / Boundary / SRI

- CSP length: 445 characters
- Executable inline bootstrap hashes: 1
- Unsafe inline/eval: 0
- Inline event attributes: 0
- Inline style attributes: 0
- Production stylesheet SRI: 405/405
- Production runtime SRI: 136/136
- Public contracts in deploy: exactly 3
- Private Admin tree in deploy: 0

## v425 abuse/security regression

- FA/EN forms verified: 2/2
- v425 guard field sets: 2/2
- hardened honeypots: 2/2
- runtime guard present: 2/2 Source + 2/2 Deploy
- Form guard executable test: PASS
  - first submit allowed then locked
  - second submit blocked
  - honeypot submit blocked
- Admin ingestion dedupe source contract: PASS

## Header / Service Worker contract

- CORP / COOP / Origin-Agent-Cluster / nosniff / referrer policy present
- Expanded Permissions Policy present
- SW v425 namespace/dev flag present
- Navigation Preload enabled/consumed
- query/Range/Authorization cache bypass present
- HTTP-200-only cache write policy present
- no-store/private response rejection present
- image/font MIME validation present
- API/function write bypass present

## Private Admin

- v414 tests: 38/38 PASS
- v414 syntax check: PASS
- Legacy v405 audit-export privacy test executed 3 consecutive times after narrowing a false-positive substring check to exact sensitive values: PASS 3/3

## Scope note

Client abuse score is advisory telemetry, not a server-side anti-bot or rate-limit guarantee. Replay and duplicate authority remains in signed Private Admin ingestion.

## Release artifact source hygiene

- Source files before manifest: **916**
- Generated `dist-public/` is intentionally excluded from the source archive and is rebuilt by `npm run build:public`.
- `FULL_PROJECT_SHA256SUMS.txt` is added after this count and covers every source file except itself.
