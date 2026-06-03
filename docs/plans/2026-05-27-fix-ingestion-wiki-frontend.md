# Klear Karma Astro Wiki Frontend Recovery Implementation Plan

> **Status update (2026-06-01):** The local `public/notebooklm/` asset approach is retired. Active media and NotebookLM downloads are hosted from the configured Cloudflare R2 bucket and referenced through `src/data/site-data.json` and `src/data/artifacts.json`.

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the standalone Klear Karma Astro wiki so the generated source documents, NotebookLM artifacts, media files, and ingestion-system narrative are visible, navigable, and visually aligned with a durable design system.

**Architecture:** Keep the standalone Astro repo as the deployable site, but treat generated data as an explicit content contract instead of implicit decorative JSON. Create a `DESIGN.md`, normalize artifact/media data, replace the oversized doc hero with content-first layouts, and add verification that every linked file and image resolves before shipping.

**Tech Stack:** Astro 5, Astro content collections, hosted artifact assets in Cloudflare R2, CSS custom properties, no new runtime framework dependency unless explicitly justified.

---

## Activated Skills

- `using-superpowers`: required skill-orchestration protocol.
- `writing-plans`: produce an executable implementation plan with bite-sized tasks.
- `systematic-debugging`: root-cause first; do not guess at “data not loading.”
- `design-consultation`: create durable `DESIGN.md` before visual rewrites.
- `plan-design-review`: ensure the plan explicitly covers hierarchy, states, responsive behavior, and AI-slop risks.
- `ui-ux-pro-max`: apply professional UI checklist, especially no emoji-as-icons, accessibility, contrast, responsive checks.
- `design-taste-frontend`: enforce premium frontend taste, avoid generic card grids and decorative noise.
- `superdesign`: use for design context/draft workflow before implementing final visual surfaces.
- `web-motion-library`: constrain motion to meaningful transitions and avoid wasteful ambient effects.

## Current Diagnosis

- Files are listed in `src/data/artifacts.json` and hosted from Cloudflare R2, including PNG, PDF, MP3, MP4, CSV, JSON, and Markdown artifacts.
- `src/data/site-data.json` has `heroImage: ""`, `heroImageAlt: ""`, `metrics[1].value: "0"` for visual assets, and only one `visualHighlights` entry.
- The page in the screenshot is the French route, so the nav/content labels are translated, but the actual Markdown content is far below the enormous title because `DocLayout.astro` renders a giant hero before the document body.
- Background imagery is poor because `PixelMediaLayer.astro` blindly reuses the same NotebookLM infographic as ambient decorative texture rather than selecting intentional brand/media assets.
- The standalone repo has no `DESIGN.md`, so there is no source of truth for typography, density, motion, media usage, or ingestion-system presentation.
- The current site is closer to “generated wiki skin” than the planned ingestion/research system portal.

## 20-Step Plan

### Step 1: Freeze the Current Bug Report as Acceptance Criteria

**Files:**
- Create: `docs/audits/current-frontend-failures.md`

**Action:** Document the exact observed failures from the screenshot:
- “NotebookLM page appears empty above the fold.”
- “Artifacts/files exist but are not surfaced as actionable cards.”
- “Ambient background images are low-quality/repetitive.”
- “The UI does not communicate the ingestion system.”

**Verification:** Re-read the audit and confirm each failure maps to a later task.

### Step 2: Add a Durable Design Source of Truth

**Files:**
- Create: `DESIGN.md`
- Create or modify: `AGENTS.md`

**Action:** Write the standalone repo’s design system:
- Product type: immersive knowledge/research portal for Klear Karma.
- Aesthetic: editorial, premium, dark, trust-led, not decorative fantasy.
- Typography: replace serif-heavy/doc-title look with Sora or a stronger display/body pairing already present in data.
- Motion: intentional reveal and state transitions only.
- Media rule: background media must be abstract, cropped, desaturated, and never compete with text.

**Verification:** `DESIGN.md` includes color tokens, type scale, spacing scale, motion rules, media usage rules, and anti-patterns.

### Step 3: Run Superdesign Repo Initialization

**Files:**
- Create: `.superdesign/init/components.md`
- Create: `.superdesign/init/layouts.md`
- Create: `.superdesign/init/routes.md`
- Create: `.superdesign/init/theme.md`

**Action:** Follow `superdesign` init requirements so future design work is grounded in the Astro components and routes.

**Verification:** All four init files exist and reference the actual `src/components`, `src/layouts`, `src/pages`, and CSS tokens.

### Step 4: Add a Data Contract Test for Artifact Visibility

**Files:**
- Create: `scripts/verify-site-data.mjs`
- Modify: `package.json`

