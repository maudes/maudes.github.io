---
title: "HealthTally (formerly CarePilot)"
group: "Built Solo"
subgroup: "Domain Explorations"
order: 7
description: "A personal health tracker where the user decides how local their data stays. Phase 1 shipped a FastAPI + PostgreSQL core; Phase 2 redesigns login and storage for local-first use, with FHIR import and export."
cover: HealthTally_dashboard.webp
thumb: HealthTally_cover.webp
tags: [ai_assisted, local_first, fhir, encryption, security, fastapi, sqlalchemy, pytest]
glance:
  - ["Role", "Sole developer & PM"]
  - ["Period", "Jun 2025 – Present (Phase 1 → 2)"]
  - ["Stack", "FastAPI, PostgreSQL, Streamlit"]
  - ["Status", "Phase 1 shipped · Phase 2 in design"]
lead: "Track blood pressure, heart rate, glucose and goals over time, and choose how far your health data travels: a passphrase-locked local vault, the cloud-assisted setup, or anything in between."
why:
  title: "Why HealthTally?"
  body:
    - "In 2025 I earned my EMT-1 certification in Taiwan and saw first-hand how fragmented health information hinders critical care. That led me to the OHDSI community and the Civic Tech Taiwan competition (MODA × Taoyuan City Gov’t, 2025), where my team was a Finalist."
    - "The competition showed the problem from the system side. HealthTally looks at it from the individual’s side: if people are to carry their own health data between providers, they need a place to keep it that they trust, and a standard format to take it out."
callout:
  title: "From a promise to a property"
  body: "Phase 1 built the place: records, goals and trend charts behind an email-code login. But it ran on a cloud database and a cloud token store, so “your data stays yours” was only a promise. Phase 2 makes it a property: login, token store and data storage become three independent switches, and the only thing that ever leaves the machine is an email code or a file the user exports."
stack:
  - ["Screens", "Streamlit · planned: setup wizard, settings page"]
  - ["Backend", "FastAPI, SQLAlchemy, Pydantic, SMTP"]
  - ["Database", "PostgreSQL + Alembic · planned: SQLite + SQLCipher"]
  - ["Auth", "JWT (PyJWT), email OTP · planned: Argon2id passphrase"]
  - ["Token store", "Redis (Upstash) · planned: local store"]
  - ["Standards", "Planned: HL7 FHIR Bundle (Observation)"]
  - ["Analytics", "pandas, matplotlib"]
  - ["DevOps & testing", "uv, Makefile, multi-env config, optional Docker; pytest"]
challenges:
  - ["Three switches, one codebase", "A config service picks the login method, token store and database at runtime, so the health APIs never know whether data sits in PostgreSQL or a local encrypted file."]
  - ["Encryption without a stored password", "The vault key is derived from the passphrase with Argon2id. No password hash is kept: a wrong passphrase simply fails to open the file."]
  - ["One way out", "Export is the only path where data leaves, so it is the most guarded: an email code with an expiry, a try limit and a lock."]
  - ["Speaking a clinical standard", "Blood pressure, heart rate, temperature, SpO2 and glucose map to FHIR Observation resources, with codes checked against the official tables."]
decisions:
  - ["Why three independent switches?", "Privacy needs differ. Separate switches let each user pick their own trade-off instead of one all-or-nothing “offline mode”."]
  - ["Why keep the cloud setup?", "Phase 2 builds on Phase 1 instead of replacing it. The cloud setup becomes one preset, so nothing that works today breaks."]
  - ["Why FHIR, not just CSV?", "A CSV is readable by people; a FHIR Bundle is readable by clinical systems. Owning your data only helps if you can hand it to the next doctor."]
phases:
  - ["Phase 1 · Core, as CarePilot (Sep 2025)", ["Daily records, history, goals, trend charts", "Email OTP + JWT login, FastAPI + PostgreSQL, pytest", "Written entirely by hand, without AI assistance"]]
  - ["Hardening (Nov 2026)", ["uv + Makefile as the main setup, Docker made optional", "Replaced python-jose with PyJWT, upgraded packages with known vulnerabilities"]]
  - ["Phase 2 · Local-first + FHIR (current)", ["Setup wizard with four presets and a settings page", "Encrypted SQLite vault, verification tiers, idle auto-lock", "FHIR Bundle import and export", "Claude Code joins the workflow"]]
  - ["Next · Phase 3", ["MQTT ingest from home devices", "Pet health tracking", "Opt-in third-party integrations, off by default"]]
links:
  - { label: "HealthTally on GitHub", url: "https://github.com/maudes/healthtally" }
  - { label: "Phase 1 demo", url: "https://www.youtube.com/watch?v=vUQTXPYX7bw" }
---

## End to end

One session, from first run to taking the data out. Phase 1 covers the highlighted steps; the sections below walk through the three that Phase 2 adds.

