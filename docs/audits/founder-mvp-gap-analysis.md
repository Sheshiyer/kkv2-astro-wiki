# Klear Karma Wiki — Founder/Partner MVP Gap Analysis

**Date:** 2025-05-31
**Scope:** What must exist for a founder or partner to trust, navigate, and rely on this wiki as the single source of truth.
**Assumption:** The reader is a founder, advisor, or partner evaluating Klear Karma — not an end-user seeking wellness content.

---

## Executive Summary

The wiki is 70% structurally complete but 40% founder-ready. The ingestion pipeline works, artifacts exist, and the design system is documented — but **the narrative explaining why Klear Karma matters, who it's for, and how the system works is buried under generic wiki skin conventions**.

**Verdict: Safe for internal review. Not safe for external founder/partner presentation without these 9 gaps closed.**

---

## Founder's First 3 Questions

A founder or partner landing on this wiki will ask, in order:

1. **"What is this company, and why does it exist?"**
2. **"Who is it for, and what does it do for them?"**
3. **"What is the business model, and why will it work?"**

The current wiki answers #2 partially, #3 weakly, and #1 not at all above the fold.

---

## Gap Inventory (Ranked by Founder Risk)

### CRITICAL (Ship-Blockers)

| # | Gap | Founder's Risk | Current State | MVP Fix |
|---|-----|---------------|-------------|---------|
| 1 | **No Founder/Investor Narrative Above the Fold** | "I don't know what this company does in 10 seconds" | Hero says "Turn Reflection Into Trusted Support" — a tagline, not a company story. No mission, vision, or "why now" | Homepage hero must answer: What market problem, what solution, what makes it work. Replace tagline with 2-sentence narrative |
| 2 | **Business Model Invisible** | "How does this make money?" | No mention of tokens, practitioner fees, premium tiers, or revenue mechanics | Add `/docs/business/` collection with business model, go-to-market, unit economics |
| 3 | **Founder Identity Missing** | "Who is behind this?" | No team page, founder bio, or vision statement | Founder letter + team section — even if solo, the human behind the product builds trust |
| 4 | **Partner/Support Flow Undefined** | "How do I engage?" | No explicit "For Founders" / "For Partners" / "For Practitioners" paths | Add 3 entry cards on homepage: Seeker, Partner, Practitioner |
| 5 | **Artifact Story Arc Absent** | "So you generated 23 files... why should I care?" | Artifacts page lists files but doesn't explain the narrative arc from raw sources → insights → publishable outputs | `/docs/research/notebooklm-artifacts/` needs a 2-paragraph story: what we learned, why it matters, what we did with it |

### HIGH (Trust Erosion)

| # | Gap | Founder's Risk | Current State | MVP Fix |
|---|-----|---------------|-------------|---------|
| 6 | **No Competitive Moat Articulation** | "What stops someone from copying this?" | Competitive landscape doc exists but is weak on defensibility | Add "Why This Is Defensible" section: data moat, practitioner network effects, token economics |
| 7 | **Design Says 'Template', Not 'Premium Product'** | "This looks like a generated starter kit" | DESIGN.md is strong but implementation still shows generic card grids, emoji placeholders, and AI-generated visual habits | Hard-replace 3 generic patterns: (1) no 3-col feature grid as first impression, (2) no icons-in-colored-circles, (3) no uniform bubbly radius |
| 8 | **Thai Translation is a Mirage** | "Localization promises I can't keep" | Nav labels are Thai, content is English. `thDocs` has only a placeholder. This looks unprofessional if a Thai partner clicks it | Either (a) remove Thai routing until translated, or (b) add a "coming soon" banner on Thai pages |
| 9 | **No Evidence of Build Iteration** | "Did they ship once and stop?" | No changelog, no commits visible, no build date, no version number | Footer or `/docs/index` must show: last updated date, build count, next milestone |

### MEDIUM (Polish & Depth)

