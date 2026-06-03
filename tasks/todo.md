# Klear Karma Landing V2 Plan

## MVP Build Cost, Team, And Scope Correction

Date: 2026-06-02
Scope: Correct founder-facing numbers so Shesh's equal-partner investment ask share, current MVP build cost, excluded launch/provider costs, and implementation team are represented accurately.

- [x] Locate stale cost/team/scope statements across founder, research, architecture, press, and index docs.
- [x] Reclassify 450,000 THB as Shesh's share of the investment ask to make the partners equal, not company valuation.
- [x] Update Business Model to show the 150,000 THB current MVP development build cost.
- [x] Clarify that 150,000 THB is the current MVP build cost for Shesh's Thoughtseed Labs team in India.
- [x] Clarify that the 150,000 THB build does not include third-party services, signup/registration, analytics, hosting, payment/KYC providers, legal/compliance, operations, marketing, or maintenance.
- [x] Update team copy to: Shesh Narayan Iyer leading Thoughtseed Labs India: 2 frontend developers, 1 backend developer, and 1 tester.
- [x] Replace stale 450,000 THB valuation wording and old 72-page/42-artifact summary claims in active docs.
- [x] Run `bun run verify:data`, `bun run build`, and `bun run verify:routes`.

### Results

- Founder Business Model now frames 450,000 THB as Shesh's equal-partner investment ask share and 150,000 THB as the current MVP development build cost only.
- Partner FAQ, Launch Dossier Index, Press Kit, Architecture, and research briefing/study-guide docs now use the same build-cost and team model.
- Stale public claims for 450,000 THB as valuation, 72-page wiki summary, 42 artifacts, 15% consultation commission, and single-person team were removed from active source docs.
- `bun run verify:data` passed.
- `bun run build` passed cleanly after clearing `.astro` and `node_modules/.astro`.
- `bun run verify:routes` passed: 81 HTML files, 2,457 links checked, 0 broken links, 0 missing trailing slashes.

## R2-Only NotebookLM Asset Cleanup

Date: 2026-06-01
Scope: Remove stale local NotebookLM/public resource copies and keep the active site wired to the configured Cloudflare R2 bucket.

- [x] Confirm active editable git repo is `kkv2-wiki-v2/wiki-site`, not archived `kkv2-wiki`.
- [x] Inventory active local media references in `src/data/site-data.json`, `src/components/PortalHome.astro`, and brand asset docs.
- [x] Identify configured hosted asset base: `https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev`.
- [x] Replace active landing/visual-library image references with hosted R2 URLs.
- [x] Rewrite the visual asset library so it references hosted R2 assets instead of `notebooklm-sources/`, `deliverables/notebooklm/`, or `/brand/`.
- [x] Harden data verification so landing, visual, and artifact media cannot drift back to local NotebookLM paths.
- [x] Remove stale local public media folders from `wiki-site/public/`.
- [x] Remove obsolete parent-level NotebookLM generated/source folders after active references are gone.
- [x] Run `bun run verify:data`, `bun run build`, and `bun run verify:routes`.
- [x] Confirm no active source references remain for `/notebooklm/`, `/brand/`, `/images/`, `notebooklm-sources`, or `deliverables/notebooklm` outside historical task notes and validator guard strings.

### Results

- Active landing media now uses hosted R2 URLs for the brand mark, hero image, visual library cards, and NotebookLM highlights.
- Removed `wiki-site/public/brand/` and `wiki-site/public/images/`; `public/` now only contains `logo.png` and `robots.txt`.
- Removed parent-level stale NotebookLM resource folders: `notebooklm-sources/`, `deliverables/notebooklm/`, and `wiki-output/`.
- Removed obsolete parent-level local artifact generation scripts that targeted the old local NotebookLM flow.
- Removed obsolete `scripts/r2-replace-assets.*`; the durable protection is now in `bun run verify:data` and `bun run verify:routes`.
- `bun run verify:data` passed with R2-only hosted asset checks.
- `bun run build` passed after clearing stale `.astro` cache.
- `bun run verify:routes` passed: 81 HTML files, 2,447 links checked, 0 broken links, 0 missing trailing slashes.

