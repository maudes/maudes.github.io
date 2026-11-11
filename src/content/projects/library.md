---
title: "Maude's Library"
group: "Built Solo"
subgroup: "Shipped Tools"
order: 6.5
description: "A personal reading log that turns a Notion database into a self-updating static site, and my first project built end to end with AI."
cover: library_taste.webp
thumb: library_cover.webp
tags: [personal_knowledge, passive_social, ai_native_build, notion_api, static_site, github_actions, figma_mcp]
glance:
  - ["Role", "Sole PM, designer & AI-assisted builder"]
  - ["Period", "Oct 2026 – Present"]
  - ["Stack", "Python, Jinja2, Notion API, GitHub Actions"]
  - ["Status", "Live, auto-updates monthly"]
lead: "A public library card for one reader. It collects every book I have read, my ratings, my taste, reading notes and drawings in one place, keeps Notion as the single source of truth, and rebuilds itself every month."
why:
  title: "Why a library?"
  body:
    - "I have wanted a personal library for years: somewhere to see what I have read and what my taste looks like, the way an old library card shows every book its owner borrowed."
    - "The longer-term idea is passive social. No feeds, likes or push notifications. People who are curious can flip through my card, and I can flip through theirs. Version 1 starts with my own records."
callout:
  title: "Scope"
  items:
    - "v1: one place for reading records, taste, reading notes and doodles. No accounts and no social features yet."
    - "My first project built fully with AI: I designed it and set the rules, and Claude wrote the code and tests."
    - "Next: shareable library cards, the start of the passive social layer."
stack:
  - ["Design", "Figma, handed to Claude through Figma MCP as a design guideline"]
  - ["Build", "Python site generator, Jinja2 templates, light browser JS"]
  - ["Data", "Notion API (books), YAML and Markdown (genres, to-read list, posts)"]
  - ["Enrichment", "Google Books and Open Library (covers and ISBNs, cached in the repo)"]
  - ["Quality", "pytest and a PII/secret scan, run in a pre-push hook and in CI"]
  - ["Deploy", "GitHub Actions to GitHub Pages; Google Analytics on the live site"]
challenges:
  - ["Keeping AI-written code safe in a public repo", "Three guardrails: CLAUDE.md rules for every chat, a pre-push hook and CI that both run the PII scan and pytest. If any of them fails, nothing gets published."]
  - ["Unreliable cover lookups", "Google Books first, Open Library as a fallback. Results are committed back to the repo as a cache, so each book is looked up once."]
  - ["Many content types, one pipeline", "Library, Taste, Blog and Doodles pages come from Notion, YAML, Markdown and image folders, all rendered by the same Python build."]
  - ["Consistent visuals from AI output", "The Figma design became CSS variables defined in one place, so pages stay consistent and visitors can switch between colour palettes."]
decisions:
  - ["Why a static site?", "Flexibility and low maintenance. Four content types in one custom pipeline, which a CMS template would not allow. There is no server or database to run, and hosting on GitHub Pages is free. AI made writing it myself cheap enough to give up the convenience of a platform."]
  - ["Why fetch at build time?", "A reading log does not need real-time data. Fetching from Notion at build time keeps pages fast and keeps the Notion token and the Google Books key in GitHub Secrets, never in the browser, so there is no key to protect on the front end. The trade-off is freshness, covered by a monthly scheduled rebuild plus a rebuild on every push."]
  - ["Why stay on Notion instead of Google Sheets?", "I considered moving to Sheets but kept Notion. The database structure has worked for years, migrating it carries real cost, and logging happens mostly on my phone, where Notion is easier to use. Input experience mattered more than a tidier back end."]
  - ["Why Figma for design only?", "Figma defines the look; Claude writes the code that follows it. No code is generated from Figma, which keeps the code readable and lets one set of CSS variables carry the design."]
phases:
  - ["Initiation", ["Revived a long-held idea: a personal library card", "Scoped v1 to my own records, social later"]]
  - ["Planning", ["Kept Notion as the source of truth after weighing Google Sheets", "Chose a static site with build-time fetch"]]
  - ["Design", ["Set the look in Figma", "Released it to Claude as a design guideline through Figma MCP"]]
  - ["Development & Testing", ["Built page by page: Library, Taste, Blog, Doodles", "Added pytest, a PII scan and a pre-push hook"]]
  - ["Release & Iteration", ["Monthly auto-rebuild with GitHub Actions", "Google Analytics on the live site only"]]
structure: |
  library/
  ├── build.py              # entry point: runs the whole pipeline
  ├── config.py             # Notion columns, genres, palettes
  ├── src/
  │   ├── notion_source.py  # read and validate Notion rows
  │   ├── enrich.py         # covers and ISBNs, cached
  │   ├── stats.py          # counts, ratings, rankings
  │   ├── taste.py          # genre ratio, to-read, read next
  │   ├── posts.py          # reading notes (Markdown)
  │   ├── doodles.py        # drawing series and thumbnails
  │   └── render.py         # Jinja2 to static HTML
  ├── templates/            # HTML templates
  ├── static/               # CSS variables, JS, covers, doodles
  ├── scripts/              # PII/secret scan, pre-push check
  ├── tests/                # pytest suite
  ├── CLAUDE.md             # project rules for Claude
  └── .github/workflows/    # monthly + on-push build and deploy
links:
  - { label: "Live site", url: "https://maudes.github.io/library/" }
  - { label: "GitHub", url: "https://github.com/maudes/library" }
---

## How it works

Two views of the same system: the **stack** (what it is built from) and the **flow** (how a change reaches the live site).

### Stack

```mermaid
flowchart TB
    subgraph L1["Design"]
        F["Figma + Figma MCP<br/>design guideline"]
    end
    subgraph L2["Build · local project folder"]
        C["Claude<br/>writes Python, Jinja2 templates, JS, tests"]
    end
    subgraph L3["Data & services"]
        N[("Notion database<br/>books")]
        Y["YAML + Markdown<br/>genres · to-read · posts"]
        G["Google Books · Open Library<br/>covers & ISBNs"]
    end
    subgraph L4["Quality gate (3 layers)"]
        T["1 CLAUDE.md rules<br/>2 pre-push hook: PII scan + pytest<br/>3 GitHub Actions: PII scan + pytest again"]
    end
    subgraph L5["Deploy"]
        A["GitHub Actions<br/>monthly + every push"]
        P["GitHub Pages<br/>static site"]
    end
    subgraph L6["In the browser"]
        R["Google Analytics · YouTube playlist<br/>loaded by the live page"]
    end
    L1 --> L2 --> L3 --> L4 --> L5 --> L6
```

### Flow

```mermaid
flowchart TB
    D["Design<br/>Figma MCP"] --> W["Claude edits code<br/>in local folder<br/>(rules: CLAUDE.md)"]
    W --> LT{"pre-push hook<br/>PII scan + pytest"}
    LT -- fail --> W
    LT -- pass --> PU["git push"]
    PU --> CT{"GitHub Actions<br/>PII scan + pytest"}
    CT -- fail --> X["stop, no deploy"]
    CT -- pass --> B["build.py"]
    N[("Notion")] -- read --> B
    G["Google Books<br/>Open Library"] -- covers & ISBNs --> B
    Y["YAML + posts"] -- read --> B
    B --> CA["commit new covers<br/>back to repo"]
    B --> S["GitHub Pages<br/>live site"]
    S --> R["Browser: Analytics,<br/>YouTube on play"]
    M["Monthly schedule"] --> CT
```

