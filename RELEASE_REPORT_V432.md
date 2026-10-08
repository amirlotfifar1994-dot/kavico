# KAVICO Full Project Release Report v432

## Milestone

IANA / DST-aware Calendar, Calendar Approval and Promotion, Date Exceptions, Shift Overrides, Reservation Recovery and Capacity Forecast.

## Parent

Verified v431 Full Project SHA-256:

`a573c2fb8120a77cbba2be75e77e08643dc9094de750985fe5a687511948871a`

## Core changes

- Full Project, Public Site and Private Admin version truth advanced to v432.
- Direct migration `v431 -> v432`.
- Business calendars support both `iana` and legacy `fixed-offset` modes.
- IANA local-time/UTC conversion uses Node `Intl` timezone data and is regression-tested across a DST spring-forward boundary.
- Calendar approval/review/promotion adds separation of duties.
- Date exceptions support closed days and explicit open-hours overrides.
- Date-specific shift overrides support working overrides and leave.
- Capacity reservation recovery provides dry-run/apply semantics and audited recovery history.
- SLA forecast adds deterministic capacity/load buckets and preserves the existing compatibility field.
- Monitoring/Governance expose IANA calendar state, pending approvals, exceptions, shift overrides, recovery candidates and forecast pressure.

## Safety and compatibility boundaries

- Existing v431 fixed-offset calendars remain supported.
- Calendar approval enforcement is rollout-safe and opt-in through configuration; the dedicated promotion route itself requires approved state.
- Recovery is dry-run unless apply is explicitly requested.
- Forecast output is an operational indicator, not statistical or ML prediction.
- Planning/list/dashboard operations do not decrypt customer quarantine payload.

Pre-packaging Admin regression: **52/52 PASS**.
Final artifact counts and SHA-256 are recorded after packaging.
