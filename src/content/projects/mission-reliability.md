---
title: "Mission Reliability Layer"
group: "Built Solo"
subgroup: "Domain Explorations"
order: 8
description: "A product concept and clickable prototype for the verification layer on top of fake-online detection: how a command center reviews, trusts and acts on alerts."
cover: mission-reliability_map.webp
thumb: mission-reliability_dashboard.jpg
tags: [physical_security, alert_triage, ux, iot, device_health, prototyping]
glance:
  - ["Role", "Sole PM & product designer"]
  - ["Period", "Jul 2026 – Present"]
  - ["Build", "AI-assisted HTML prototype"]
  - ["Status", "In progress"]
lead: "A reliability layer for mission-critical connected devices. It goes beyond asking whether a device is connected and asks whether it will work when the mission depends on it. The prototype covers what happens after the system flags a device: verification, response and audit."
why:
  title: "Why Mission Reliability?"
  body:
    - "Years of million-scale connected products taught me how complex IoT architectures get. EMT training and volunteering in a body-cam during a high-conflict recall campaign changed how I see reliability: a device that shows online while silently failing puts the person wearing it at risk."
    - "This project redirects my connected-product background toward high-stakes use, starting with body-cam fleets monitored from a command center."
callout:
  title: "Scope"
  items:
    - "Detection is assumed. The prototype runs on simulated alerts, each carrying a type, a confidence score and the evidence for and against."
    - "What I designed: the signals that should define fake online, the human verification flow and its rules, and the metrics that show when detection is degrading."
    - "I wrote no code by hand. The prototype is AI-assisted so the flow can be clicked through and tested."
challenges:
  - ["Fake online", "Body-cams can freeze, stop recording or stop syncing while still reporting a healthy state, so uptime monitoring misses them. I defined the signal patterns detection should look for, such as a healthy heartbeat with zero upload bytes, or a frozen frame counter."]
  - ["Alert trust", "Operators have to verify every detection without rubber-stamping ambiguous alerts just to clear the queue."]
  - ["Accuracy vs. speed", "Simulation showed auto-detection slipping from 90% to 85% raises the manual-catch share from 10% to 15% and costs about 67% of projected revenue, while slower detection costs far less."]
decisions:
  - ["Three explicit outcomes", "Every alert ends as Confirmed, Unresolved or False alarm, each with a written note. There is no one-click pass."]
  - ["Unresolved is not closed", "It needs a re-check time and returns to the queue when due."]
  - ["Guard against fatigue", "Clearing a high-confidence detection needs a second-source check, and several fast false alarms in a row trigger a warning."]
  - ["Manual-catch as the key metric", "The share of failures first caught by a human shows when silent failures slip past the system or past review."]
phases:
  - ["Discovery", ["Framed the fake-online problem and two users: command center crew and field personnel", "Defined the loop: detect, verify, respond, audit"]]
  - ["Simulation", ["Modeled detection time, fake-online rate and trust against conversion and revenue", "Found accuracy matters more than speed"]]
  - ["Prototype v2.0", ["Group dashboard ranked by risk", "Group detail with device table, map and manual anomaly reports"]]
  - ["In progress", ["Verification queue with reliability metrics and decision log", "Next: response actions and mission history"]]
links:
  - { label: "Live prototype", url: "https://maudes.github.io/mission-reliability-project/" }
  - { label: "GitHub", url: "https://github.com/maudes/mission-reliability-project" }
  - { label: "Slides", url: "https://docs.google.com/presentation/d/1OGXcHpSyM5nTwTitZ5yXQvQ0uoZkcpfTF5sR_sCxuRk/edit?usp=sharing" }
linkNote: "Work in progress. The verification queue is not yet published to the live prototype."
---

## How it works

Each layer and how they hand off. The dashed layer is assumed: the prototype feeds it simulated alerts. Everything inside **Command center** is what I designed.

```mermaid
flowchart TB
    subgraph L1["In the field"]
        S["Body-cam signals<br/>heartbeat · recording · upload · battery"]
        F["Field crew<br/>sees a problem"]
    end
    subgraph L2["Detection · assumed"]
        D["Flags fake online, frozen recording, sync gaps<br/>alert = type + confidence + evidence"]
    end
    subgraph L3["Command center"]
        DB["Dashboard<br/>groups ranked by risk"] --> GD["Group detail<br/>devices, map, signal history"]
        GD --> VQ["Verification queue<br/>Confirmed · Unresolved · False alarm<br/>Unresolved returns at re-check time"]
        VQ -- Confirmed --> R["Response action<br/>swap device, force sync, escalate"]
    end
    subgraph L4["Audit & metrics"]
        A["Decision log<br/>auto-detection rate · manual-catch fraction"]
    end
    S --> D --> DB
    F -- "manual report,<br/>bypasses detection" --> VQ
    R --> A
    VQ -- "False alarm" --> A
    A -. "manual-catch rising =<br/>detection degrading" .-> D
    style L2 stroke-dasharray: 6 4
```
