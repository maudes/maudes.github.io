---
title: "GoJob (formerly JobLens)"
group: "Built Solo"
subgroup: "Shipped Tools"
order: 6
description: "A local job-search workspace that decides which jobs are worth applying to and tailors the application, without inventing experience. Version 2 of JobLens, rebuilt around what three months of real job hunting taught me."
cover: gojob_jd.webp
thumb: gojob_cover.webp
tags: [ai_assisted, product_iteration, llm_workflow, ai_evals, claude_api, fastapi, nextjs, local_first]
glance:
  - ["Role", "Sole PM & developer"]
  - ["Period", "Mar 2026 – Present (v1 → v2)"]
  - ["Stack", "Next.js, FastAPI, Claude (Opus + Haiku)"]
  - ["Status", "v1.0.0, Nov 2026"]
lead: "My whole job search in one local workspace, from a resume health check to interview practice. Every AI answer is checked against my real resume before it is saved."
why:
  title: "Why a second version?"
  body:
    - "JobLens v1 solved the problem I thought I had: deciding whether a job was a fit. It scraped the job description, compared it with my CV and logged the result to Google Sheets, cutting time-to-track from 10 minutes to under 30 seconds per job."
    - "Three months of applying overseas showed me where the time really went: fine-tuning my resume and cover letter for each role, preparing interview stories, and networking. Interviewing and networking abroad were the parts I knew least and leaned on AI for most, so they ran in separate Claude Projects alongside v1. After paid career coaching, I reworked my story bank and networking approach."
    - "By then v1 was a small part of the workflow, and the real work was spread across several projects, each with its own copy of my resume and stories. GoJob brings it all into one place with one source of truth."
callout:
  title: "From a point tool to an end-to-end workflow"
  body: "v1 automated one step: deciding whether a job was a fit. v2 connects the whole search, from the profile to the interview, and every step reads the same resume and story bank. The flow is drawn below."
stack:
  - ["Screens", "Next.js; the screens only draw"]
  - ["Backend", "Python, FastAPI, plus a command line"]
  - ["AI layer", "Claude API: Opus writes and scores, five Haiku auditors check each answer"]
  - ["Prompts", "16 skill files, one per function"]
  - ["Documents", "python-docx, mammoth and pypdf for reading resumes and tracked-change Word output"]
  - ["Data", "One local JSON file; nothing leaves the machine except what is sent to the model"]
  - ["Quality", "181 backend and 13 web tests, plus evaluation sets of trap cases and planted auditor mistakes"]
  - ["CI & security", "GitHub Actions: tests and dependency audits on every push, audits again weekly, secret scanning"]
challenges:
  - ["Honesty under pressure to score", "Rewrites may only reword what the resume already shows. Missing numbers become [X%] placeholders marked \"needs confirmation\", never invented figures, tools or titles."]
  - ["Knowing when to stop", "Tuning could loop forever toward the threshold. A job stops at \"Ceiling reached\" when no change is backed by the resume, or a change adds less than one point."]
  - ["Proving faithfulness", "Code checks that every quote appears word for word in the resume or JD, and five auditors review each answer. A failing answer gets one repair pass."]
  - ["Measuring quality, not assuming it", "Ten synthetic cases built to provoke specific mistakes, such as keywords without evidence or \"supported\" inflated to \"led\". A second set plants 19 mistakes to see how many the auditors catch."]
decisions:
  - ["Why consolidate instead of adding another project?", "The problem was scattered context, not a missing tool. The resume, stories and target JD are written once and reused by every step."]
  - ["Why a fixed pipeline, not an agent?", "Every button already says what to do, so code routes it: no extra model call, the same path every time, easy to test. Only web search lets the model choose."]
  - ["Why a strong writer and cheap auditors?", "Opus writes and scores; five Haiku auditors check in parallel. Quality where it counts, low cost on checks that run on every answer."]
  - ["Why prompts as skill files?", "One file per function is easy to find, edit and diff. Every result carries a fingerprint of the skills that produced it, so a regression can be traced to one prompt."]
  - ["Why two ways to answer, one set of rules?", "Code decides what to ask and whether an answer passes. Only who answers changes: the Claude API, or Claude Code subagents for people without an API key."]
  - ["Why treat privacy as a design rule?", "Resumes are personal data: one local file, no account, subagent runs in a git-ignored folder, and a pushed API key is blocked."]