**Action:** Write a Node script that reads `src/data/site-data.json` and checks:
- `heroTitle`, `heroSubtitle`, and `storyPillars` are non-empty.
- `notebooklmHighlights.length >= 4`.
- `visualHighlights.length >= 3`.
- Every `downloadHref` uses the configured Cloudflare R2 base URL.
- Every `image` path exists if non-empty.

**Verification:** Run `bun run verify:data`; expected initial result may fail until later steps populate image/media data.

### Step 5: Add a Route Smoke Test for Content Pages

**Files:**
- Create: `scripts/smoke-routes.mjs`
- Modify: `package.json`

**Action:** Add a build-output verifier that checks generated `dist` HTML includes body content, artifact download links, image references, and no legacy local `/notebooklm/` URLs.

**Verification:** `bun run build && bun run verify:routes` passes only when files and content are actually surfaced.

### Step 6: Replace Emoji Icons with Durable SVG/Icon Metadata

**Files:**
- Modify: `src/data/site-data.json`
- Modify: `src/components/DocCard.astro`
- Modify: `src/components/Navigation.astro`
- Modify generated docs only if needed after pipeline fix.

**Action:** Remove emoji-as-icons from UI rendering. Map categories/kinds to simple inline SVG marks or text badges.

**Verification:** Grep rendered `src/components` for emoji UI usage and ensure none remain in component markup.

### Step 7: Build an Explicit Artifact Inventory

**Files:**
- Create: `src/data/artifacts.json`
- Modify: `src/data/site-data.json`

**Action:** Promote every NotebookLM file from passive links into structured entries:
- reports: 3
- infographics: 3
- decks: 4
- audio: 3
- videos: 2
- tables: 3
- flashcards: 2
- quizzes: 2
- mind map: 1

**Verification:** `artifacts.json` has the expected hosted artifact entries and every `href` points to the configured R2 bucket.

### Step 8: Create Artifact Browser Components

**Files:**
- Create: `src/components/ArtifactBrowser.astro`
- Create: `src/components/ArtifactGroup.astro`
- Create: `src/components/ArtifactPreview.astro`

**Action:** Render artifacts by type with appropriate previews:
- PNG as image previews.
- MP3 as `<audio controls>`.
- MP4 as `<video controls preload="metadata">`.
- CSV/JSON as file cards with row/item counts.
- PDFs as deck cards with download/open actions.

**Verification:** Artifact page visibly shows all 23 artifacts without requiring users to scroll through plain Markdown links.

### Step 9: Replace the Oversized Doc Hero on Artifact Pages

**Files:**
- Modify: `src/layouts/DocLayout.astro`
- Modify: `src/pages/[locale]/docs/[...slug].astro`

**Action:** Add a layout mode for `research/notebooklm-artifacts` and report pages:
- Compact title block.
- Artifact browser above the fold.
- Document body immediately visible.

**Verification:** On `/en/docs/research/notebooklm-artifacts/`, artifact cards appear in the first viewport.

### Step 10: Fix the Background Image System

**Files:**
- Modify: `src/components/PixelMediaLayer.astro`
- Modify: `src/styles/immersive.css`
- Modify: `src/data/site-data.json`

**Action:** Stop using NotebookLM infographics as floating page-background thumbnails. Replace the background layer with:
- CSS gradient mesh.
- Optional abstract brand diagram texture only if a suitable asset exists.
- No repeated tiny image tiles behind content.

**Verification:** Direct visual check: no recognizable/low-quality infographic tiles appear behind text.

### Step 11: Add Proper Hero Media or Remove the Hero Media Slot

**Files:**
- Modify: `src/data/site-data.json`
- Modify: `src/components/PortalHome.astro`

**Action:** Either set `heroImage` to a high-quality deliberate asset or redesign the hero to be typography/data-led when no hero image exists.

**Verification:** Home page does not show a giant placeholder block or repeated “Klear Karma” fallback as a fake image.

### Step 12: Reframe the Homepage Around the Ingestion System

**Files:**
- Modify: `src/components/PortalHome.astro`
- Modify: `src/data/site-data.json`

**Action:** Make the first screen communicate the actual system:
- Source intake.
- Brandmint processing.
- NotebookLM artifact generation.
- Wiki publishing.
- Review/deployment.

**Verification:** A new visitor can understand the ingestion pipeline by scanning the homepage headings only.

### Step 13: Create a Source-to-Artifact Flow Section

**Files:**
- Create: `src/components/IngestionFlow.astro`
- Modify: `src/components/PortalHome.astro`

