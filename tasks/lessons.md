# Lessons

## 2026-06-01: Do Not Follow Archived Klear Karma Wiki Path

- When the user mentions `kkv2-wiki`, treat it as archived unless they explicitly ask to inspect archive history.
- The active landing-page implementation target for this task is `kkv2-wiki-v2/wiki-site`.
- If CodeGraph or terminal output points at an adjacent Klear Karma wiki checkout, verify archive/current status before using it as implementation context.
- Do not index, edit, or migrate from archived `kkv2-wiki` when the request is for the current Astro landing page.

## 2026-06-01: Respect Astro Trailing Slash Mode

- When `astro.config.mjs` sets `trailingSlash: "always"`, every generated internal route link must end with `/`.
- Keep this behavior centralized in route helpers such as `localizedPath()` and `switchLocalePath()` so home-page cards, navigation, locale links, and search results cannot drift.
- Route smoke checks should catch extensionless internal links that omit the final slash because the dev server returns Astro's trailing-slash 404 suggestion for them.

## 2026-06-01: Keep Footers Out of Sticky Sidebar Document Pages

- If a page shell uses a sticky left navigation rail, do not render a full-width footer on that same inside-page layout unless the sticky rail has an explicit scroll-stop boundary.
- Default the footer to full-width/main landing pages; let inside pages end at the document content instead of letting the sidebar float over footer content.
- When a first layout hardening pass still leaves a visual collision, switch to the simpler product rule rather than overfitting sticky-position math.

## 2026-06-01: Do Not Let Markdown Defaults Define Brand Pages

- High-traffic index pages should use explicit Astro layouts/components, not raw Markdown lists inside a generic prose renderer.
- Dark-mode prose must explicitly style links, list item text, blockquotes, tables, and inline emphasis; browser/default inherited colors are not acceptable on brand panels.
- If a screenshot shows unreadable links or pale quote cards, fix the shared prose system and convert key overview pages into branded bento surfaces.

## 2026-06-01: Search Belongs With Navigation, Not Document Content

- On inside documentation pages, render global search inside the sidebar/navigation rail instead of above the main document slot.
- Search should not interrupt the document hero or content panel; keep it visually grouped with discovery controls.
- Add layout-specific styling for reused controls when their placement changes, rather than relying on the component's generic max-width.

## 2026-06-01: Treat R2 As The NotebookLM Asset Source Of Truth

- Do not copy NotebookLM outputs into `public/brand/`, `public/images/`, or `public/notebooklm/` when the configured Cloudflare R2 bucket already hosts the active assets.
- Active landing and artifact data should reference `https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev` directly, so stale generated folders cannot be mistaken for source truth.
- When cleaning Klear Karma wiki assets, remove or clearly retire local NotebookLM source/output folders after verifying the Astro data and docs no longer depend on them.

## 2026-06-02: Separate MVP Build Cost From Launch Operating Costs

- Treat 450,000 THB as Shesh's share of the investment ask to make the partners equal; do not call it company valuation.
- Treat 150,000 THB as the current MVP development build cost for Shesh's Thoughtseed Labs team in India only, not as the all-in launch budget or monthly burn.
- Always list excluded costs explicitly: third-party services, signup/registration, analytics, hosting, payment/KYC providers, legal/compliance, operations, marketing, and maintenance.
- Team copy should say Shesh Narayan Iyer leads Thoughtseed Labs India with 2 frontend developers, 1 backend developer, and 1 tester unless the user gives a newer staffing model.
