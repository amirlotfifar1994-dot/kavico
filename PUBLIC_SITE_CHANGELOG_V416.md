# KAVICO Public Site Changelog — v416

v416 is a public visual/UX hardening release built on the verified v415 full-project baseline. The private administration control plane remains v414 and is not functionally modified by this public release.

## Visual system

- Added `assets/css/bundles/v416-public-system.v416.css` as a single, reversible public design-system overlay.
- Applied the `v416-public` body marker and the v416 stylesheet to all 204 public HTML documents.
- Reduced oversized section whitespace while preserving page-specific composition.
- Standardized card radii, vertical rhythm, hover elevation, typography wrapping, focus treatment and minimum touch targets.
- Standardized article/card image presentation with consistent aspect ratios and `object-fit` behavior.
- Improved desktop grid density with auto-fit behavior to reduce orphaned empty columns.
- Preserved useful two-column tablet layouts and enforced clean one-column mobile layouts.
- Improved article reading rhythm, heading scroll offsets, FAQ touch targets and print behavior.
- Improved reduced-motion handling and keyboard focus visibility.

## Mobile and RTL

- Tightened section spacing on narrow screens without collapsing information density.
- Normalized action groups so primary/secondary actions do not create uneven rows.
- Kept cards single-column on compact screens and ensured media follows a consistent 16:9 mobile ratio.
- Preserved RTL typography and phone/email bidi behavior.

## Freshness/runtime

- Service Worker cache namespace advanced from `kavico-v415` to `kavico-v416`.
- Development cache marker advanced to `dev=416`.
- Sitemap `lastmod` values were refreshed to `2026-08-18` because every public document now references the v416 presentation layer.

## QA hardening

- Replaced the v415 public audit entry point with `scripts/audit-public-v416.mjs`.
- v416 audit now validates local references, viewport policy, duplicate IDs, image alt/intrinsic dimensions/loading policy, indexable-page SEO essentials, JSON-LD parsing, Knowledge Hub locale routing, and article hero uniqueness by locale.
- Full-project QA continues to build a public-only deployment tree and then re-audit the generated artifact before running the private-admin test suite.

## Scope boundary

- Private Admin remains v414.
- No runtime database, environment secret, private key or external backup artifact is introduced into the full-project source archive.
- Public deployment continues to use the explicit allowlist builder and `dist-public`; the private-admin source is not part of the static public deployment.
