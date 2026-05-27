# Superdesign Init — Layouts

**Project:** Klear Karma Astro Wiki
**Date:** 2026-05-27

## Layout System

### BaseLayout.astro
- **Purpose:** Global wrapper for all pages
- **Structure:**
  ```
  html
    head (meta, fonts, CSS)
    body
      PixelMediaLayer (background, z-index: -1)
      Navigation (sticky)
      main (slot)
      Footer
  ```
- **Props:** `title`, `description`, `class`
- **Features:** View Transitions, dark mode, reduced motion support

### DocLayout.astro
- **Purpose:** Standard documentation page
- **Modes:**
  - `standard`: Compact title + prose content
  - `artifact-browser`: Compact title + artifact grid + prose
- **Structure:**
  ```
  article.doc-layout
    header.doc-header (compact, not full-viewport)
      h1
      subtitle
      metadata
    .doc-content
      slot
  ```
- **Constraints:**
  - Header max-height: 40vh
  - Content starts immediately after header
  - No full-bleed hero images

### ArtifactLayout.astro
- **Purpose:** Full-width artifact browser
- **Structure:**
  ```
  .artifact-layout
    header (title + search + filters)
    .artifact-grid
      ArtifactCard[]
  ```
- **Features:**
  - Type filter tabs
  - Search input
  - Sort dropdown
  - Responsive grid

## Layout Tokens

- `--layout-max-width: 1440px`
- `--layout-padding-x: clamp(1rem, 5vw, 3rem)`
- `--layout-content-width: 72ch` (prose)
- `--layout-section-gap: var(--space-24)`

## Responsive Behavior

| Breakpoint | Nav | Grid | Content Width |
|------------|-----|------|---------------|
| Mobile | Hamburger | 1 col | 100% |
| Tablet | Visible | 2 col | 100% |
| Desktop | Visible | 3 col | 1440px max |
| Wide | Visible | 4 col | 1440px max |
