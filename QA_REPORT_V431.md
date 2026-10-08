# KAVICO Full Project QA Report v431

## Release gates

The final extracted ZIP must pass:

- `npm run qa:full`
- Public source and rebuilt production audits
- performance / responsive / delivery contracts
- CSP / form / SRI / Public-Private boundary audits
- Form Guard and Lead Bridge tests
- Private Admin regression suite
- Admin syntax check
- independent JSON / JS-MJS / CSS hygiene
- sensitive-artifact scan
- Private Admin SHA-256 manifest
- Full Project SHA-256 manifest
- ZIP integrity test

## v431-specific regression

Admin regression currently reports **49/49 PASS**.

New v431 tests independently verify:

- creating and activating a versioned business calendar,
- persisting calendar version on new quarantined cases,
- configured on-shift vs off-shift availability,
- durable TTL capacity reservation and cancellation,
- reservations counted against available capacity,
- handoff approval policy blocking unapproved direct handoff,
- requester self-approval blocked by separation of duties,
- distinct reviewer approval executing the handoff,
- supervisor workload endpoint,
- SLA forecast endpoint,
- direct `v430 -> v431` migration preserving existing pending cases and adding planning tables.

Final clean-room counts are recorded after packaging.
