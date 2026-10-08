# KAVICO Full Project Release Report v434

## Milestone

Case SLA Scope Pinning / Leave Entitlement / Lease Ownership-Recovery / Scoped Forecast Trends / Planning Change Approval.

## Parent

Verified v433 Full Project SHA-256:

`db0a2e6f2edd6c29ec021f28f81a82a807b1a0ada582a7614e0fc4df51a93343`

## Core changes

- Full Project, Public Site and Private Admin version truth advanced to v434.
- Direct migration `v433 -> v434`.
- Pending cases persist team/location SLA scope and pinned calendar version.
- Scope inheritance order is `location -> team -> global`.
- Initial intake can use only controlled server-side routing hints.
- Explicit SLA context changes require Planning Change Approval.
- Durable yearly Leave Entitlement/balance with optional enforcement.
- Entitlement changes use Planning Change Approval.
- Capacity lease is owner-bound; recovery rotates token hash/generation/owner and is audited.
- Forecast is truly scoped by team/location and persisted history supports trend comparison.
- Global historical SLA/forecast contract identifiers remain backward-compatible.

## Safety boundaries

- Leave entitlement enforcement defaults OFF.
- Planning approval quorum defaults to 1 and can be increased to 3.
- Requester cannot review their own planning change.
- Raw lease token is never persisted; only SHA-256 is stored.
- Forecast/trend is an operational indicator, not predictive modeling.
- Planning/list/forecast operations do not require customer payload decryption.

Pre-packaging Private Admin regression: **56/56 PASS**.
Final manifest counts and ZIP SHA-256 are populated by release packaging.

## Pre-manifest release measurements

- Public production build: **618 files / 29,365,460 bytes**
- Private Admin regression: **56/56 PASS**
- Public source/deploy audits: PASS
- Source hygiene: 156 JSON, 229 JS/MJS, 35 CSS all PASS; sensitive runtime artifacts zero.
