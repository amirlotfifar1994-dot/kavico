# KAVICO Full Project QA Report — v416

## Scope

Full project assembly: Public Site v416 + Private Admin v414.

## Public source audit

Command:

```bash
npm run audit:public
```

Result: PASS

- Public HTML files: 204
- Indexable pages: 124
- Local HTML references checked: 9,621
- Public images checked in HTML: 624
- JSON-LD blocks parsed: 132
- Pages carrying `v416-public`: 204 / 204
- Persian article hero images: 32 unique / 32 articles
- English article hero images: 32 unique / 32 articles
- Missing local references: 0
- Duplicate HTML IDs: 0
- Missing image alt attributes: 0
- Missing intrinsic image dimensions: 0
- Missing image loading policy: 0
- Indexable page SEO-essential failures: 0
- Hub locale/guide route errors: 0
- Stale 2025 / 1404 copyright pages: 0

## Public deployment build

Commands:

```bash
npm run build:public
npm run audit:dist
```

Result: PASS

Generated `dist-public` file count: 649

- HTML: 204
- CSS: 34
- JavaScript: 18
- WEBP: 229
- AVIF: 69
- JPG: 65
- Public deployment references checked: 9,621
- Private Admin files in generated public deployment: 0

`dist-public` is generated during QA and is intentionally excluded from the source release ZIP because it is reproducible from the allowlisted public source.

## Private Admin regression

Commands:

```bash
npm run test:admin
npm run check:admin
```

Result: PASS

- Admin version: v414
- Tests: 38 / 38 PASS
- Syntax check: PASS

## Full-project QA

Command:

```bash
npm run qa:full
```

Result: PASS

This command audits the source Public Site, builds and re-audits the safe Public deployment tree, runs all 38 Admin tests, and performs Admin syntax checks.

## Visual QA

Representative Home, Services and Blog pages were rendered in an isolated browser QA copy with the production CSS/images inlined. Desktop and mobile Home were inspected after the v416 overlay. The release source itself was not modified for this preview process.

Observed outcomes:

- reduced orphaned whitespace between public sections;
- denser and more consistent card grids;
- stable one-column compact-mobile layout;
- preserved RTL hierarchy and CTA prominence;
- no deliberate replacement of article hero assets because the article hero audit already confirms unique hero images per article/locale.

## Security/packaging boundary

- Static public deployment remains allowlist-only.
- Private Admin remains outside `dist-public`.
- No real `.env`, PEM/private key, runtime SQLite database, `.kbx`, or external backup payload is part of the release source.
