---
title: "JobLens AI Assistant"
group: "Hands-on Builds"
order: 5
description: "An LLM-powered assistant that scrapes job descriptions, compares them to your CV and tracks applications."
cover: joblens_UI.png
thumb: joblens_cover.png
tags: [python, fastapi, streamlit, llm, automation]
glance:
  - ["Role", "Sole PM & developer"]
  - ["Period", "Mar 2026 – Present"]
  - ["Stack", "FastAPI, Streamlit, Gemini"]
  - ["Impact", "10 min → under 30 s per job"]
lead: "Scrapes a job description from an ATS, runs an LLM comparison against your CV, surfaces matches and gaps, and syncs everything to Google Sheets for tracking."
why:
  title: "Why JobLens?"
  body:
    - "Job hunting meant tab-hopping between LinkedIn, career pages, my CV and a tracking spreadsheet: search, copy-paste, summarize, evaluate fit, repeat. Following the DRY principle, I built JobLens to reclaim that time for interviewing."
    - "It is also a sandbox for prompt engineering, multi-source scraping and LLM workflow automation, using the model as a decision-support layer rather than a chatbot."
callout:
  title: "Product thinking"
  items:
    - "Problem: manual JD-CV alignment is low-value, high-effort work."
    - "Success metric: time-to-track from 10 minutes per job to under 30 seconds."
    - "Audience: mid-to-senior tech professionals applying through Ashby or Greenhouse."
stack:
  - ["Backend", "FastAPI, Python"]
  - ["Frontend", "Streamlit"]
  - ["AI layer", "Gemini API (CV vs JD analysis)"]
  - ["Scraping", "Jina Reader, parsers for Greenhouse, Ashby, Lever, SmartRecruiters, Workday"]
  - ["Data sync", "Google Sheets API via gspread"]
  - ["Testing", "Pytest (unit and integration)"]
challenges:
  - ["Multi-ATS scraping", "Platform-specific parsers for five ATS providers, with Jina Reader as a universal fallback."]
  - ["Prompt versioning", "A versioned analyzer prompt tracks LLM behavior across iterations."]
  - ["Structured LLM output", "Prompts return parseable match points, gaps and suggestions for the Sheets sync."]
  - ["Mitigating hallucination", "Strict extraction rules keep the analysis grounded in the job description."]
  - ["Human in the loop", "An evaluation set benchmarks AI responses against my manual reviews."]
decisions:
  - ["Why FastAPI with Streamlit?", "Streamlit handles the UI, while FastAPI keeps the door open to expose the pipeline as an API."]
  - ["Why prompt versioning?", "LLM behavior drifts as prompts change, so the prompt is a versioned artifact with a changelog."]
  - ["Why split the tests?", "Mocked unit tests run on every change; integration tests hit real ATS URLs before releases."]
phases:
  - ["Initiation", ["Identified friction in manual CV-JD matching", "Scoped the core loop: scrape, analyze, track"]]
  - ["Planning", ["Designed a modular services layer (read, analyze, sync)", "Chose FastAPI for future API extensibility"]]
  - ["Development & Testing", ["Built iteratively with prompt tuning in parallel", "Split pytest into unit and integration"]]
  - ["Release & Deployment", ["Published with .env.example and a clear README", "Added a prompt versioning header for traceability"]]
  - ["Iteration & Impact", ["Refined the analyzer prompt across versions", "Expanded ATS coverage from real job-hunt usage"]]
structure: |
  job-hunt-ai/
  ├── services/
  │   ├── read.py             # fetch JD: ATS-specific + Jina fallback
  │   ├── aianalyzer.py       # Gemini CV vs JD comparison
  │   └── updatesheet.py      # sync results to Google Sheets
  ├── prompts/
  │   └── analyzer_prompt.md  # versioned system prompt
  ├── tests/
  │   ├── test_read.py              # unit, mocked
  │   └── test_read_integration.py  # integration, real network
  ├── app.py                  # Streamlit UI
  ├── main.py                 # FastAPI routes
  └── pyproject.toml
repo:
  label: "JobLens (job-hunt-ai)"
  url: "https://github.com/maudes/job-hunt-ai"
video: "https://www.youtube.com/embed/2OY2R-VBFPs?si=K4SwE3rRZK25-tFs"
---
