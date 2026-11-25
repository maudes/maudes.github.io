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

<figure class="arch">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 496" role="img" aria-labelledby="lib-stack-t lib-stack-d">
<title id="lib-stack-t">Maude's Library stack</title>
<desc id="lib-stack-d">Six layers from top to bottom. Design: Figma and Figma MCP give Claude a design guideline. Build: Claude writes the Python site generator, Jinja2 templates, JavaScript and tests in a local project folder. Data and services: a Notion database of books, YAML and Markdown files for genres, the to-read list and posts, and covers and ISBNs from Google Books with Open Library as fallback. Quality gate in three layers: CLAUDE.md rules in every chat, a pre-push hook that runs the PII scan and pytest, and GitHub Actions running the same checks again. Deploy: GitHub Actions builds monthly and on every push, and publishes to GitHub Pages as a static site. In the browser: Google Analytics and a YouTube playlist load on the live page.</desc>
<defs><marker id="lib-stack-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 1L8 5L2 9" fill="none" class="arr-head" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<text class="lbl start" x="20" y="48">Design</text>
<g class="purple"><rect x="120" y="20" width="540" height="56" rx="8"/>
<text class="th" x="390" y="38">Figma + Figma MCP</text>
<text class="ts" x="390" y="58">design guideline handed to Claude</text></g>
<line class="arr" x1="390" y1="76" x2="390" y2="98" marker-end="url(#lib-stack-arrow)"/>
<text class="lbl start" x="20" y="128">Build</text>
<g class="purple"><rect x="120" y="100" width="540" height="56" rx="8"/>
<text class="th" x="390" y="118">Claude · local project folder</text>
<text class="ts" x="390" y="138">writes Python, Jinja2 templates, JS and tests</text></g>
<line class="arr" x1="390" y1="156" x2="390" y2="178" marker-end="url(#lib-stack-arrow)"/>
<text class="lbl start" x="20" y="208">Data &amp; services</text>
<g class="gray"><rect x="120" y="180" width="170" height="56" rx="8"/>
<text class="th" x="205" y="198">Notion database</text>
<text class="ts" x="205" y="218">books</text></g>
<g class="gray"><rect x="305" y="180" width="170" height="56" rx="8"/>
<text class="th" x="390" y="198">YAML + Markdown</text>
<text class="ts" x="390" y="218">genres · to-read · posts</text></g>
<g class="gray"><rect x="490" y="180" width="170" height="56" rx="8"/>
<text class="th" x="575" y="198">Covers &amp; ISBNs</text>
<text class="ts" x="575" y="218">Google Books, Open Library</text></g>
<line class="arr" x1="390" y1="236" x2="390" y2="258" marker-end="url(#lib-stack-arrow)"/>
<text class="lbl start" x="20" y="288">Quality gate</text>
<g class="amber"><rect x="120" y="260" width="170" height="56" rx="8"/>
<text class="th" x="205" y="278">1 · CLAUDE.md</text>
<text class="ts" x="205" y="298">rules in every chat</text></g>
<g class="amber"><rect x="305" y="260" width="170" height="56" rx="8"/>
<text class="th" x="390" y="278">2 · Pre-push hook</text>
<text class="ts" x="390" y="298">PII scan + pytest</text></g>
<g class="amber"><rect x="490" y="260" width="170" height="56" rx="8"/>
<text class="th" x="575" y="278">3 · GitHub Actions</text>
<text class="ts" x="575" y="298">same checks again</text></g>
<line class="arr" x1="390" y1="316" x2="390" y2="338" marker-end="url(#lib-stack-arrow)"/>
<text class="lbl start" x="20" y="368">Deploy</text>
<g class="teal"><rect x="120" y="340" width="262" height="56" rx="8"/>
<text class="th" x="251" y="358">GitHub Actions</text>
<text class="ts" x="251" y="378">monthly + every push</text></g>
<g class="teal"><rect x="398" y="340" width="262" height="56" rx="8"/>
<text class="th" x="529" y="358">GitHub Pages</text>
<text class="ts" x="529" y="378">static site</text></g>
<line class="arr" x1="390" y1="396" x2="390" y2="418" marker-end="url(#lib-stack-arrow)"/>
<text class="lbl start" x="20" y="448">In the browser</text>
<g class="gray"><rect x="120" y="420" width="540" height="56" rx="8"/>
<text class="th" x="390" y="438">Google Analytics · YouTube playlist</text>
<text class="ts" x="390" y="458">loaded by the live page</text></g>
</svg>
</figure>

### Flow