| # | Gap | Founder's Risk | Current State | MVP Fix |
|---|-----|---------------|-------------|---------|
| 10 | **Metrics are Vanity, Not Signal** | "23 artifacts means nothing without context" | Homepage metrics say "20 Brandmint outputs, 23 visual assets" — founder wants: seekers, practitioners, conversions, revenue | Add real signal metrics: pipeline stage, practitioners onboarded, seekers served |
| 11 | **Artifact Media Viewer is Brittle** | "What if the demo doesn't play?" | Artifact modal exists but needs browser testing across types (PDF, MP3, MP4, CSV, JSON) | Test all 5 media types. Add fallback download links. Test on mobile |
| 12 | **No Social Proof / Traction** | "Has anyone used this?" | No testimonials, case studies, pilot results, or partner logos | Add "Proof Points" section: even if early-stage, show pilot numbers, practitioner quotes, or advisor endorsements |
| 13 | **Search is Useless** | "Can I find the business model doc?" | Search bar exists but doesn't search content bodies — only artifact titles | Label search as "Find artifacts" or make it full-site search for MVP |

### LOW (Nice to Have)

| # | Gap | Founder's Risk | Current State | MVP Fix |
|---|-----|---------------|-------------|---------|
| 14 | **OG/share image is generic** | Social share looks bland | OG-IMAGE exists but is not automatically applied per-page | Ensure every doc page uses its own image or a fallback brand asset |
| 15 | **No offline/PDF export** | "Can I take this to my partner meeting?" | No print stylesheet or PDF export | Add `@media print` styles to DocLayout |
| 16 | **No dark/light toggle persistence** | Minor annoyance | Toggle exists but no localStorage persistence | Store preference in `localStorage` |
| 17 | **Missing homepage CTA to partner deck** | Founder wants the pitch | No direct link to investor briefing artifact on homepage | "Download Pitch Deck" CTA button |

---

## Content Matrix: What Exists vs. What Founders Need

### What Exists (Good)

| Content | File | Word Count | Quality |
|---------|------|-----------|---------|
| Product Overview | `src/content/docs/product/overview.md` | 1,313 | Production-ready |
| Campaign Copy | `src/content/docs/marketing/campaign-copy.md` | 1,542 | Strong |
| Personas | `src/content/docs/audience/primary-persona.md` + `secondary-personas.md` | 807 + 1,263 | Deep |
| Brand Intelligence Report | `src/content/docs/research/report-briefing.md` | 1,598 | Excellent |
| Study Guide | `src/content/docs/research/report-study-guide.md` | 1,334 | Comprehensive |
| Competitive Landscape | `src/content/docs/market/competitive-landscape.md` | 501 | Thin — needs moat analysis |
| NotebookLM Artifacts | `src/content/docs/research/notebooklm-artifacts.md` | 601 | List, not story |
| 23 Generated Artifacts | `public/notebooklm/` | — | Strong but unstructured |

### What's Missing (Critical)

| Content | Why It Matters for Founders | Priority |
|---------|---------------------------|----------|
| Founder Letter / Vision | Builds emotional trust, explains personal investment | CRITICAL |
| Business Model Canvas | Shows how money flows | CRITICAL |
| Go-to-Market Strategy | Shows market entry plan | CRITICAL |
| Traction / Pilot Results | Proves it works in the real world | CRITICAL |
| Team / Advisor Bios | Humanizes the project | CRITICAL |
| Financial Projections (even rough) | Shows ambition and realism | HIGH |
| Technical Architecture Diagram | Builds engineering confidence | HIGH |
| Content Strategy / Pipeline | Shows how the wiki generates value | MEDIUM |
| FAQ for Partners | Preempts common objections | MEDIUM |
| Press Kit / Media Assets | Enables partner promotion | LOW |

---

## Recommended MVP Content Additions

### 1. Founder Letter (New)

**File:** `src/content/docs/founder/vision.md`
**Length:** 600-800 words
**Purpose:** The human story behind Klear Karma. Why reflection before transaction is a personal mission, not a feature.

