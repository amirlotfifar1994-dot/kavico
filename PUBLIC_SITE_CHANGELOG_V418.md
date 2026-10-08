# KAVICO Public Site Changelog — v418

v418 is a shell/accessibility/performance hardening release built on the verified v417 Full Project. It keeps page content, information architecture, SEO coverage, article imagery and Private Admin v414 intact while strengthening the global navigation shell, theme consistency, footer ergonomics, keyboard/touch accessibility and first-content-image loading policy.

## Global shell

- Added `assets/css/bundles/v418-shell-accessibility-performance.v418.css` to all 204 Public HTML pages.
- Added `assets/js/bundles/v418-shell-runtime.v418.js` to all 204 Public HTML pages.
- Added `v418-public` to all Public bodies while retaining v416/v417 layers for safe inheritance.
- Made the header consistently sticky across Public page families with a restrained scrolled state.
- Improved desktop active-navigation indication and propagates current-state context to dropdown parents.
- Refined dropdown and mobile navigation panel surfaces, touch sizing and scroll containment.
- Improved footer hierarchy, touch targets and responsive two-/one-column collapse.

## Theme consistency

- Added `color-scheme: dark/light` metadata to every Public HTML document.
- Native form/control color scheme follows the selected Light/Dark/Nebula theme.
- Theme control now receives a dynamic localized accessible label describing the current theme.
- Language switch receives a localized accessible label/title.
- Added `prefers-contrast: more` hardening without altering document structure.
- Preserved and strengthened `prefers-reduced-motion` behavior.

## Accessibility

- v418 QA enforces skip-link, header, main, primary-nav and footer landmarks on every indexable page.
- Focus-visible treatment is consistent across links, buttons, summaries and form controls.
- Mobile navigation touch targets are at least shell-standard size and retain the existing focus trap/Escape behavior from the stable shared runtime.
- Static accessibility scan across all 124 indexable pages reports zero unnamed buttons/links, zero unlabeled form controls and zero missing `lang/dir` pairs.

## Performance / LCP policy

- The first image inside `<main>` is statically required to use `loading="eager"` and `fetchpriority="high"`.
- 18 pages that previously marked their first content image `lazy/low` were corrected, including service, local-service and Hub pages in both locales.
- Later images retain their existing lazy-loading policy.
- Service Worker cache namespace/dev marker advanced to v418.

## Deployment boundary

The v415+ explicit Public-only build remains unchanged in principle. `dist-public/` is rebuilt from the allowlist and contains no Private Admin source, QA/provenance files or root development metadata.