Date: 2026-05-31
Scope: Review brand docs, copy, current assets, and implement a stronger landing page version for the Astro wiki.

## Read-Only Review

- [x] Confirmed active editable project root is `wiki-site/`, not the parent vault root.
- [x] Read `AGENTS.md` and `DESIGN.md`.
- [x] Reviewed landing implementation in `src/components/PortalHome.astro`.
- [x] Reviewed primary copy/data sources:
  - `src/data/site-data.json`
  - `src/data/artifacts.json`
  - `src/content/docs/product/overview.md`
  - `src/content/docs/brand/voice-tone.md`
  - `src/content/docs/brand/visual-guidelines.md`
  - `src/content/docs/brand/visual-assets.md`
  - `src/content/docs/marketing/campaign-copy.md`
  - `src/content/docs/founder/vision.md`
- [x] Reviewed available local assets:
  - `notebooklm-sources/mobile-visuals/01-splash-screen.jpg` 368x800
  - `notebooklm-sources/mobile-visuals/02-logo.png` 1254x1254
  - `notebooklm-sources/mobile-visuals/03-mirror-flow.png` 1536x1024
  - `notebooklm-sources/mobile-visuals/04-mirror-interaction.png` 1608x978
  - `notebooklm-sources/mobile-visuals/05-splash-reference.png` 941x1672
  - `deliverables/notebooklm/artifacts/Klear-Karma-Brand-Strategy.png` 2752x1536
  - `deliverables/notebooklm/artifacts/Klear-Karma-Spiritual-Wellness.png` 2048x2048
  - `deliverables/notebooklm/artifacts/Reflection-Before-Transaction.png` 1536x2752
  - `wiki-site/public/logo.png` 400x400
  - `wiki-site/public/images/hero-bg.jpg` 1361x2004
  - `wiki-site/public/images/visual-1.jpg` 1024x1536
  - `wiki-site/public/images/visual-2.jpg` 969x1396
- [x] Rendered current `/en/` page on the local dev server.
- [x] Ran baseline verification:
  - `bun run build` passes.
  - `bun run verify:data` fails on existing artifact contract drift.
  - `bun run verify:routes` fails on existing smoke-test/link issues.

## Current Findings

- [x] The current landing copy is directionally usable: Mirror-first, consent-safe, tokenized intent, practitioner handoff, controlled beta.
- [x] The strongest landing-page product assets are `03-mirror-flow.png` and `04-mirror-interaction.png`; they show real app flow and are large enough for desktop sections.
- [x] The current hero asset is hardcoded remote `2C-mirror-logo-splash-reused-v1.png` and is narrow/mobile-first. It is weak as the primary desktop hero.
- [x] `site-data.json` has `heroImage: ""`, so hero media is not data-driven even though the design rules prefer sourced data/assets.
- [x] `src/content/docs/brand/visual-assets.md` contains broken image/download URLs with a control-character path and should not be treated as reliable source truth until repaired.
- [x] Current navigation labels `Artifacts` to founder vision instead of artifact content because `BaseLayout.astro` uses `siteData.heroSecondaryHref`.
- [x] `WebGLBackground.astro` creates ambient particle motion; this likely conflicts with `DESIGN.md` rules that motion serves state and ambient floating particles/gradients are forbidden.
- [x] Metrics are inconsistent across the repo: `site-data.json` says 42 artifact files and 60 wiki pages; `artifacts.json` has 27 artifacts; the built site has 81 HTML pages and 26 source docs.

## Landing V2 Direction

- [x] Keep the site as Astro/static. Do not port the pasted Prisma React/Vite/Framer concept directly.
- [x] Use the pasted Prisma brief only as a mood reference for cinematic structure and animation restraint.
- [x] Build the first screen around Klear Karma's own source truth:
  - Primary headline: reflection before marketplace/search.
  - Supporting idea: Mirror turns context into tokenized intent and consent-safe practitioner handoff.
  - Proof strip: 369 free tokens, roughly 108-token opening flow, verified practitioners, controlled Thailand to India beta.
