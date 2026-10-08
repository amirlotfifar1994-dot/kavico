# KAVICO Full Project QA Report v432

## Required release gates

The final extracted ZIP must pass:

- `npm run qa:full`
- Public source and rebuilt production audits
- performance / responsive / delivery contracts
- CSP / form / SRI / Public-Private boundary audits
- Form Guard and Lead Bridge tests
- Private Admin regression suite and syntax check
- independent JSON / JS-MJS / CSS hygiene
- sensitive-artifact scan
- Admin and Full Project SHA-256 manifest verification
- ZIP integrity test

## v432-specific regression

Pre-packaging Admin suite: **52/52 PASS**.

New v432 coverage proves:

- IANA/DST calendar math across spring-forward,
- approval requester cannot self-approve,
- distinct reviewer approval and promotion,
- calendar closed/open-hours exceptions,
- shift working/leave override behavior,
- reservation recovery dry-run and apply,
- capacity-aware forecast buckets,
- direct `v431 -> v432` migration preserving existing fixed-offset calendar/cases.

Final clean-room counts are recorded during packaging.

## Clean-room source hygiene

- Public rebuild: **618 files / 29,365,460 bytes**
- JSON: **149/149 valid**
- JS/MJS: **205/205 syntax PASS**
- CSS: **34/34 parse PASS (tinycss2)**
- Runtime SQLite/DB in source: **0**
- real `.env`: **0**
- `.kbx`: **0**
- PEM/private-key artifacts: **0**
- generated `dist-public/` is excluded from the source ZIP and rebuilt during final extracted-artifact QA.
