# Klear Karma Astro Wiki — Design System

**Version:** 1.0.0
**Date:** 2026-05-27
**Product Type:** Immersive knowledge/research portal
**Design Authority:** This document is the source of truth for all visual decisions in the standalone Astro wiki.

## Product Identity

Klear Karma is a trust-first platform for spiritual wellness seekers. This wiki is its research and ingestion portal — a window into how source documents become structured brand intelligence, visual assets, and published artifacts through the Brandmint pipeline.

The design must communicate:
- **Trust** (dark, stable, editorial)
- **Process** (source → pipeline → artifact)
- **Clarity** (content-first, no decoration without function)
- **Premium** (not flashy; restrained and intentional)

## Design Principles

1. **Content is the interface.** No decorative frames, no ornamental borders. The artifacts, documents, and data are the design.
2. **Dark by default, never gloomy.** Deep backgrounds create focus; careful use of accent color prevents heaviness.
3. **Motion serves state.** Transitions clarify navigation and hierarchy. Ambient motion is forbidden.
4. **Typography does the work.** Strong hierarchy replaces visual noise.
5. **Artifacts are primary.** Generated content (reports, decks, audio, data) must be immediately browsable, never buried.
6. **No emoji as UI.** Use SVG icons, text labels, or nothing. Emoji break accessibility and look unprofessional.
7. **Backgrounds support, never compete.** Abstract textures only. No screenshots, no infographics, no photos behind text.

## Color Tokens

```css
:root {
  /* Surface */
  --color-bg-primary: #090711;     /* Mirror Black — page background */
  --color-bg-secondary: #12101a;   /* Elevated surfaces, cards */
  --color-bg-tertiary: #1a1725;    /* Subtle elevation, code blocks */
  --color-bg-input: #0d0b14;       /* Form fields */

  /* Text */
  --color-text-primary: #f0ebe3;   /* Moon Glass light — headings */
  --color-text-secondary: #b8b0a4; /* Body text */
  --color-text-tertiary: #7a756d;  /* Captions, metadata */
  --color-text-muted: #4a4640;     /* Disabled, borders */

  /* Accent */
  --color-accent: #D8B35A;         /* Quiet Gold — CTAs, highlights */
  --color-accent-hover: #e8c46e;   /* Lightened for interaction */
  --color-accent-subtle: rgba(216, 179, 90, 0.15); /* Background tint */

  /* Signal */
  --color-signal: #8B5CF6;         /* Signal Lotus — progress, active */
  --color-signal-subtle: rgba(139, 92, 246, 0.15);

  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

## Typography Scale

**Fonts:**
- **Display/Headings:** Sora (Regular 400, SemiBold 600, Bold 700)
- **Body:** Inter (Regular 400, Medium 500, SemiBold 600)
- **Data/Mono:** JetBrains Mono (Regular 400, Medium 500)

**Scale (1rem = 16px):**

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-hero` | clamp(2.5rem, 6vw, 4.5rem) | 1.1 | 600 | Homepage hero title |
| `--text-h1` | clamp(2rem, 4vw, 3rem) | 1.15 | 600 | Page titles |
| `--text-h2` | clamp(1.5rem, 3vw, 2.25rem) | 1.2 | 600 | Section headings |
| `--text-h3` | 1.25rem | 1.3 | 600 | Card titles, subsections |
| `--text-h4` | 1.125rem | 1.4 | 600 | Labels, small headings |
| `--text-body` | 1rem | 1.6 | 400 | Body copy |
| `--text-body-lg` | 1.125rem | 1.6 | 400 | Lead paragraphs |
| `--text-small` | 0.875rem | 1.5 | 400 | Captions, metadata |
| `--text-xs` | 0.75rem | 1.4 | 400 | Badges, timestamps |
| `--text-mono` | 0.875rem | 1.5 | 400 | Data, file names |

## Spacing System

Base unit: `0.25rem` (4px)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem | Tight gaps |
| `--space-2` | 0.5rem | Inline spacing |
| `--space-3` | 0.75rem | Small padding |
| `--space-4` | 1rem | Base unit |
| `--space-6` | 1.5rem | Card padding |
| `--space-8` | 2rem | Section gaps |
| `--space-12` | 3rem | Large sections |
| `--space-16` | 4rem | Page sections |
| `--space-24` | 6rem | Major sections |
| `--space-32` | 8rem | Hero padding |

## Component Architecture

### Layouts

**BaseLayout.astro**
- Global navigation (sticky, compact)
- Footer with pipeline status
- Background layer (abstract only)
- View transitions wrapper

**DocLayout.astro**
- Two modes: `standard` and `artifact-browser`
- Standard: compact title + prose
- Artifact-browser: compact title + artifact grid + prose
- Never full-viewport hero

**ArtifactLayout.astro** (new)
- Full-width artifact browser
- Filter by type (reports, decks, audio, video, data)
- Search by title/description

### Components

**PortalHome.astro**
- Hero: title + tagline + ingestion flow summary
- Metrics strip: real counts from data
- Featured artifacts: top 6 by relevance
- Ingestion flow visualization
- Recent documents

