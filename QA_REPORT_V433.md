# KAVICO Full Project QA Report v433

## Required release gates

The final extracted ZIP must pass:

- `npm run qa:full`
- Public source and rebuilt production audits
- responsive/performance/delivery contracts
- CSP/Form/SRI/Public-Private boundary checks
- Form Guard and Lead Bridge tests
- Private Admin regression suite and syntax check
- independent JSON / JS-MJS / CSS hygiene
- sensitive-artifact scan
- Private Admin SHA-256 manifest
- Full Project SHA-256 manifest
- ZIP integrity test

## v433 regression focus

Current Admin regression result before packaging: **54/54 PASS**.

The dedicated v433 tests prove:

- scoped team calendar selection,
- distinct multi-reviewer calendar quorum,
- duplicate/self approval blocking,
- exception conflict checking,
- leave request and independent approval,
- leave override creation only after approval,
- reservation lease token hashing and heartbeat,
- wrong heartbeat token rejection,
- persisted forecast history,
- direct migration `v432 -> v433` preserving pending cases and prior calendars.