**Action:** Add a non-generic process visualization with 5 stages:
- Brand config/source docs.
- Brandmint waves.
- NotebookLM sources.
- Artifacts.
- Astro wiki/Vercel.

**Verification:** Flow section contains real counts from `site-data.json`/`artifacts.json`, not fake marketing numbers.

### Step 14: Add Loading/Empty/Error States for Data-Driven Components

**Files:**
- Modify: `src/components/ArtifactBrowser.astro`
- Modify: `src/components/ShowcaseGrid.astro`
- Create: `src/components/EmptyState.astro`

**Action:** Even though this is static, encode visible states:
- Empty artifact list.
- Missing preview image.
- File exists but no preview available.

**Verification:** Temporarily test with empty artifact data and confirm the UI explains what is missing and how to regenerate it.

### Step 15: Tighten Responsive Layouts

**Files:**
- Modify: `src/styles/immersive.css`

**Action:** Audit and fix:
- 320px mobile.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.
- Ultra-wide browser, where current content floats awkwardly left.

**Verification:** No horizontal scroll, no content hidden behind sticky nav, artifact cards remain usable.

### Step 16: Add Accessibility Pass

**Files:**
- Modify: relevant components in `src/components/*.astro`

**Action:** Add:
- Semantic landmarks.
- Accessible labels for artifact actions.
- Descriptive alt text for images.
- Visible focus states.
- Minimum 44px touch targets.

**Verification:** Keyboard tab through `/en/` and `/en/docs/research/notebooklm-artifacts/` reaches all actionable controls visibly.

### Step 17: Add Design QA Script or Checklist

**Files:**
- Create: `docs/audits/design-qa-checklist.md`
- Modify: `package.json` if automated checks are added.

**Action:** Encode the visual QA checklist:
- No emoji UI icons.
- No decorative card grid as the first impression.
- No media behind readable text.
- No broken artifact links.
- No empty hero image fallback.
- Artifact browser above fold.

**Verification:** Checklist is used after implementation and before commit.

### Step 18: Rebuild and Verify Locally

**Files:**
- No source changes unless verification fails.

**Action:** Run:
```bash
bun run verify:data
bun run build
bun run verify:routes
bun run preview --host 0.0.0.0
```

**Verification:** All commands pass; preview routes return 200 for `/en/`, `/en/docs/research/notebooklm-artifacts/`, and `/en/docs/product/overview/`; artifact media resolves from R2.

### Step 19: Commit and Push the Fixed Standalone Repo

**Files:**
- All changed standalone wiki repo files.

**Action:** Commit with a clear message:
```bash
git add -A
git commit -m "fix: surface artifacts and apply durable wiki design system"
git push
```

**Verification:** GitHub repo `Sheshiyer/kkv2-astro-wiki` receives the commit.

### Step 20: Backport Durable Fixes to the Generator Template

**Files:**
- Modify: `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/brandmint-oracle-aleph/skills/publishing/markdown-to-astro-wiki/template-immersive/...`
- Modify: `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/brandmint-oracle-aleph/brandmint/publishing/brand_docs_publisher.py`
- Modify tests in `/Volumes/madara/2026/twc-vault/01-Projects/thoughtseed/brandmint-oracle-aleph/tests/test_brand_docs_publisher.py`

**Action:** Port all validated standalone fixes back into the Brandmint generator so the next rebuild does not overwrite them.

**Verification:** In the Brandmint repo:
```bash
uv run pytest tests/test_brand_docs_publisher.py tests/test_source_curator.py
git diff --check
```

## Recommended Execution Order

1. Steps 1-5 first: establish evidence, design authority, and data checks.
2. Steps 6-14 second: fix artifact visibility, media strategy, and ingestion-system story.
3. Steps 15-18 third: responsive, accessibility, and local verification.
4. Steps 19-20 last: push standalone repo, then backport to the durable generator.

## Not In Scope

- Re-running Brandmint waves 1-6.
- Re-generating NotebookLM artifacts.
- Uploading new images to NotebookLM.
- Adding a database or live ingestion backend to the static Astro site.
- Switching to Next.js; this is an Astro repo and should stay Astro unless a separate product decision changes that.

## Acceptance Criteria

- The first viewport explains Klear Karma and the source-to-artifact ingestion system.
- `/en/docs/research/notebooklm-artifacts/` visibly surfaces all 23 artifacts.
- Every artifact file link resolves from the configured R2 bucket after build.
- Background treatment is abstract and premium, not repeated screenshots/infographics.
- `DESIGN.md` exists and is referenced by `AGENTS.md`.
- No component uses emoji as UI icons.
- `bun run build`, `bun run verify:data`, and route smoke checks pass.
