# KAVICO Public Site v415 — Changelog

## Scope

v415 is the first full-project iteration after Public v400 and Private Admin v414 were assembled into one source package. This release changes the public site and the full-project deployment boundary; it does not replace or downgrade the v414 private-admin control plane.

## Fixed: Knowledge Hub routing

The previous Hub runtime used the same root join logic for assets and localized content. As a result:

- English Hub cards could send users to Persian `/blog/...` URLs.
- `guides/...` records were not included in the recognized content prefixes and could resolve relative to `/hub/`, creating `/hub/guides/...` paths.

v415 introduces `assets/js/bundles/hub-runtime.v415.js` with locale-aware content routing while keeping assets rooted at `/assets/...`.

## Improved: progressive enhancement and crawlability

The Hub grid is now pre-rendered with 38 cards in both Persian and English. The existing JavaScript still performs filtering and sorting because the static cards use the same `data-*` contract as the runtime-generated cards.

Benefits:

- useful content exists before JavaScript executes;
- a temporary JavaScript failure no longer leaves the Hub empty;
- links remain available to crawlers and assistive/user agents;
- no duplicate cards are created because the runtime already skips generation when `.post-card` exists.

An `ItemList` JSON-LD block was also added to each Hub page.

## Improved: Hub content quality

Nineteen raw route labels such as `/blog/pvd-quote-guide/` were replaced by meaningful Persian/English article titles. The remaining industrial-cluster route was also converted to a descriptive label.

## Fixed: stale release/cache identity

- Public copyright: ۱۴۰۴ → ۱۴۰۵
- English copyright: 2025 → 2026
- Service Worker cache namespace: `kavico-v400` → `kavico-v415`
- Service Worker developer switch: `dev=399` → `dev=415`

This intentionally rotates Service Worker runtime/image/font cache names on activation.

## Security: full-project public deployment boundary

A full source archive contains both public files and private-admin source. Publishing the repository root directly is therefore unsafe.

v415 adds:

- `scripts/build-public-deploy.mjs` — creates `dist-public/` from an explicit public allowlist;
- `netlify.toml` — builds and publishes only `dist-public`;
- `_redirects` hard blocks for private-admin, scripts and project metadata as defense in depth;
- `.gitignore` exclusion for generated deployment output;
- root `package.json` with unified build/audit/QA commands.

The generated `dist-public/` is deliberately excluded from the source ZIP because it is reproducible and would duplicate the public site.

## QA coverage

See `QA_REPORT_V415.md` for public reference counts, deploy-tree audit, private-admin tests and final packaging verification.