- [x] Replace the current narrow hero treatment with a desktop-safe product composition using existing assets:
  - Primary: `03-mirror-flow.png` or `04-mirror-interaction.png`.
  - Supporting: `02-logo.png` as a brand mark, not as a full hero background.
  - Avoid text-heavy infographics behind readable text.
- [x] Make assets project-local before wiring them into the landing page:
  - Add a small curated set under `public/brand/` or `public/notebooklm/`.
  - Preserve original source files outside `wiki-site/`.
  - Use versioned names; do not overwrite existing public assets.
- [x] Keep backgrounds abstract only:
  - Prefer `PixelMediaLayer.astro` or CSS gradients/noise.
  - Remove or disable `WebGLBackground.astro` on the landing page unless there is a stateful reason for it.
- [x] Restructure the page as a concise landing experience:
  - Hero: product claim, beta/proof strip, primary CTA, product visual.
  - Problem: category-first directories fail trust.
  - Mechanism: Mirror asks, summarizes, confirms, maps, then hands off with consent.
  - Audience paths: seeker, practitioner, partner, builder.
  - Artifact proof: current reports/decks/infographics/audio from `artifacts.json`.
  - Final CTA: product overview and research artifacts.
- [x] Move hardcoded repeatable copy into `site-data.json` when it is stable enough to be data-driven.
- [x] Keep Thai route behavior intact; do not attempt full Thai translation in this pass.

## Asset Generation/Edit Decision

- [x] First pass should reuse and lightly curate existing assets; there is enough usable material for V2.
- [x] Generate or edit new bitmap assets only if the reused product composition looks too infographic-like after rendering.
- [x] If generation is needed, generate one desktop hero/product composition:
  - Use case: ads-marketing or product-mockup.
  - Subject: dark mirrored app-native trust field with mobile Mirror UI panels, lotus geometry, quiet gold token nodes, no faces, no readable UI text unless supplied.
  - Constraints: no stock healer portraits, no mystical overclaims, no emoji, no text-heavy infographic, no busy image behind readable copy.
- [x] If generated for the project, save the final asset inside `wiki-site/public/brand/` and wire it from that path.
  - Not needed in this pass; reused assets rendered strongly enough.

## Implementation Checklist

- [x] Create curated public asset folder and copy chosen existing assets into it.
- [x] Update `site-data.json` for hero media, proof anchors, and landing sections where appropriate.
- [x] Refactor `PortalHome.astro` to the V2 section structure.
- [x] Update `immersive.css` to support the new hero, responsive product visual, section rhythm, and stable mobile layout.
- [x] Fix the `Artifacts` nav target in `BaseLayout.astro`.
- [x] Decide whether to remove landing use of `WebGLBackground.astro` or replace it with `PixelMediaLayer.astro`.
- [x] Repair `visual-assets.md` broken URLs or remove broken image references from that page.
- [x] Reconcile or scope the data validator failure:
  - Either update `scripts/verify-site-data.mjs` for the 27-artifact R2 contract.
  - Or document that artifact contract repair is out of scope for landing V2.
- [x] Reconcile or scope route smoke-test failures:
  - Fix `${h.href}` broken-link output if it is caused by rendered literal template text.
  - Update route assertions if they target stale hero/artifact strings.

## Verification Checklist

- [x] `bun run build`
- [x] `bun run verify:data`
- [x] `bun run verify:routes`
- [x] Render `/en/` locally and inspect desktop.
- [ ] Inspect responsive widths: 320px, 768px, 1024px, 1440px.
- [ ] Keyboard tab through nav, CTAs, search, path cards, artifact cards.
- [x] Confirm no emoji in rendered UI.
- [x] Confirm no text-bearing image sits behind readable text.
- [x] Confirm artifacts and CTAs resolve to the intended routes or external files.

## Review Checkpoint

