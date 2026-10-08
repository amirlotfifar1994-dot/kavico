# KAVICO v429 Netlify / Lead Bridge Environment

The browser receives no Private Admin secret. Keep all real secrets in the deployment environment.

## Public / Lead Bridge

The public site keeps the v426+ same-origin Lead Bridge contract. Configure the Admin HTTPS endpoint and HMAC/fingerprint secrets only in the Netlify Function environment. Never expose them in public JavaScript or HTML.

Static public output is generated with:

```bash
npm run build:public
```

The publish tree is `dist-public/`. Netlify Functions are sourced separately from `netlify/functions/`.

## Private Admin v429

Private Admin runtime settings live in:

`kavico_v429_admin/.env.example`

v429 adds workflow-policy variables for automatic escalation, supervisor review and bounded SLA pause. These belong only to the Admin runtime.

## Release rule

Run:

```bash
npm run qa:full
```

before promotion. The source release ZIP intentionally excludes generated `dist-public/`; it must be reproducibly rebuilt from the artifact.