<div class="flow" role="img" aria-label="Five steps: Set up, Sign in, Record, Review, Export. Record and Review exist in Phase 1. All steps run on three independent options: login, token store and data storage.">
<div class="flow-steps">
<div class="flow-step"><b>1 · Set up</b><span>Wizard picks login, tokens and storage</span></div>
<div class="flow-step"><b>2 · Sign in</b><span>Email code, or unlock the vault with a passphrase</span></div>
<div class="flow-step v1"><b>3 · Record</b><span>Blood pressure, heart rate, glucose, SpO2</span><em>Phase 1</em></div>
<div class="flow-step v1"><b>4 · Review</b><span>History, goals, trend charts</span><em>Phase 1</em></div>
<div class="flow-step"><b>5 · Export</b><span>JSON or FHIR, after an email code</span></div>
</div>
<div class="flow-shared">Three independent options · login · token store · data storage</div>
</div>

## Trade-offs

| Choice | What it costs | Why I accept it |
|---|---|---|
| Key derived from the passphrase | Forget it without the recovery key and the data is gone | Any recovery path that bypasses the passphrase could also be used by someone else |
| Email required in every setup | “Local-only” still needs SMTP for sensitive actions | A second factor exactly where data can leave or be overwritten |
| Shorter tokens and idle lock in local modes | Signing in more often | A dashboard can sit open on a shared screen at home |
| Third-party features opt-in, per feature | Fewer integrations out of the box | The local-only promise stays true unless the user turns a feature on |

## Architecture

One backend, three switches. Green parts exist today; purple parts are the Phase 2 design.

<figure class="arch">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 700" role="img" aria-labelledby="cp-arch-t cp-arch-d">
<title id="cp-arch-t">HealthTally system architecture</title>
<desc id="cp-arch-d">The Streamlit dashboard calls a FastAPI backend with four parts: auth gate, health APIs, config API and data import and export. Below it are three independent options set by config: login (email code, passphrase, or both), token store (Upstash Redis or a local store) and data storage (PostgreSQL or encrypted SQLite). A verified email is required in every setup. Export, import and storage changes need an email code step-up, and the only data that leaves is a JSON or FHIR file.</desc>
<defs><marker id="cp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 1L8 5L2 9" fill="none" class="arr-head" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<g class="gray"><rect x="200" y="20" width="280" height="56" rx="8"/>
<text class="th" x="340" y="40">Streamlit dashboard</text>
<text class="ts" x="340" y="58">Pages · setup wizard · settings</text></g>
<line class="arr" x1="340" y1="76" x2="340" y2="102" marker-end="url(#cp-arrow)"/>
<g class="gray dashed"><rect x="40" y="104" width="600" height="116" rx="12"/>
<text class="th" x="340" y="124">FastAPI backend</text></g>
<g class="purple"><rect x="49" y="142" width="132" height="60" rx="8"/>
<text class="th" x="115" y="162">Auth gate</text><text class="ts" x="115" y="182">Any login method</text></g>
<g class="teal"><rect x="199" y="142" width="132" height="60" rx="8"/>
<text class="th" x="265" y="162">Health APIs</text><text class="ts" x="265" y="182">Record, goal, chart</text></g>
<g class="purple"><rect x="349" y="142" width="132" height="60" rx="8"/>
<text class="th" x="415" y="162">Config API</text><text class="ts" x="415" y="182">Wizard, settings</text></g>
<g class="purple"><rect x="499" y="142" width="132" height="60" rx="8"/>
<text class="th" x="565" y="162">Data I/O</text><text class="ts" x="565" y="182">Export, import</text></g>
<line class="arr" x1="340" y1="220" x2="340" y2="250" marker-end="url(#cp-arrow)"/>
<g class="gray dashed"><rect x="40" y="252" width="600" height="302" rx="12"/>
<text class="th" x="340" y="272">Options, set by config · each row is independent</text></g>
<text class="th" x="56" y="312" style="text-anchor:start;fill:#2C2C2A">Login</text>
<text class="ts" x="56" y="330" style="text-anchor:start;fill:#5F5E5A">Both can be on</text>
<g class="teal"><rect x="190" y="295" width="205" height="52" rx="8"/>
<text class="th" x="292" y="312">Email code login</text><text class="ts" x="292" y="330">SMTP sends the code</text></g>
<text class="th" x="405" y="321" style="fill:#2C2C2A">+</text>
<g class="purple"><rect x="415" y="295" width="205" height="52" rx="8"/>
<text class="th" x="517" y="312">Passphrase or PIN</text><text class="ts" x="517" y="330">Argon2id · idle lock</text></g>
<text class="th" x="56" y="376" style="text-anchor:start;fill:#2C2C2A">Token store</text>
<text class="ts" x="56" y="394" style="text-anchor:start;fill:#5F5E5A">Pick one</text>
<g class="teal"><rect x="190" y="359" width="205" height="52" rx="8"/>
<text class="th" x="292" y="376">Upstash Redis</text><text class="ts" x="292" y="394">Codes, token ids</text></g>
<g class="purple"><rect x="415" y="359" width="205" height="52" rx="8"/>
<text class="th" x="517" y="376">Local store</text><text class="ts" x="517" y="394">On this machine, no Redis</text></g>
<text class="th" x="56" y="440" style="text-anchor:start;fill:#2C2C2A">Data storage</text>
<text class="ts" x="56" y="458" style="text-anchor:start;fill:#5F5E5A">Pick one</text>
<g class="teal"><rect x="190" y="423" width="205" height="52" rx="8"/>
<text class="th" x="292" y="440">PostgreSQL</text><text class="ts" x="292" y="458">User and health data</text></g>
<g class="purple"><rect x="415" y="423" width="205" height="52" rx="8"/>
<text class="th" x="517" y="440">SQLite + SQLCipher</text><text class="ts" x="517" y="458">Local file, encrypted</text></g>
<text class="th" x="56" y="504" style="text-anchor:start;fill:#2C2C2A">Email</text>
<text class="ts" x="56" y="522" style="text-anchor:start;fill:#5F5E5A">Every setup</text>
<g class="purple"><rect x="190" y="487" width="430" height="52" rx="8"/>
<text class="th" x="405" y="504">Verified email + SMTP</text><text class="ts" x="405" y="522">Sends codes only, never health data</text></g>
<path class="arr" d="M631 172 L662 172 L662 618 L642 618" marker-end="url(#cp-arrow)"/>
<line class="arr" x1="495" y1="590" x2="495" y2="543" marker-end="url(#cp-arrow)"/>
<g class="purple"><rect x="350" y="590" width="290" height="56" rx="8"/>
<text class="th" x="495" y="610">Email code step-up</text><text class="ts" x="495" y="628">Export, import, storage switch</text></g>
<line class="arr" x1="350" y1="618" x2="322" y2="618" marker-end="url(#cp-arrow)"/>
<g class="gray"><rect x="40" y="590" width="280" height="56" rx="8"/>
<text class="th" x="180" y="610">Data file</text><text class="ts" x="180" y="628">JSON or FHIR · the only way out</text></g>
<g class="teal"><rect x="40" y="672" width="12" height="12" rx="2"/></g>
<text class="ts" x="60" y="678" style="text-anchor:start;fill:var(--muted)">Phase 1 · built</text>
<g class="purple"><rect x="180" y="672" width="12" height="12" rx="2"/></g>
<text class="ts" x="200" y="678" style="text-anchor:start;fill:var(--muted)">Phase 2 · designed</text>
</svg>
</figure>

