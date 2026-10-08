# KAVICO Full Project QA Report v430

## Required release gates

Final v430 release is accepted only when the extracted ZIP passes:

- `npm run qa:full`
- Public source and regenerated Production build audits
- performance/delivery budget
- responsive image / LCP contract
- CSP / form boundary
- SRI / Public-Private boundary
- Lead Bridge and Form Guard tests
- Private Admin regression suite and syntax check
- Admin SHA-256 manifest verification
- Full-project SHA-256 manifest verification
- ZIP integrity test

## v430 regression focus

Dedicated v430 tests cover:

- business-hours SLA crossing closed weekend time,
- operator capacity-aware assignment,
- non-admin-first owner selection,
- explicit handoff and history,
- Supervisor Queue,
- reviewer/owner and reviewer/requester Separation-of-Duties,
- rejected-case reopen with released-case safety boundary,
- direct migration `v429 -> v430` preserving existing cases and adding capacity/handoff/reopen tables.

Current pre-packaging Private Admin result: **47/47 PASS**. Final artifact counts and hashes are recorded after clean-room packaging.

## Pre-manifest clean-room result

- Public HTML: **204**
- Indexable pages: **124**
- Local references checked in Source: **10,846**
- Broken local references: **0**
- Responsive eligible images: **348/348**
- Responsive LCP preload: **120/120**
- Source CSS references: **405**; max **4/page**
- Production JS references after deterministic bundling: **136**; max **1/page**
- Public Production build rebuilt during QA: **618 files / 29,365,460 bytes**
- Private Admin in Public deploy: **0 files**
- JSON: **143/143 valid**
- CSS files: **34/34 parse PASS**
- JS/MJS files: **180/180 syntax PASS**
- Sensitive runtime/source artifacts after cleanup: **0**
- Private Admin regression: **47/47 PASS**
- Private Admin syntax check: **PASS**

Generated `dist-public/` and runtime SQLite are deliberately removed before source-manifest generation and are rebuilt only during clean-extract QA.
