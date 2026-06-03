---
title: Technical Architecture
description: How the Klear Karma wiki and product are built — stack, pipeline, and design decisions.
category: tech
tags:
  - tech
  - architecture
  - stack
  - pipeline
  - infrastructure
sources:
  - tech-spec.json
  - build-config.json
lastUpdated: '2026-05-31'
order: 1
icon: ''
---

# Technical Architecture

## Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **Framework** | Astro 5 | Static site generation, content collections |
| **Language** | TypeScript | Type-safe components and data |
| **Styling** | CSS custom properties + scoped Astro styles | No runtime CSS framework |
| **Animations** | GSAP + ScrollTrigger | Scroll-driven reveals, entrance animations |
| **3D Background** | Three.js | WebGL particle field (optional, respects reduced motion) |
| **Build Tool** | Vite (via Astro) | Bundling, dev server, HMR |
| **Package Manager** | Bun | Fast installs, lockfile |
| **Hosting** | Vercel | Edge-cached static deploy |
| **Media Storage** | Cloudflare R2 | 41 asset files served globally |
| **Content Pipeline** | Brandmint + NotebookLM | Source → research → artifacts |

## Content Architecture

### Data Flow

```
Sources (interviews, research, specs)
  ↓
Brandmint (narrative extraction, theme mapping)
  ↓
NotebookLM (report generation, infographics, audio)
  ↓
Astro Content Collections (Markdown + YAML frontmatter)
  ↓
Static HTML (built at deploy time)
  ↓
Vercel Edge (global CDN)
```

### File Organization

- **`src/content/docs/`** — Markdown documents with YAML frontmatter
- **`src/data/`** — JSON data contracts (site metadata, artifact inventory)
- **`public/`** — Static assets that must ship with the Astro build, currently limited to the local logo and crawler files
- **Cloudflare R2 bucket** — Heavy brand media and NotebookLM artifacts linked from `site-data.json` and `artifacts.json`

## Build Pipeline

### Local Development
```bash
bun install          # ~2s
bun run dev          # Vite dev server, HMR
```

### Production Build
```bash
bun run build        # Astro static generation
# Output: dist/ (~2.3MB HTML/CSS/JS, no heavy assets)
```

### Deploy
```bash
vercel deploy --prod --scope sheshiyers-projects
# Uploads 2.3MB dist/ to edge nodes
```

## Performance Characteristics

| Metric | Value |
|--------|-------|
| **Build time** | 1.5s |
| **Deploy size** | 2.3MB (HTML/CSS/JS only) |
| **Asset delivery** | Cloudflare R2 (Anycast) |
| **Time to First Byte** | < 100ms (Vercel edge) |
| **Lighthouse** | Expected 95+ (no runtime JS framework) |

## Design System Implementation

### Colors (CSS Custom Properties)
```css
:root {
  --mirror-black: #090711;
  --karma-violet: #221245;
  --quiet-gold: #D8B35A;
  --moon-glass: #D9D2C6;
  --signal-lotus: #8B5CF6;
}
```

### Typography
- **Headers:** Sora (SemiBold, Bold)
- **Body:** Inter (Regular, Medium, SemiBold)
- **Data:** JetBrains Mono (Regular, Medium)

### Motion
- **Scroll reveals:** GSAP ScrollTrigger with IntersectionObserver fallback
- **Reduced motion:** All animations gated behind `prefers-reduced-motion`
- **Hero counter:** IntersectionObserver-triggered count-up

## Security

- **Static site:** No server runtime, no database
- **No cookies:** No tracking, no consent banners needed
- **CSP-ready:** Astro scopes all CSS/JS; inline styles are component-local
- **R2 access:** Public read-only bucket, no write API exposed

## Scalability

### Current
- 81 generated pages with hosted R2 media
- Founder-led MVP implementation team
- 450,000 THB Shesh investment ask share for equal partnership
- 150,000 THB current MVP development build cost for Shesh's Thoughtseed Labs team in India
- External hosting, analytics, signup/registration, payment/KYC, and service-provider costs budgeted separately

### Build Team
- **Lead:** Shesh Narayan Iyer / Thoughtseed Labs India
- **Frontend:** 2 developers
- **Backend:** 1 developer
- **QA/testing:** 1 tester

### Next Phase
- Add practitioner verification API (likely Cloudflare Workers)
- Add seeker Mirror flow (React/Vue SPA embedded in Astro)
- Token system (Stripe or native crypto on Solana)

## Build History

| Date | Change | Size |
|------|--------|------|
| May 27 | Initial wiki build | 41MB (with local assets) |
| May 31 | R2 asset offload | 2.3MB (HTML only) |
| Jun 2 | Founder docs, R2 cleanup, and build-scope updates | 81 generated pages |