phases:
  - ["v1 · JobLens (Mar 2026)", ["Scrape the JD, compare it with my CV, sync to Google Sheets", "FastAPI, Streamlit and Gemini; time-to-track down to under 30 seconds"]]
  - ["Real use · three months applying overseas", ["The work moved to resume and cover letter tuning, interviews and networking", "Paid coaching reshaped my story bank and networking approach", "Context was scattered across projects; decided to consolidate"]]
  - ["v2 · GoJob 0.1 → 1.0 (Nov 2026)", ["Five steps on one page, backend rebuilt in Python", "Apply gate, tuning ceiling, traceable results, evaluation set"]]
  - ["Hardening (Nov 2026)", ["Prompts split into skill files", "Command line and subagent runner for use without an API key", "Tests, dependency audit and secret scanning in CI"]]
  - ["Next", ["Run the evaluation sets on every prompt or model change", "Turn real misses from my own search into new eval cases"]]
links:
  - { label: "GoJob on GitHub", url: "https://github.com/maudes/gojob" }
  - { label: "JobLens v1 on GitHub", url: "https://github.com/maudes/job-hunt-ai" }
  - { label: "JobLens v1 demo", url: "https://www.youtube.com/watch?v=2OY2R-VBFPs" }
---

## End to end

Five steps on one page, all reading the same resume and story bank. JobLens v1 covered only step 3; the sections below show how it is built and how step 3 decides.

<div class="flow" role="img" aria-label="Five steps: Profile, Find jobs, Target JD, Tracker, Interview coach. Target JD was the only step in JobLens v1. All steps share one resume, story bank and set of target JDs.">
<div class="flow-steps">
<div class="flow-step"><b>1 · Profile</b><span>Resume health check</span></div>
<div class="flow-step"><b>2 · Find jobs</b><span>Region scan, real links only</span></div>
<div class="flow-step v1"><b>3 · Target JD</b><span>Apply decision, tailored resume, cover letter, networking</span><em>JobLens v1</em></div>
<div class="flow-step"><b>4 · Tracker</b><span>One row per application</span></div>
<div class="flow-step"><b>5 · Interview coach</b><span>Practice from my story bank</span></div>
</div>
<div class="flow-shared">Shared source of truth · resume · story bank · target JDs</div>
</div>

## Trade-offs

| Choice | What it costs | Why I accept it |
|---|---|---|
| Read the resume from a Google Docs link, never write back | Changes come back as a Word file and Copy buttons | Writing back needs a Google sign-in a local tool should not hold |
| Lock the resume layout | Tuning can only reword the headline, summary, bullets and skills | Names, employers, titles and dates are facts, and the page count stays |
| Subagent mode (no API key) on the command line only | One job description per run, not the full web flow | It is a fallback for people without an API key |

## Architecture

Two ways in, one backend. Every answer passes the layout lock and the audit gate before it is saved, whether the Claude API or a Claude Code subagent wrote it.

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

Rules used by several skills, such as the ground rules and work-visa signals, live in one shared file. To change a prompt: edit one skill, run the tests and evals, and compare with the last run, which names the skills that changed.

| Step | Skills |
|---|---|
| Shared | `shared-rules`: ground rules, change rules, visa signals, search honesty, language |
| 1 · Profile | `health-check`, `panel-scorer` |
| 2 · Find jobs | `scout`, `company-watch`, `networking` |
| 3 · Target JD | `jd-match`, `panel-scorer`, `fine-tune`, `cover-letter`, `interview-prep`, `networking`, `one-pager` |
| 5 · Interview coach | `interview-coach`, `coach-question`, `coach-feedback`, `coach-report` |
| Every answer | `auditor`: one focus per auditor, five in all |

## Answering without an API key

From the command line, Claude Code subagents can answer instead of the API. The command writes a request file for each model call and reruns until every call has an answer, then applies the same audit and gate as the app.

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

## Step 3 · Apply, tune or stop

A job is scored, then ready to apply, risky, or sent to tuning. Tuning can only reword what is already true, so it has a ceiling.

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

## Building it with AI

GoJob was built with Claude Code. I owned the product decisions: what each step should produce, the honesty rules, the apply and tuning gates, and the trap cases that test them. Claude wrote most of the code and tests against those rules, and every change went through the test suite and my review before it was committed.
