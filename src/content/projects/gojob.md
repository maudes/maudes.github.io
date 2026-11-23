---
title: "GoJob (formerly JobLens)"
group: "Built Solo"
subgroup: "Shipped Tools"
order: 6
description: "A local job-search workspace that decides which jobs are worth applying to and tailors the application, without inventing experience. Version 2 of JobLens, rebuilt around what three months of real job hunting taught me."
cover: gojob_jd.webp
thumb: gojob_cover.webp
tags: [product_iteration, llm_workflow, ai_evals, claude_api, fastapi, nextjs, local_first]
glance:
  - ["Role", "Sole PM & developer"]
  - ["Period", "Mar 2026 – Present (v1 → v2)"]
  - ["Stack", "Next.js, FastAPI, Claude (Opus + Haiku)"]
  - ["Status", "v1.0.0, Nov 2026"]
lead: "One page, five steps: a resume health check, a job scan, a target-JD analysis with a tailored resume, cover letter, interview prep and networking plan, an application tracker, and an interview coach that works from my own story bank. Every AI answer is audited before it is saved."
why:
  title: "Why a second version?"
  body:
    - "JobLens v1 solved the problem I thought I had: deciding whether a job was a fit. It scraped the job description, compared it with my CV and logged the result to Google Sheets, cutting time-to-track from 10 minutes to under 30 seconds per job."
    - "Three months of applying overseas showed me where the time really went: fine-tuning my resume and cover letter for each role, preparing interview stories, and networking. Interviewing and networking abroad were the parts I knew least and leaned on AI for most, so they ran in separate Claude Projects alongside v1. After paid career coaching, I reworked my story bank and networking approach."
    - "By then v1 was a small part of the workflow, and the real work was spread across several projects, each with its own copy of my resume and stories. GoJob brings it all into one place with one source of truth."
callout:
  title: "From a point tool to an end-to-end workflow"
  body: "v1 automated one step of the search. v2 covers the whole loop in one workspace, from the profile to the interview:"
  items:
    - "Profile: a health check of the resume against target roles"
    - "Find jobs: a region-by-region scan with real links only"
    - "Target JD: an apply decision, tailored resume and cover letter, networking plan"
    - "Tracker: one row per application"
    - "Interview coach: practice from my own story bank, with feedback"
stack:
  - ["Screens", "Next.js; the screens only draw and forward /api calls"]
  - ["Backend", "Python, FastAPI, typed request checking"]
  - ["AI layer", "Claude API: Opus writes and scores, five Haiku auditors check each answer"]
  - ["Prompts", "16 skill files, one per function, with shared rules included by reference"]
  - ["Documents", "python-docx, mammoth and pypdf for resume reading and tracked-change Word output"]
  - ["Data", "One local JSON file with schema versioning; no account, nothing leaves the machine"]
  - ["Quality", "pytest and Node test runner, plus an evaluation set of synthetic trap cases"]
challenges:
  - ["Honesty under pressure to score", "Rewrites may only reword what the resume already shows. Missing numbers become [X%] placeholders marked \"needs confirmation\", never invented figures, tools or titles."]
  - ["Knowing when to stop", "Tuning could loop forever toward the threshold. A job now stops at \"Ceiling reached\" when no change is backed by the resume, or a change raises the average by less than one point."]
  - ["Proving faithfulness", "Code checks that every quote appears word for word in the resume or JD, and five auditors review each answer. Anything below the bar gets one repair pass."]
  - ["Measuring quality, not assuming it", "Ten synthetic cases built to provoke specific mistakes: keywords without evidence, \"supported\" inflated to \"led\", prompt injection in a JD, work-visa wording. A second set plants 19 mistakes to test how many the auditors catch."]
decisions:
  - ["Why consolidate instead of adding another project?", "The problem was scattered context, not a missing tool. One workspace means the resume, stories and target JD are written once and reused by every step."]
  - ["Why a fixed pipeline, not an agent?", "Every button already says what to do, so code routes it: no extra model call, the same path every time, easy to test. Only web search lets the model choose."]
  - ["Why a strong writer and cheap auditors?", "Opus writes and scores; five Haiku auditors check in parallel. Quality where it counts, low cost on the checks that run on every answer."]
  - ["Why a clear apply rule?", "An average of 80 with no reviewer below 70 means apply, 60 to 79 means tune first, below 60 means skip. Work-visa wording in the posting is part of the verdict."]
  - ["Why prompts as skill files?", "Prompts were one long Python file. Splitting them into one skill per function makes each prompt easy to find, edit and diff on its own. Shared rules live in one place, and an edit applies on the next call without a restart."]
  - ["Why stamp every result?", "Each answer carries the app version and a fingerprint of every skill, so I can tell which prompt produced it, and a run-to-run comparison names the skills that changed."]
  - ["Why local first?", "Resumes are personal data. One JSON file and no background jobs keep it simple and private."]
