---
title: NotebookLM Artifacts
description: Research hub for NotebookLM-generated reports, decks, audio, infographics,
  tables, and structured study outputs.
category: general
tags:
- research
- notebooklm
- artifacts
sources:
- https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev/artifacts/
lastUpdated: '2026-06-01'
order: 1
icon: ""
---

# NotebookLM Artifacts

NotebookLM outputs are treated as first-class publish artifacts in this build. The rendered artifact browser is powered by `src/data/artifacts.json`; all downloadable media points to the configured Cloudflare R2 bucket.

## Source Of Truth

- **Hosted bucket:** `https://pub-dba2c40f6183450a9bfc05eeb62b7837.r2.dev/artifacts/`
- **Site inventory:** `src/data/artifacts.json`
- **Rendered hub:** [/en/docs/research/notebooklm-artifacts/](/en/docs/research/notebooklm-artifacts/)

## Coverage

- **Reports:** 3
- **Slide decks:** 4
- **Audio:** 4
- **Video:** 2
- **Infographics:** 6
- **Tables:** 3
- **Flashcards:** 2
- **Quizzes:** 2
- **Mind maps:** 1

## Cleanup Rule

Do not wire new pages to local `/notebooklm/`, `/brand/`, or generated `deliverables/notebooklm/` files. If an artifact is active, add it to the hosted bucket and reference it through `src/data/artifacts.json` or `src/data/site-data.json`.