## Step 1 · Set up

The first-run wizard offers four presets, and the settings page can change any option later. Encrypted storage forces passphrase login, because an email code cannot derive the key. The wizard only answers on the machine itself, needs a one-time code the server prints, and closes when setup is done.

| Preset | Login | Token store | Data storage |
|---|---|---|---|
| Local vault | Passphrase | Local store | SQLite + SQLCipher |
| Cloud connected (the Phase 1 setup) | Email code | Upstash Redis | PostgreSQL |
| Hybrid | Passphrase + email code | Local store | SQLite, encryption optional |
| Advanced | Pick each | Pick each | Pick each |

## Step 2 · Sign in

With encrypted storage the service starts locked until the passphrase opens the file. Each wrong attempt waits longer.

```mermaid
sequenceDiagram
  participant U as User
  participant S as Streamlit
  participant F as FastAPI
  participant E as Encrypted file
  U->>S: Open app
  S->>F: Check status
  F-->>S: Vault locked
  U->>S: Passphrase
  S->>F: Unlock
  Note over F: Argon2id derives the key
  F->>E: Key + test read
  alt Read succeeds
    F-->>S: Unlocked, session token
  else Read fails
    F-->>S: Wrong passphrase, wait longer each time
  end
```

## Step 5 · Export, and who checks what

The check matches the risk: an email code for anything that moves data, the passphrase for credentials, an active session for low-risk switches. In an email-only setup, the passphrase tier falls back to an email code.

| Verification | Actions |
|---|---|
| Email code | Export, import, switch data storage, change email |
| Current passphrase | Change passphrase, change login methods |
| Active session | Switch token store |

Export runs like this (5 minutes, 3 tries and a 30-minute lock are proposed defaults):

```mermaid
sequenceDiagram
  participant U as User
  participant S as Streamlit
  participant F as FastAPI
  participant M as SMTP
  participant D as Storage
  U->>S: Click export
  S->>F: Request export
  F->>D: Store code, valid 5 min
  F->>M: Send code
  M-->>U: Code by email
  U->>S: Enter code
  S->>F: Verify code
  alt Code correct
    F->>D: Read records
    F-->>S: JSON or FHIR Bundle
    S-->>U: Download file
  else Wrong code, tries left
    F-->>S: Invalid, 2 tries left
  else Code expired
    F-->>S: Expired, send a new one
  else Third wrong code
    F->>D: Lock for 30 min
    F-->>S: Locked, try later
  end
```

## Building it with AI

Phase 1 was written entirely by hand, without AI assistance. From Phase 2, Claude Code is part of the development flow. I own the decisions: the three switches, which actions need which check, and what may ever leave the machine. Claude writes code against those rules, and I review every change before it is committed.
