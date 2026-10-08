# KAVICO Public Site Changelog v424

## Security / submission boundary

- Replaced the v423 CSP hash sprawl with one verified SHA-256 hash for the byte-identical synchronous theme bootstrap.
- JSON-LD remains inline and parse-valid, but no longer contributes unnecessary executable-script hashes.
- Added `script-src-attr 'none'` and `style-src-attr 'none'`; Public HTML contains zero inline event handlers and zero `style=` attributes.
- Added explicit `frame-ancestors 'none'`, `worker-src 'self'`, and retained same-origin `form-action` / `connect-src` boundaries.
- Normalized FA and EN Project Brief actions to fixed absolute same-origin paths.
- Added explicit UTF-8 form charset while retaining Netlify form binding and honeypot protection.
- Added `audit:csp` / `audit:csp:dist` to the full-project QA gate.

## CSP delta

- v423 CSP length: 7,348 characters
- v423 SHA-256 hashes: 131
- v424 CSP length: 445 characters
- v424 SHA-256 hashes: 1

No new synchronous network request was introduced for theme selection; the existing hashed inline bootstrap remains to avoid theme flash.