**Structure:**
1. The moment of insight (personal story)
2. The market gap (why directories fail seekers)
3. The thesis (what a trust layer looks like)
4. The pitch (what Klear Karma actually builds)
5. The invitation (to partners, practitioners, seekers)

### 2. Business Model (New)

**File:** `src/content/docs/founder/business-model.md`
**Length:** 800-1,000 words
**Purpose:** Show how the company makes money and why it's sustainable.

**Structure:**
1. Revenue streams (token fees, practitioner premium, marketplace commission)
2. Cost structure (hosting, verification, content generation)
3. Unit economics (lifetime value of seeker vs. cost of acquisition)
4. Growth levers (network effects, data moat, brand gravity)
5. Milestones (0-6 months, 6-12 months, 12-24 months)

### 3. Go-to-Market (New)

**File:** `src/content/docs/founder/go-to-market.md`
**Length:** 600-800 words
**Purpose:** Show the practical path from wiki to live product.

**Structure:**
1. Market entry (organic first, paid second)
2. Channel strategy (where seekers and practitioners live)
3. Content flywheel (how artifacts generate traffic)
4. Partnership tiers (what partners get at each level)
5. Launch phases (silent, beta, public)

### 4. Proof Points (New)

**File:** `src/content/docs/founder/proof-points.md`
**Length:** 400-600 words
**Purpose:** Even early-stage projects can show evidence of forward motion.

**Structure:**
1. Pipeline stats (what exists today)
2. Practitioner interest (inbound, waitlist)
3. Content reach (artifact views, engagement)
4. Advisor endorsements (even informal)
5. Build velocity (commits, iterations, iteration cycle time)

---

## Structural Fixes (No New Content)

### Homepage
- [ ] Replace "Wave 7 Output Summary" metrics with **pipeline metrics**
- [ ] Add 3-path entry: **For Seekers** / **For Practitioners** / **For Partners**
- [ ] "View Artifacts" CTA must go directly to **artifact story**, not file list
- [ ] Add "Download Pitch Deck" secondary CTA

### Navigation
- [ ] Add **"Founder"** or **"Vision"** section top-level
- [ ] Rename **"Portal"** to **"Home"** (founders expect clarity, not branding)
- [ ] Remove **"NotebookLM"** from nav — rename to **"Artifacts"** or **"Research"**

### Artifact Page
- [ ] Add 2-paragraph story at the top: what these 23 files represent
- [ ] Group artifacts by **narrative arc**, not just file type
- [ ] Add download-all button
- [ ] Test every media type on mobile

### Footer / Global
- [ ] Add last-updated timestamp
- [ ] Add version or build number
- [ ] Add direct contact (email or calendly)

---

## Verification: Is This Founder-Ready?

Use this checklist before sharing with any external founder, partner, or investor:

- [ ] Homepage hero answers "what, why, and for whom" in 2 sentences
- [ ] Business model is discoverable within 2 clicks
- [ ] Founder identity is clear (human, not anonymous)
- [ ] Competitive moat is articulated, not assumed
- [ ] Artifacts tell a story, not just a list
- [ ] No translation mirages (Thai pages are real or removed)
- [ ] Design feels premium, not generated
- [ ] All media types work (test PDF, MP3, MP4 on phone)
- [ ] Social proof exists (even advisory board or pilot numbers)
- [ ] Direct contact path exists (email, form, or calendar)

**Current Score: 3/10**
**Target Score: 8/10**

---

## Implementation Order

Phase 1 (This Session):
1. Write 4 MVP docs: Vision, Business Model, Go-to-Market, Proof Points
2. Update homepage with founder narrative + 3-path entry
3. Fix artifact page with story arc + media verification
4. Remove Thai routing until translated

Phase 2 (Next Session):
5. Add founder letter to nav + homepage
6. Replace metrics with pipeline signal
7. Add footer with contact + build info
8. Test all media types across devices

Phase 3 (Before External Share):
9. Design QA pass (no generic patterns)
10. Partner FAQ
11. Press kit / media asset pack
12. Final founder review

---

*Generated for Founder/Partner-First MVP decision.*
