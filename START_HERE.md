# KAVICO Full Project v434 — Public Site v434 + Private Admin v434

This archive is the complete current KAVICO source project.

- Public source: repository root
- Private Admin: `kavico_v434_admin/`
- Full Project: **v434**

## v434 milestone

- scoped Case SLA context and calendar version pinning
- location -> team -> global inheritance
- durable Leave Entitlement / yearly balance
- Planning Change Approval with separation of duties
- owner-bound capacity lease and secure recovery rotation
- scoped forecast history / trend comparison

## Public deployment

```bash
npm run build:public
npm run qa:full
```

Generated `dist-public/` is intentionally excluded from the source ZIP and rebuilt during QA. Private Admin is not part of the static Public tree.

## Important boundaries

- Entitlement enforcement is opt-in.
- Browser input cannot directly select arbitrary Admin calendar versions.
- Sensitive planning changes require approved server-side requests.
- Forecast trend is operational, not predictive/ML.
- Quarantine customer payload remains encrypted for planning/list/forecast operations.

## Environment

- Root / Netlify: `NETLIFY_ENVIRONMENT_V434.md`
- Private Admin: `kavico_v434_admin/.env.example`

## Provenance

Verified immediate parent v433 SHA-256:

`db0a2e6f2edd6c29ec021f28f81a82a807b1a0ada582a7614e0fc4df51a93343`

Full and Admin SHA-256 manifests are generated during final packaging.
