# KAVICO Full Project Release Report v431

## Milestone

Versioned Business Calendar / Operator Shifts / Capacity Reservations / Handoff Approval / SLA Forecast.

## Parent

Verified v430 Full Project SHA-256:

`f97e48851be22b1cce546be0e838be4c14e4dacfa030c55733c35918610efdfd`

## Core changes

- Full Project, Public Site and Private Admin version truth advanced to v431.
- Direct migration `v430 -> v431`.
- Durable, versioned business-calendar records can override the existing env fallback.
- Operator shift rows can constrain availability when explicitly configured.
- TTL capacity reservations protect concurrent auto-assignment capacity accounting.
- Optional handoff approval introduces a distinct request/reviewer path.
- Handoff requester cannot approve the same request.
- Supervisor workload and SLA-horizon indicators added to case planning/dashboard.
- Monitoring includes reserved capacity, off-shift operators, pending approvals and SLA forecast pressure.

## Safety / scope boundaries

- Business-calendar timezone remains a **fixed UTC offset**; no IANA/DST-aware claim is made.
- Shift restriction is opt-in by presence of shift data; operators without configured shifts retain prior availability semantics.
- Handoff approval is opt-in with `KAVICO_INGEST_CASE_HANDOFF_APPROVAL_REQUIRED=1`.
- SLA forecast is a deterministic operational indicator, **not** a statistical or ML prediction.
- Existing quarantine/customer payload remains encrypted and is not decrypted for planning views.

Pre-packaging Admin regression: **49/49 PASS**.
Final artifact/manifest counts and ZIP SHA-256 are recorded after release packaging.
