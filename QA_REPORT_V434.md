# KAVICO Full Project QA Report v434

## Required final gates

The final extracted ZIP must pass:

- `npm run qa:full`
- Public source + rebuilt deployment audits
- Performance / responsive / delivery audits
- CSP / Form / SRI / Public-Private boundary audits
- Form Guard and Lead Bridge tests
- Private Admin regression + syntax check
- independent JSON / JS-MJS / CSS hygiene
- sensitive-artifact scan
- Private Admin SHA-256 manifest
- Full Project SHA-256 manifest
- ZIP integrity test

## v434 regression focus

Pre-packaging Admin suite: **56/56 PASS**.

New v434 coverage independently verifies:

- server-derived scoped Case SLA context,
- location/team/global calendar inheritance and pinning,
- Planning Change Approval quorum and requester/reviewer separation,
- durable Leave Entitlement and balance enforcement,
- owner-bound lease heartbeat/recovery and token generation rotation,
- no raw recovered lease token stored in SQLite,
- truly scoped forecast snapshots and trend comparison,
- direct `v433 -> v434` migration preserving existing planning rows.

Historical global IANA SLA and global forecast contract identifiers are explicitly regression-tested for backward compatibility.

## Clean source statistics before manifests

- Public deploy rebuilt by `qa:full`: **618 files / 29,365,460 bytes**
- JSON: **156/156 valid**
- JS/MJS: **229/229 syntax PASS**
- CSS: **35/35 parse PASS**
- Runtime SQLite/DB: **0**
- real `.env`: **0**
- `.kbx`: **0**
- PEM/private key files: **0**
- Source files before v434 manifests: **1159**
