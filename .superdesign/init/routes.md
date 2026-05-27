# Superdesign Init — Routes

**Project:** Klear Karma Astro Wiki
**Date:** 2026-05-27

## Route Map

### Home
- `GET /` → Redirects to `/en/`
- `GET /en/` → PortalHome (English)
- `GET /fr/` → PortalHome (French, if translated)

### Documentation
- `GET /en/docs/[...slug]` → DocLayout (standard mode)
  - `/en/docs/product/overview`
  - `/en/docs/brand/visual-guidelines`
  - `/en/docs/marketing/campaign-copy`
  - `/en/docs/research/notebooklm-artifacts` → DocLayout (artifact-browser mode)

### Artifacts (Direct)
- `GET /en/artifacts` → ArtifactLayout (full browser)

### NotebookLM
- `GET /en/notebooklm` → NotebookLM summary page

### Static Assets
- `GET /notebooklm/*` → Static files from `public/notebooklm/`

## Route Design Rules

1. All routes under `[locale]/` for i18n support
2. Default locale: `en`
3. Fallback: redirect `/` to `/en/`
4. 404: Custom not-found page with search suggestion
5. No trailing slash normalization needed (Astro handles this)

## Data Flow

```
src/data/site-data.json ──┬──→ PortalHome.astro
                          ├──→ Navigation.astro
                          └──→ Footer

src/data/artifacts.json ──┬──→ ArtifactBrowser.astro
                          ├──→ ArtifactCard.astro
                          └──→ IngestionFlow.astro

src/content/docs/ ────────┬──→ DocLayout.astro
                          └──→ [...slug].astro
```
