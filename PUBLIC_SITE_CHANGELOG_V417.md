# KAVICO Public Site Changelog — v417

v417 is a page-level experience pass built on the verified v416 Full Project. It keeps the Public information architecture, content inventory, SEO surface and Private Admin v414 intact while strengthening the visual hierarchy of the highest-value page families.

## Page experience changes

### Home
- Rebalanced the hero into a stronger editorial split with clearer headline scale, CTA hierarchy and media framing.
- Tightened proof badges and decision-proof blocks so the first screen communicates capability without artificial whitespace.
- Kept the existing before/after media and content claims; no new unsupported technical claims were introduced.

### Services
- Converted the service chooser into a responsive bento-style grid that uses desktop width without orphaned cells.
- Preserved all five service paths and their existing URLs/content.
- Improved tags, card hierarchy, CTA placement and compact/mobile behavior.

### Portfolio
- Made finish cards more image-led while retaining their evidence limitations and technical caveats.
- Improved finish image proportions, card hierarchy and comparison-case presentation.
- Kept visual-reference language explicit; images remain references, not technical specifications.

### Knowledge Hub and Articles
- Improved Hub filter/search framing and editorial card hierarchy.
- Added a lightweight article reading-progress indicator.
- Added automatic current-section highlighting for valid article TOC anchors using IntersectionObserver.
- The runtime is progressive enhancement only: article content and navigation remain usable without JavaScript.

### Contact / Project Brief
- Clarified the three contact routes and emphasized Project Brief as the primary technical path.
- Improved form field spacing, focus treatment and visual grouping without changing the established lead contract.
- Preserved Netlify form submission and the existing Admin ingestion/export contract fields.

## Shared responsive hardening

- Added `assets/css/bundles/v417-page-experience.v417.css` to all 204 Public HTML pages.
- Added `assets/js/bundles/v417-public-runtime.v417.js` to all 204 Public HTML pages.
- Added `v417-public` to each Public page body while retaining the v416 layer for safe inheritance.
- Updated the Service Worker cache namespace/dev marker to v417.
- Added explicit QA checks for Home hero anchors, five Service paths, four Portfolio finish cards, Contact routing/form anchors and article TOC structure.

## Deliberately unchanged

- Public page inventory and canonical URL architecture.
- Blog/article hero image assignments.
- Private Admin code remains v414.
- No storefront route was re-enabled.
- No Production deployment authority was added to the Admin.