<figure class="arch">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 504" role="img" aria-labelledby="lib-flow-t lib-flow-d">
<title id="lib-flow-t">How a change reaches the live site</title>
<desc id="lib-flow-d">A design from Figma MCP goes to Claude, who edits the code under the CLAUDE.md rules. A pre-push hook runs the PII scan and pytest; on failure the change goes back to Claude, on success it is pushed. GitHub Actions runs the same checks on every push and on a monthly schedule; on failure nothing is deployed. On success build.py reads the Notion database, the YAML and Markdown files, and covers and ISBNs from Google Books with Open Library as fallback. It commits newly found covers back to the repo and publishes the static site to GitHub Pages, where the browser loads Analytics and the YouTube playlist on play.</desc>
<defs><marker id="lib-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 1L8 5L2 9" fill="none" class="arr-head" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<g class="purple"><rect x="40" y="36" width="160" height="56" rx="8"/>
<text class="th" x="120" y="54">Design</text>
<text class="ts" x="120" y="74">Figma MCP</text></g>
<line class="arr" x1="200" y1="64" x2="258" y2="64" marker-end="url(#lib-flow-arrow)"/>
<g class="purple"><rect x="260" y="36" width="180" height="56" rx="8"/>
<text class="th" x="350" y="54">Claude edits code</text>
<text class="ts" x="350" y="74">rules: CLAUDE.md</text></g>
<line class="arr" x1="440" y1="64" x2="498" y2="64" marker-end="url(#lib-flow-arrow)"/>
<g class="amber"><rect x="500" y="36" width="140" height="56" rx="8"/>
<text class="th" x="570" y="54">Pre-push hook</text>
<text class="ts" x="570" y="74">PII scan + pytest</text></g>
<path class="arr dash" d="M590 36V18H350V34" marker-end="url(#lib-flow-arrow)"/>
<text class="lbl start" x="456" y="10">fail</text>
<line class="arr" x1="570" y1="92" x2="570" y2="134" marker-end="url(#lib-flow-arrow)"/>
<text class="lbl start" x="578" y="113">pass</text>
<g class="gray"><rect x="500" y="136" width="140" height="56" rx="8"/>
<text class="th" x="570" y="154">git push</text>
<text class="ts" x="570" y="174">to main</text></g>
<line class="arr" x1="500" y1="164" x2="442" y2="164" marker-end="url(#lib-flow-arrow)"/>
<g class="amber"><rect x="260" y="136" width="180" height="56" rx="8"/>
<text class="th" x="350" y="154">GitHub Actions</text>
<text class="ts" x="350" y="174">PII scan + pytest again</text></g>
<g class="gray"><rect x="40" y="136" width="160" height="56" rx="8"/>
<text class="th" x="120" y="154">Monthly schedule</text>
<text class="ts" x="120" y="174">1st of every month</text></g>
<line class="arr" x1="200" y1="164" x2="258" y2="164" marker-end="url(#lib-flow-arrow)"/>
<path class="arr dash" d="M420 192V258H498" marker-end="url(#lib-flow-arrow)"/>
<text class="lbl start" x="428" y="226">fail</text>
<g class="gray dashed"><rect x="500" y="230" width="140" height="56" rx="8"/>
<text class="th" x="570" y="248">Stop</text>
<text class="ts" x="570" y="268">nothing deployed</text></g>
<line class="arr" x1="335" y1="192" x2="335" y2="290" marker-end="url(#lib-flow-arrow)"/>
<text class="lbl start" x="343" y="226">pass</text>
<g class="gray"><rect x="30" y="230" width="170" height="56" rx="8"/>
<text class="th" x="115" y="248">Notion</text>
<text class="ts" x="115" y="268">books database</text></g>
<g class="gray"><rect x="30" y="292" width="170" height="56" rx="8"/>
<text class="th" x="115" y="310">Covers &amp; ISBNs</text>
<text class="ts" x="115" y="330">Google Books, Open Library</text></g>
<g class="gray"><rect x="30" y="354" width="170" height="56" rx="8"/>
<text class="th" x="115" y="372">YAML + Markdown</text>
<text class="ts" x="115" y="392">genres · to-read · posts</text></g>
<path class="arr" d="M200 258H224V320"/>
<path class="arr" d="M200 382H224V320"/>
<line class="arr" x1="200" y1="320" x2="248" y2="320" marker-end="url(#lib-flow-arrow)"/>
<g class="teal"><rect x="250" y="292" width="170" height="56" rx="8"/>
<text class="th" x="335" y="310">build.py</text>
<text class="ts" x="335" y="330">stats · Jinja2 → HTML</text></g>
<line class="arr" x1="420" y1="320" x2="498" y2="320" marker-end="url(#lib-flow-arrow)"/>
<g class="gray"><rect x="500" y="292" width="140" height="56" rx="8"/>
<text class="th" x="570" y="310">Cover cache</text>
<text class="ts" x="570" y="330">committed to repo</text></g>
<path class="arr" d="M335 348V382H498" marker-end="url(#lib-flow-arrow)"/>
<g class="teal"><rect x="500" y="354" width="140" height="56" rx="8"/>
<text class="th" x="570" y="372">GitHub Pages</text>
<text class="ts" x="570" y="392">static site</text></g>
<line class="arr" x1="570" y1="410" x2="570" y2="436" marker-end="url(#lib-flow-arrow)"/>
<g class="gray"><rect x="480" y="438" width="180" height="56" rx="8"/>
<text class="th" x="570" y="456">In the browser</text>
<text class="ts" x="570" y="476">Analytics · YouTube on play</text></g>
</svg>
</figure>
