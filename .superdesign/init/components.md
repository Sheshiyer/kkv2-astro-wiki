# Superdesign Init — Components

**Project:** Klear Karma Astro Wiki
**Date:** 2026-05-27

## Component Inventory

### Layout Components
- `BaseLayout.astro` — Global wrapper with nav, footer, background
- `DocLayout.astro` — Standard doc page (compact title + prose)
- `ArtifactLayout.astro` — Full-width artifact browser

### Navigation
- `Navigation.astro` — Sticky top nav, mobile hamburger
- `PageTransitionController.astro` — Astro View Transitions wrapper

### Home Page
- `PortalHome.astro` — Hero, metrics, featured artifacts, ingestion flow
- `IngestionFlow.astro` — 5-step pipeline visualization
- `ShowcaseGrid.astro` — Grid wrapper for cards

### Artifacts
- `ArtifactBrowser.astro` — Filterable/searchable artifact grid
- `ArtifactCard.astro` — Individual artifact card with preview
- `ArtifactDetail.astro` — Expanded artifact view
- `ArtifactGroup.astro` — Grouped by type
- `ArtifactPreview.astro` — Media preview (image/audio/video)

### Documents
- `DocCard.astro` — Document preview card
- `DocLayout.astro` — Document page layout

### Shared
- `PixelMediaLayer.astro` — Abstract background layer
- `EmptyState.astro` — Empty/missing data state

## Component Design Rules

1. All components accept `class` prop for customization
2. No hard-coded colors — use CSS custom properties
3. No emoji — use SVG icons or text labels
4. All interactive elements have focus states
5. All images have alt text
6. Components are Astro files (`.astro`), not React