phases:
  - ["v1 · JobLens (Mar 2026)", ["Scrape the JD, compare it with my CV, sync to Google Sheets", "FastAPI, Streamlit and Gemini; time-to-track down to under 30 seconds"]]
  - ["Real use · three months applying overseas", ["Most of the work moved to resume and cover letter fine-tuning", "Interview prep and networking ran in separate Claude Projects", "Paid coaching reshaped my story bank and networking approach"]]
  - ["The signal", ["v1 had become a small part of the workflow", "Context was scattered across projects; decided to consolidate"]]
  - ["v2 · GoJob 0.1 → 1.0 (Nov 2026)", ["Next.js baseline: five steps on one page", "Backend rebuilt in Python, results made traceable, data versioned", "Stricter apply gate, tuning ceiling, request checking, evaluation set"]]
  - ["Next", ["Run the evaluation set on every prompt or model change", "Turn real misses from my own search into new eval cases"]]
structure: |
  gojob/
  ├── app/ · components/      # Next.js screens: profile, jobs, JD, tracker, coach
  ├── backend/gojob/
  │   ├── skills/             # 16 prompt files, one per function
  │   ├── skill_loader.py     # loads skills, resolves includes and variables
  │   ├── model_client.py     # the only code that calls a model: API or subagents
  │   ├── subagent_runner.py  # request and answer files for Claude Code
  │   ├── audit.py            # five auditors, quote check, one repair pass
  │   ├── scoring.py          # every gate: apply rule, tuning ceiling
  │   ├── tasks.py            # each step's flow, shared by web and CLI
  │   ├── api.py · cli.py     # two ways in: FastAPI routes, command line
  │   └── docx_io.py          # tracked-change Word output
  ├── evals/
  │   ├── cases/              # synthetic trap cases
  │   ├── rubrics/            # faithfulness, usefulness
  │   └── graders.py · judge.py
  ├── data/db.json            # all state, local only
  └── CHANGELOG.md
links:
  - { label: "GoJob on GitHub", url: "https://github.com/maudes/gojob" }
  - { label: "JobLens v1 on GitHub", url: "https://github.com/maudes/job-hunt-ai" }
  - { label: "JobLens v1 demo", url: "https://www.youtube.com/watch?v=2OY2R-VBFPs" }
---

## From JobLens to GoJob

| | v1 · JobLens | v2 · GoJob |
|---|---|---|
| **Covers** | Fit check and tracking | Resume health, job scan, fit, tailored resume and cover letter, interview prep, networking, tracking |
| **Model** | Gemini, one analysis call | Claude: a writer, a three-reviewer panel, five auditors |
| **Trust** | Prompt rules against hallucination | Word-for-word quote checks in code, audit gate, repair pass |
| **Measured by** | Time saved per job | Synthetic trap cases and run-to-run regression checks |
| **Where it lived** | One tool, plus several Claude Projects on the side | One workspace |

## End to end

v1 covered one step. v2 connects the whole search, and every step reads from the same profile and story bank.

```mermaid
flowchart LR
  P["Profile"] --> F["Find jobs"] --> J["Target JD<br/>apply · tailor · network"] --> K["Tracker"] --> C["Interview<br/>coach"]
  classDef v1 stroke-width:3px
  class J v1
```

*Bold outline: Target JD, the only step JobLens v1 covered.*

## Architecture and the audit gate

There are two ways in: the web page, which only draws, and the command line through Claude Code. One Python backend builds four AI roles from skill files, reading the one file each task names, and a single model client decides who answers: the Claude API, or Claude Code subagents when there is no API key. Every answer passes the layout lock and the audit gate before it is saved.

