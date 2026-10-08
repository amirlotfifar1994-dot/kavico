# Public Site Changelog v426

- Project Brief form action moved to same-origin `/.netlify/functions/lead-bridge`.
- Legacy `data-netlify` / `netlify-honeypot` form interception removed; honeypot remains a normal hidden field and is also evaluated by the authoritative ingestion path.
- Added fixed `bridge_return_to` allowlisted paths for Persian/English thanks pages.
- Added Netlify Function bridge with origin verification, HMAC request signing and HMAC-only client network/User-Agent fingerprints.
- Public runtime/form guard version advanced to v426; accidental double-submit and advisory browser abuse signals remain.
- Service Worker / Version Truth advanced to v426.
- All v425 CSP, SRI, responsive-image and production-boundary controls preserved.