**ArtifactBrowser.astro**
- Grid of artifact cards
- Type filter tabs
- Search input
- Sort by date/relevance

**ArtifactCard.astro**
- Thumbnail or file-type icon (SVG)
- Title
- Type badge
- Description (1 line)
- Download/open action
- Never use emoji

**DocCard.astro**
- Title
- Description (2 lines)
- Eyebrow label
- Arrow link
- No emoji

**Navigation.astro**
- Logo/brand mark (text or SVG)
- Links: Home, Artifacts, Docs
- Locale switcher (if multilingual)
- Mobile: hamburger → full-screen menu

**IngestionFlow.astro** (new)
- 5-step horizontal process
- Step 1: Source documents (count)
- Step 2: Brandmint waves (count)
- Step 3: NotebookLM sources (count)
- Step 4: Generated artifacts (count)
- Step 5: Published wiki (timestamp)
- Each step is a card with real data

**PixelMediaLayer.astro**
- Abstract gradient mesh only
- No images, no infographics, no photos
- Subtle animation (CSS only, no JS)
- z-index: -1, pointer-events: none

## Motion & Interaction

### Principles
- Motion reveals, never decorates.
- Default easing: `cubic-bezier(0.4, 0, 0.2, 1)` (200ms)
- Enter animations: fade + slight translateY (16px → 0)
- Stagger: 50ms between siblings
- Respect `prefers-reduced-motion`

### Patterns
- **Page transitions:** Astro View Transitions for route changes
- **Card hover:** subtle lift (`translateY(-2px)`) + shadow increase
- **Button hover:** background lightens, no scale
- **Focus:** 2px solid outline in accent color, offset 2px
- **Loading:** skeleton placeholders, never spinners on static content

## Media Usage Rules

### Backgrounds
- **Allowed:** CSS gradients, subtle noise texture, abstract mesh
- **Forbidden:** Photos, screenshots, infographics, logos, text-bearing images
- **Opacity:** Background media must be ≤15% opacity or heavily desaturated

### Thumbnails
- **Allowed:** Artifact previews (PNG infographics, video poster frames)
- **Aspect ratio:** 16:9 or 4:3
- **Treatment:** Slight border-radius (4px), subtle shadow

### Inline Images
- **Allowed:** Diagrams, charts, screenshots within documents
- **Max width:** 100% of container
- **Caption:** Always include alt text and optional caption

## Responsive Strategy

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | < 640px | Single column, hamburger nav, stacked cards |
| Tablet | 640-1024px | 2-column grids, visible nav |
| Desktop | 1024-1440px | 3-column grids, full nav |
| Wide | > 1440px | Max-width container (1440px), centered |

### Typography Scaling
- Hero: 2.5rem → 4.5rem
- H1: 2rem → 3rem
- Body: fixed 1rem

## Anti-Patterns (Forbidden)

1. **Emoji as UI icons** → Use SVG or text labels
2. **Decorative card grids as first impression** → Lead with content and process
3. **Media behind readable text** → Backgrounds must be abstract only
4. **Broken artifact links** → Verify every link resolves before shipping
5. **Empty hero image fallback** → Design for no image; don't show broken image icons
6. **Full-viewport hero on content pages** → Keep content above the fold
7. **Ambient floating particles/gradients** → Motion must have purpose
8. **Generic Lorem Ipsum** → All copy must be real data
9. **Fake metrics** → All numbers must come from `site-data.json` or `artifacts.json`
10. **Decorative borders and dividers** → Use whitespace for separation

## Accessibility Requirements

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus indicators visible on all interactive elements
- Touch targets minimum 44×44px
- Keyboard navigable (Tab order logical)
- Screen reader labels for icon-only buttons
- Alt text for all images
- `prefers-reduced-motion` respected

## File Organization

```
src/
  components/
    PortalHome.astro
    ArtifactBrowser.astro
    ArtifactCard.astro
    ArtifactDetail.astro
    DocCard.astro
    Navigation.astro
    IngestionFlow.astro
    EmptyState.astro
    PageTransitionController.astro
    PixelMediaLayer.astro
  layouts/
    BaseLayout.astro
    DocLayout.astro
    ArtifactLayout.astro
  styles/
    immersive.css          # Global styles, CSS variables
    components.css         # Component-specific utilities
  data/
    site-data.json         # Brand/site metadata
    artifacts.json         # NotebookLM artifact inventory
  i18n/
    fr-docs.ts             # French translations (if present)
  pages/
    [locale]/
      index.astro          # Home
      docs/
        [...slug].astro    # Standard docs
        artifacts.astro    # Artifact browser
      notebooklm.astro     # NotebookLM summary
```

## Verification

Before shipping, confirm:
- [ ] `DESIGN.md` is referenced in `AGENTS.md`
- [ ] No emoji in component markup
- [ ] All artifact links resolve
- [ ] Background contains no photos/infographics
- [ ] Home page explains the ingestion system
- [ ] Artifact browser shows all 23 artifacts
- [ ] Build passes without errors
- [ ] Responsive at all breakpoints
- [ ] Keyboard navigable
- [ ] `bun run verify:data` passes
