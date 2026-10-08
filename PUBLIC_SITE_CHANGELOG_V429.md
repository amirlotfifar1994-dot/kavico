# KAVICO Public / Full Project Changelog v429

## Scope

v429 keeps the Public conversion, delivery, CSP/SRI, responsive image and Lead Bridge behavior stable while upgrading the Private Admin case-operations layer.

## Public continuity

- Public Site version truth advanced to v429.
- Service Worker cache namespace and development reset flag advanced to v429.
- Public runtime / form-guard markers advanced to v429.
- Safe Public-only build and Public/Private boundary remain unchanged.
- Lead Bridge remains same-origin and continues to keep Admin signing secrets server-side.

## Admin integration

Private Admin advances to v429 with:
- quarantine workflow state machine,
- weighted owner workload recommendations,
- controlled auto-assignment,
- SLA pause/resume with reasons,
- supervisor-review gate,
- automatic escalation policy,
- encrypted collaboration-note threading.

No customer quarantine payload is required for list, workflow, workload, SLA or supervisor operations.
