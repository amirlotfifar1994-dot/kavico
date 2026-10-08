# Kavian Coating Group (KAVICO)

Bilingual (Persian RTL / English LTR) static website for Kavian Coating Group — industrial and decorative PVD, nickel-chrome and polishing services. Live domain: **https://kavico.ir**

- Static HTML/CSS/JS, no framework
- Deployed on Netlify (`netlify.toml`, `_headers`, `_redirects`)
- One Netlify function: the contact-form Lead Bridge (`netlify/functions/`)
- The private admin/ingest service is **not** in this repository. It lives in the separate private repo `kavico-admin` (optionally cloned into `kavico_v434_admin/`, which is git-ignored here).

## Requirements

Node.js 20+ (developed on Node 24). No install step is needed for the public site.

## Local preview

```bash
python -m http.server 8099
# open http://localhost:8099/
```

Sources are served directly. The browser service worker can serve stale scripts while developing — unregister it in DevTools (Application → Service Workers) if a change does not show up.

## Build and QA

```bash
npm run build:public   # writes dist-public/ (this is what gets deployed)
npm run qa:public      # all public audits, tests, build, and audits of the build output
npm run qa:full        # qa:public + admin tests (needs the admin repo cloned into kavico_v434_admin/)
```

Only `dist-public/` is published. It excludes the admin app, scripts, QA reports and package metadata.

## Cache-busting rule (important)

Files under `assets/css/bundles/` and `assets/js/bundles/` are served with `Cache-Control: immutable, max-age=1 year`. **Editing one in place will never reach returning visitors.** After changing a bundle:

1. Rename it (bump the version, and for hashed bundles use the new content hash).
2. Update every reference to the old name (all HTML files, and the regex assertion in `scripts/audit-public-v434.mjs`).
3. Run `npm run qa:full`.

HTML files are not cached (`max-age=0, must-revalidate`), so HTML edits need no rename.

## Deploying to Netlify

Connect the repository; Netlify runs `node scripts/build-public-deploy.mjs` and publishes `dist-public/` (see `netlify.toml`).

Set these environment variables in **Site settings → Environment variables** — without them the contact form is rejected:

| Variable | Purpose |
| --- | --- |
| `KAVICO_PUBLIC_ALLOWED_ORIGINS` | Allowed form origins, e.g. `https://kavico.ir` |
| `KAVICO_ADMIN_INGEST_URL` | Endpoint that receives submitted leads |
| `KAVICO_BRIDGE_FINGERPRINT_SECRET` | Secret used to fingerprint clients |
| `KAVICO_INGEST_HMAC_SECRET` | HMAC secret for signing lead ingestion |

Never commit real values for these. Attach the `kavico.ir` domain in Netlify (apex domain as primary — canonical URLs, sitemap and robots all use `https://kavico.ir`).

## Layout

| Path | Contents |
| --- | --- |
| `index.html`, `about/`, `services/`, `blog/`, `contact/` … | Persian pages (default locale) |
| `en/` | English mirror of every page |
| `assets/` | Images, fonts, versioned CSS/JS bundles |
| `netlify/functions/` | Lead Bridge function |
| `scripts/` | Build and audit scripts |
| `kavico_v434_admin/` | Not tracked: local checkout of the private `kavico-admin` repo |
| `*_V4xx.*` in the root | Generated version reports, provenance and checksums |

A static preview of the built site is published on GitHub Pages with `npm run publish:preview` (needs `gh` signed in). It goes to the separate repo `<user>.github.io` because the site only works at a domain root (root links, `/en/` language switching). Pages serves static files only, so the contact form (a Netlify function) works on Netlify/`kavico.ir`, not on the preview. The preview has `robots.txt` set to Disallow so it does not compete with `kavico.ir` in search.

Public contact details on the site (phone, email, address) are intentionally public.
