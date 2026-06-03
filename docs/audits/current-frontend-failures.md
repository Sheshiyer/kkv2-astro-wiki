# Current Frontend Failures Audit

**Date:** 2026-05-27
**Branch:** kkv2-wiki-v2/wiki-site
**Status:** SUPERSEDED BY R2-HOSTED ASSET CONTRACT ON 2026-06-01

## Observed Failures

### 1. Content Visibility Failure
- **Description:** The primary content (Markdown docs, artifact lists) is not visible above the fold.
- **Evidence:** Screenshot shows giant hero title taking full viewport, with actual content pushed below.
- **Root Cause:** `DocLayout.astro` renders a full-viewport hero before document body.
- **Impact:** Users must scroll to find any substance; makes site appear empty.

### 2. Artifact Discovery Failure
- **Description:** NotebookLM artifacts are hosted in the configured Cloudflare R2 bucket and must be surfaced as a browsable gallery.
- **Evidence:** Artifact records exist in `src/data/artifacts.json` with R2 URLs, but older notes referenced a removed local `public/notebooklm/` copy.
- **Root Cause:** No dedicated artifact browser component; media files treated as decorative rather than primary content.
- **Impact:** High-value generated artifacts are effectively invisible.

### 3. Background Quality Failure
- **Description:** Ambient background images are low-quality, repetitive, and distracting.
- **Evidence:** `PixelMediaLayer.astro` reuses a single NotebookLM infographic as floating tiles behind text.
- **Root Cause:** Background layer uses first available image without curation; no abstract texture asset exists.
- **Impact:** Reduces trust and readability; looks like a template, not a premium product.

### 4. Missing Design Authority
- **Description:** The standalone repo has no `DESIGN.md` or design system documentation.
- **Evidence:** No `DESIGN.md` found in root; `AGENTS.md` references implementation but not design rationale.
- **Root Cause:** Template was generated without design documentation.
- **Impact:** Future changes have no source of truth; risk of inconsistent visual language.

### 5. Data Contract Weakness
- **Description:** `site-data.json` claims 0 visual assets despite 23 artifacts existing.
- **Evidence:** `"metrics": [{"label": "Visual assets", "value": "0"}]`, `"heroImage": ""`
- **Root Cause:** Publisher does not map artifact files into site data metrics or visual highlights.
- **Impact:** Home page metrics mislead users; hero section looks broken.

### 6. Navigation/Translation Confusion
- **Description:** Screenshot shows French route (`/fr/docs/...`) but content is in English.
- **Evidence:** Nav labels are translated but document content is not.
- **Root Cause:** i18n framework present but content not localized; nav may link to wrong locale.
- **Impact:** Confusing UX for non-English speakers.

### 7. Emoji UI Anti-Pattern
- **Description:** Components use emoji characters (📄, 🎵, etc.) as UI icons.
- **Evidence:** `DocCard.astro`, `Navigation.astro`, and generated docs contain emoji markers.
- **Root Cause:** Template used emoji for quick visual categorization.
- **Impact:** Unprofessional appearance; accessibility issues (screen readers may read emoji names); breaks design consistency.

## Acceptance Criteria for Resolution

- [ ] Homepage first viewport explains Klear Karma and the ingestion pipeline
- [ ] `/en/docs/research/notebooklm-artifacts/` surfaces all 23 artifacts above the fold
- [ ] Every artifact link in `src/data/artifacts.json` resolves from the configured R2 bucket
- [ ] Background treatment is abstract and premium (no repeated infographics)
- [ ] `DESIGN.md` exists and defines typography, color, spacing, motion, media rules
- [ ] No component uses emoji as UI icons
- [ ] `site-data.json` accurately reflects artifact counts
- [ ] Build and verification scripts pass
- [ ] Responsive layouts work at 320px, 768px, 1024px, 1440px+
- [ ] Keyboard navigation reaches all interactive elements
