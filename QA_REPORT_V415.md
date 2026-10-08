# KAVICO Full Project v415 — QA Report

Release QA is designed to cover both security surfaces: the public static website and the protected v414 private-admin control plane.

## Public source tree

- HTML files audited: 204
- Local `href` / `src` / `srcset` references checked: 9,417
- Missing local references: 0
- Knowledge Hub static cards: 38 Persian + 38 English
- English Hub cross-locale `/blog/...` card links: 0
- Broken Hub `guides/...` relative routes: 0
- Raw `/blog/...` topic labels: 0
- Stale `© 2025` / `© ۱۴۰۴` footer markers: 0
- Service Worker cache namespace: `kavico-v415`
- Service Worker dev marker: `dev=415`

Command:

```bash
npm run audit:public
```

Result: PASS.

## Safe deployment tree

`npm run build:public` generated `dist-public/` using an explicit public allowlist. The generated tree was audited independently with the same public audit rules.

- HTML files: 204
- Local references checked: 9,417
- Missing references: 0
- Private admin included in deployment tree: no
- Root QA/provenance/source scripts included in deployment tree: no

Commands:

```bash
npm run build:public
npm run audit:dist
```

Result: PASS.

## Private Admin v414

Executed from the full-project package:

```bash
npm run test:admin
npm run check:admin
```

Results:

- tests: 38/38 PASS
- failed: 0
- skipped: 0
- admin JavaScript syntax check: PASS

## Release boundary

Netlify is configured to publish `dist-public`, not the repository root. `_redirects` also contains explicit hard blocks for `kavico_v414_admin/*` and project/developer metadata paths as defense in depth.

## Packaging verification

The final release process regenerates `FULL_PROJECT_SHA256SUMS.txt`, creates the ZIP from a clean source tree without `dist-public/`, extracts it into a clean directory, verifies every internal SHA-256 entry, re-runs the public audit, and confirms ZIP integrity. Final counts and archive SHA-256 are recorded after packaging.

## Final source inventory

- Source files before checksum manifest: 809
- Internal checksum entries: 809
- Files in release tree after manifest: 810
- Public deploy allowlist files: 648
- Private Admin v414 files: 149
- Generated `dist-public/` embedded in source archive: no
