# KAVICO Full Project Release Report v433

## Milestone

Scoped Calendar Governance / Approval Quorum / Leave Workflow / Capacity Lease Heartbeat / Forecast History.

## Parent

Verified v432 Full Project SHA-256:

`e002d956fa3484be6206f3a4f3cf465dc25b7b0ee76d2aef2014c6c7bc9a6c08`

## Core changes

- Direct schema migration `v432 -> v433`.
- Business calendars support `global`, `team` and `location` scopes.
- Operator availability resolves scoped calendars in `location -> team -> global` order.
- Calendar approval supports 1–5 distinct reviewer votes; requester self-review and duplicate reviewer votes are blocked.
- Leave request/review workflow creates leave shift overrides only after independent approval.
- Capacity reservations can use a heartbeat lease token; only SHA-256 of the token is stored.
- SLA forecast snapshots are persisted with bounded history retention.
- Monitoring/Governance/Alert contracts expose scoped calendars, quorum gap, leave backlog, lease state and forecast history.
- Admin UI shows scope/quorum and planning-history summaries without decrypting customer payload.

## Safety boundaries

- Scope-aware calendar selection currently applies to operator availability. Intake case SLA without operator context continues using the global/fallback calendar.
- Legacy reservations without a v433 lease token cannot heartbeat.
- Forecast is an operational indicator/history, not statistical or ML prediction.
- Leave and planning list operations use operational metadata only.

Pre-packaging Admin regression: **54/54 PASS**.
Final artifact counts and SHA-256 are recorded during packaging.