- [x] Plan approved by user before implementation.
- [x] If CodeGraph is desired, ask before running `codegraph init -i` because this project is not currently initialized.
- [x] After implementation, add a results section here with final changes, validation outputs, visual check notes, and any scoped residual failures.

## Results

Date: 2026-06-01

- Built a new Klear Karma landing page from the reviewed brand/copy/assets, using local curated product and brand visuals under `public/brand/`.
- Rewired the home page, top nav, footer/search data, docs index, legacy docs redirects, and NotebookLM report links so internal routes resolve under locale-aware trailing-slash URLs.
- Centralized Astro `trailingSlash: "always"` behavior in `localizedPath()` and `switchLocalePath()`.
- Tightened `scripts/smoke-routes.mjs` so extensionless internal links without trailing slash now fail verification.
- Rebuilt after clearing stale `.astro` cache; build completed cleanly with 81 generated pages.
- `bun run verify:data` passed.
- `bun run verify:routes` passed: 2,586 links checked, 0 broken, 0 missing trailing slashes.
- Browser check: `/en/` renders, home-page CTAs point to `/en/docs/.../`, and `/en/docs/product/overview/`, `/en/docs/research/notebooklm-artifacts/`, and `/th/docs/product/overview/` return 200.
- Residual manual checks not completed in this pass: full 320/768/1024/1440 responsive sweep and keyboard tab pass.

## Footer Overlap Fix

Date: 2026-06-01

- [x] Reproduce the reported footer/sidebar collision on a document page.
- [x] Inspect the page shell grid, sticky sidebar, document content, and footer placement.
- [x] Patch the shell/footer grid so the footer starts below the sidebar/content row.
- [x] Hide the footer by default on inside/sidebar pages so sticky document navigation cannot overlap it.
- [x] Verify the reported document route in the browser.
- [x] Run `bun run build` and `bun run verify:routes`.

## Docs Typography And Bento Index

Date: 2026-06-01

- [x] Reproduce the docs index and proof-points typography/color failures from screenshots.
- [x] Identify shared cause: generic Markdown rendering leaves links/quotes/lists too close to browser defaults on dark panels.
- [x] Harden shared document typography, list, link, quote, and table colors for dark brand panels.
- [x] Replace `/en/docs/index/` and `/th/docs/index/` with a custom bento documentation hub.
- [x] Keep dynamic doc routing for normal source documents without route conflicts.
- [x] Verify build, smoke routes, and rendered docs index/proof-points pages.

### Results

- Fixed the global `.portal-prose blockquote` component so Markdown quote cards use a dark brand surface, quiet-gold left rail, and readable text across document pages.
- Hardened document prose typography in `DocLayout.astro`: stronger headings, readable list text, better links, and dark-safe emphasis.
- Replaced the locale docs index with a custom bento route at `/en/docs/index/` and `/th/docs/index/`.
- Dynamic document routing now skips `index` so the custom bento route owns the docs landing page.
- `bun run build` passed.
- `bun run verify:routes` passed: 2,447 links checked, 0 broken, 0 missing trailing slashes.
- Browser computed-style check on `/en/docs/founder/proof-points/` confirmed the blockquote background is dark, border rail is `rgb(216, 179, 90)`, text is `rgb(221, 211, 235)`, and no inside-page footer is rendered.

## Sidebar Search Placement

Date: 2026-06-01

- [x] Identify that `SiteSearch` was rendering inside the main content flow above document panels.
- [x] Move `SiteSearch` into the left navigation/sidebar panel on inside pages.
- [x] Add sidebar-specific search spacing and input/result styling.
- [x] Run build and route verification.
- [x] Browser verify `/en/docs/index/`: sidebar search exists, main-content search is absent, and the input is constrained to the sidebar width.

### Results

- `bun run build` passed.
- `bun run verify:routes` passed: 2,447 links checked, 0 broken, 0 missing trailing slashes.
- Browser computed layout confirmed `.immersive-sidebar .site-search` is present at 262.8px wide, `.immersive-content .site-search` is absent, and the search input is styled as a 16px-radius sidebar control.
