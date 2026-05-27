# Klear Karma Astro Wiki — Agent Guidelines

**Project:** Klear Karma v2 Research Portal
**Repository:** https://github.com/Sheshiyer/kkv2-astro-wiki
**Tech Stack:** Astro 5, Static Site Generation, Bun
**Design Authority:** `DESIGN.md` (required reading before any visual change)

## Quick Start

```bash
# Install dependencies
bun install

# Development server
bun run dev --host 0.0.0.0

# Build
bun run build

# Verification
bun run verify:data
bun run verify:routes
```

## Design Authority

All visual decisions must follow **`DESIGN.md`**. Key rules:
- Dark theme by default
- No emoji as UI icons
- Content-first layouts
- Abstract backgrounds only
- Motion serves state, never decorates

## Content Sources

- **Brand data:** `src/data/site-data.json`
- **Artifacts:** `src/data/artifacts.json` (NotebookLM outputs)
- **Documents:** `src/content/docs/` (Markdown)
- **Assets:** `public/notebooklm/` (generated artifacts)

## Verification Checklist

Before committing changes:
1. `bun run verify:data` — check data contract
2. `bun run build` — confirm build succeeds
3. `bun run verify:routes` — confirm no broken links
4. Visual check at 320px, 768px, 1024px, 1440px
5. Keyboard tab test
6. No emoji in rendered UI

## Architecture Decisions

- **Static site:** No server runtime; all data baked at build time
- **Content collections:** Astro content collections for docs
- **Data files:** JSON for site metadata and artifact inventory
- **i18n:** `[locale]` routing; content not yet translated
- **Deployment:** Vercel connected to GitHub repo

## File Conventions

- Components: `PascalCase.astro`
- Layouts: `PascalCaseLayout.astro`
- Pages: `[param]/page.astro` or `page.astro`
- Styles: `kebab-case.css`
- Data: `kebab-case.json`

## Common Pitfalls

- Don't edit `dist/` directly — changes will be lost on rebuild
- Don't use emoji in components — use SVG or text
- Don't put images behind text — backgrounds must be abstract
- Don't create full-viewport heroes on content pages
- Don't fake data — always source from `site-data.json` or `artifacts.json`

## Related Documents

- `DESIGN.md` — Visual design system (required reading)
- `docs/audits/current-frontend-failures.md` — Known issues being fixed
- `docs/plans/2026-05-27-fix-ingestion-wiki-frontend.md` — Implementation plan
