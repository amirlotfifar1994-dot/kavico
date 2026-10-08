# KAVICO v428 Netlify / Lead Bridge Environment

The browser receives no Admin secret. Configure real values only in the deployment environment.

Required Bridge variables follow the v426/v427 contract (Admin HTTPS endpoint and HMAC signing/fingerprint secrets). Keep all secret values outside the repository.

The static publish directory is generated with `npm run build:public`; Netlify Functions are sourced separately from `netlify/functions/`.

Private Admin case-SLA variables are documented in `kavico_v428_admin/.env.example` and belong to the Admin runtime, not Public JavaScript.
