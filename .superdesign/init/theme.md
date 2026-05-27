# Superdesign Init — Theme

**Project:** Klear Karma Astro Wiki
**Date:** 2026-05-27
**Theme Name:** Reflective Trust Field

## Color System

### Surface
- `--color-bg-primary: #090711` — Deepest background
- `--color-bg-secondary: #12101a` — Cards, elevated surfaces
- `--color-bg-tertiary: #1a1725` — Code blocks, subtle elevation
- `--color-bg-input: #0d0b14` — Form fields

### Text
- `--color-text-primary: #f0ebe3` — Headings
- `--color-text-secondary: #b8b0a4` — Body
- `--color-text-tertiary: #7a756d` — Captions
- `--color-text-muted: #4a4640` — Disabled

### Accent
- `--color-accent: #D8B35A` — Quiet Gold (CTAs, highlights)
- `--color-accent-hover: #e8c46e`
- `--color-accent-subtle: rgba(216, 179, 90, 0.15)`

### Signal
- `--color-signal: #8B5CF6` — Signal Lotus (progress, active)
- `--color-signal-subtle: rgba(139, 92, 246, 0.15)`

## Typography

- **Display:** Sora (400, 600, 700)
- **Body:** Inter (400, 500, 600)
- **Mono:** JetBrains Mono (400, 500)

## Spacing

Base: 0.25rem (4px)
Scale: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32

## Motion

- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Duration: 200ms
- Stagger: 50ms
- Reduced motion: respect `prefers-reduced-motion`

## Background Treatment

- CSS gradient mesh (no images)
- Subtle noise texture overlay
- No photos, no infographics, no screenshots
- Never compete with text

## Component Theme

- Cards: `--color-bg-secondary`, 4px radius, subtle shadow
- Buttons: `--color-accent`, white text, hover lightens
- Badges: `--color-accent-subtle`, `--color-accent` text
- Borders: 1px solid `--color-text-muted` at 20% opacity