<figure class="arch">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 666" role="img" aria-labelledby="arch-t arch-d">
<title id="arch-t">GoJob system architecture</title>
<desc id="arch-d">From top to bottom: two entrances (the Next.js page and the command line with Claude Code), the Python backend, the skill files with the four AI roles built from them, the model client (Claude API or Claude Code subagents), a layout lock and audit gate, and local data files where the result is saved.</desc>
<defs><marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 1L8 5L2 9" fill="none" class="arr-head" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<g class="gray"><rect x="40" y="20" width="290" height="56" rx="8"/>
<text class="th" x="185" y="40">Next.js single page</text>
<text class="ts" x="185" y="58">Five tabs · forwards /api/*</text></g>
<g class="gray"><rect x="350" y="20" width="290" height="56" rx="8"/>
<text class="th" x="495" y="40">Command line + Claude Code</text>
<text class="ts" x="495" y="58">run-gojob skill · no API key needed</text></g>
<line class="arr" x1="185" y1="76" x2="185" y2="102" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="495" y1="76" x2="495" y2="102" marker-end="url(#arch-arrow)"/>
<g class="gray"><rect x="100" y="104" width="480" height="56" rx="8"/>
<text class="th" x="340" y="124">Python backend</text>
<text class="ts" x="340" y="142">Web: /api/* routes · CLI: gojob.cli · one set of task code</text></g>
<line class="arr" x1="340" y1="160" x2="340" y2="178" marker-end="url(#arch-arrow)"/>
<g class="skills"><rect x="28" y="180" width="624" height="156" rx="10"/>
<text class="th" x="340" y="198">Skills · 16 prompt files in backend/gojob/skills/</text>
<text class="ts" x="340" y="216">The task code reads the one file it names, on every call · nothing scans the folder</text>
<text class="ts" x="340" y="232">Also here: shared rules (used by every role) and the auditor prompt (used by the audit gate)</text></g>
<g class="purple"><rect x="40" y="248" width="135" height="72" rx="8"/>
<text class="th" x="107" y="268">Writer</text><text class="ts" x="107" y="288">Analysis, tuning</text><text class="ts" x="107" y="305">Letter, questions</text></g>
<g class="purple"><rect x="195" y="248" width="135" height="72" rx="8"/>
<text class="th" x="262" y="268">Review panel</text><text class="ts" x="262" y="288">Three reviewers</text><text class="ts" x="262" y="305">score in parallel</text></g>
<g class="purple"><rect x="350" y="248" width="135" height="72" rx="8"/>
<text class="th" x="417" y="268">Search agent</text><text class="ts" x="417" y="288">Jobs · people</text><text class="ts" x="417" y="305">Company research</text></g>
<g class="purple"><rect x="505" y="248" width="135" height="72" rx="8"/>
<text class="th" x="572" y="268">Interview coach</text><text class="ts" x="572" y="288">Questions</text><text class="ts" x="572" y="305">Feedback · report</text></g>
<line class="arr" x1="107" y1="320" x2="107" y2="364" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="262" y1="320" x2="262" y2="364" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="417" y1="320" x2="417" y2="364" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="572" y1="320" x2="572" y2="364" marker-end="url(#arch-arrow)"/>
<g class="amber"><rect x="40" y="366" width="600" height="56" rx="8"/>
<text class="th" x="340" y="386">Model client · the only code that calls a model</text>
<text class="ts" x="340" y="404">Claude API (default) · or Claude Code subagents through files (CLI only)</text></g>
<line class="arr" x1="107" y1="422" x2="107" y2="454" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="262" y1="422" x2="262" y2="454" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="417" y1="422" x2="417" y2="454" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="572" y1="422" x2="572" y2="454" marker-end="url(#arch-arrow)"/>
<g class="teal"><rect x="40" y="456" width="600" height="84" rx="8"/>
<line class="div" x1="245" y1="466" x2="245" y2="530"/>
<text class="th" x="142" y="474">1 · Layout lock</text>
<text class="ts" x="142" y="494">Resume changes only:</text>
<text class="ts" x="142" y="511">name, sections, employers,</text>
<text class="ts" x="142" y="528">titles, dates stay locked</text>
<text class="th" x="442" y="474">2 · Audit gate (with_audit)</text>
<text class="ts" x="442" y="494">Five Haiku auditors + word-for-word quote check</text>
<text class="ts" x="442" y="511">Fails: the same role rewrites once</text>
<text class="ts" x="442" y="528">(search roles are audited only)</text></g>
<line class="arr" x1="135" y1="540" x2="135" y2="572" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="340" y1="540" x2="340" y2="572" marker-end="url(#arch-arrow)"/>
<line class="arr" x1="545" y1="540" x2="545" y2="572" marker-end="url(#arch-arrow)"/>
<g class="gray"><rect x="40" y="574" width="190" height="56" rx="8"/>
<text class="th" x="135" y="594">data/db.json</text><text class="ts" x="135" y="612">State and results</text></g>
<g class="gray"><rect x="245" y="574" width="190" height="56" rx="8"/>
<text class="th" x="340" y="594">data/files/</text><text class="ts" x="340" y="612">Resume .docx files</text></g>
<g class="gray"><rect x="450" y="574" width="190" height="56" rx="8"/>
<text class="th" x="545" y="594">data/manual/</text><text class="ts" x="545" y="612">Subagent runs · private</text></g>
</svg>
</figure>

## Prompts as skills

Every prompt is a plain-text skill file, split by function. Rules used by several skills, such as the ground rules, resume change rules and work-visa signals, live in one shared file and are included by reference.

| Step | Skills |
|---|---|
| Shared | `shared-rules`: ground rules, change rules, visa signals, search honesty, language |
| 1 · Profile | `health-check`, `panel-scorer` |
| 2 · Find jobs | `scout`, `company-watch`, `networking` |
| 3 · Target JD | `jd-match`, `panel-scorer`, `fine-tune`, `cover-letter`, `interview-prep`, `networking`, `one-pager` |
| 5 · Interview coach | `interview-coach`, `coach-question`, `coach-feedback`, `coach-report` |
| Every answer | `auditor`: one focus per auditor, five in all |

Iterating on a prompt follows one loop: edit a skill, run the tests (every include and variable must resolve), run the evals and compare with the last run. The comparison names the skills that changed, and every saved answer carries a fingerprint of the skills that produced it.

## How a job moves

A job is scored, then either ready to apply, risky, or sent to tuning. Tuning can only reword what is already true, so it has a ceiling.

```mermaid
stateDiagram-v2
  direction LR
  state "Assessed<br/>Three reviewers score" as Assessed
  state "Ready to apply" as Ready
  state "Risky<br/>Suggest not applying" as Risky
  state "Tuning<br/>Rewords only what the resume shows" as Tuning
  state "Ceiling reached<br/>Add real experience or choose another job" as Ceiling
  [*] --> Assessed: Paste a JD
  Assessed --> Ready: Average 80+, lowest 70+
  Assessed --> Tuning: Average 60–79
  Assessed --> Risky: Average below 60
  Risky --> Tuning: Tune anyway
  Tuning --> Assessed: Accept changes, re-assess
  Tuning --> Ceiling: No supported change, or gain under 1 point
```

## What happens when you paste a JD

The match analysis and the reviewer scores run as two parallel lanes. Each lane is audited on its own, and only a lane that fails is rewritten.

```mermaid
sequenceDiagram
  participant U as User
  participant B as Backend
  participant W as Writer (Opus)
  participant P as Panel ×3 (Opus)
  participant A as Auditors ×5 (Haiku)
  U->>B: Paste a JD
  par Match analysis
    B->>W: Write the analysis
    W-->>B: Analysis
    B->>A: Audit it, check quotes
  and Reviewer scores
    B->>P: Score the resume
    P-->>B: Three scores
    B->>A: Audit the scores
  end
  opt A lane fails its audit
    B->>W: Rewrite once
    B->>A: Audit again
  end
  B->>B: Gate: average 80+ and lowest 70+
  B-->>U: Result and apply tier
```

## Answering without an API key

From the command line, the same flow can be answered by Claude Code subagents instead of the API. The code still decides what to ask and whether the answer passes; only who answers changes.

```mermaid
sequenceDiagram
  participant S as Claude Code
  participant C as GoJob CLI
  participant F as Run folder
  participant A as Subagents
  loop Until the status is done
    S->>C: analyze-jd --runner subagent
    C->>F: Reuse answers, write new requests
    alt Some calls have no answer yet
      C-->>S: pending, with the request files
      par One subagent per request
        S->>A: Answer this request file
        A->>F: Write the answer file
      end
    else Every call has a valid answer
      C->>C: Audit, check, gate (as in the app)
      C-->>S: done, with the result
    end
  end
```
