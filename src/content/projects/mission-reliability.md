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

From device signal to audit record. The dashed box is assumed: the prototype feeds it simulated alerts. Everything inside **Command center** is what I designed.

<figure class="arch">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 516" role="img" aria-labelledby="mr-arch-t mr-arch-d">
<title id="mr-arch-t">Mission Reliability flow</title>
<desc id="mr-arch-d">Body-cam signals feed an assumed detection layer, which sends alerts with type, confidence and evidence to the command center. There, the dashboard ranks groups, group detail shows devices, and every alert goes to human verification. Field crew can file a manual report that skips detection and goes straight to verification. Verification has three outcomes: False alarm is logged with a note, Unresolved returns to verification at its re-check time, and Confirmed triggers a response such as swapping or resyncing the device. False alarms and responses go to the decision log and metrics. A rising manual-catch fraction there signals that detection is degrading.</desc>
<defs><marker id="mr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M2 1L8 5L2 9" fill="none" class="arr-head" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<g class="gray"><rect x="60" y="20" width="200" height="52" rx="8"/>
<text class="th" x="160" y="38">Body-cam signals</text>
<text class="ts" x="160" y="56">heartbeat · recording · upload</text></g>
<g class="gray"><rect x="456" y="20" width="164" height="52" rx="8"/>
<text class="th" x="538" y="38">Field crew</text>
<text class="ts" x="538" y="56">sees a problem</text></g>
<line class="arr" x1="160" y1="72" x2="160" y2="98" marker-end="url(#mr-arrow)"/>
<g class="gray dashed"><rect x="60" y="100" width="200" height="56" rx="8"/>
<text class="th" x="160" y="118">Detection · assumed</text>
<text class="ts" x="160" y="138">type · confidence · evidence</text></g>
<g class="zone"><rect x="40" y="180" width="600" height="226" rx="12"/>
<text class="th" x="340" y="198">Command center · my scope</text></g>
<line class="arr" x1="160" y1="156" x2="160" y2="212" marker-end="url(#mr-arrow)"/>
<text class="lbl start" x="168" y="170">alert</text>
<line class="arr" x1="538" y1="72" x2="538" y2="212" marker-end="url(#mr-arrow)"/>
<text class="lbl start" x="546" y="122">manual report,</text>
<text class="lbl start" x="546" y="138">skips detection</text>
<g class="purple"><rect x="60" y="214" width="170" height="56" rx="8"/>
<text class="th" x="145" y="232">Dashboard</text>
<text class="ts" x="145" y="252">groups ranked by risk</text></g>
<line class="arr" x1="230" y1="242" x2="256" y2="242" marker-end="url(#mr-arrow)"/>
<g class="purple"><rect x="258" y="214" width="170" height="56" rx="8"/>
<text class="th" x="343" y="232">Group detail</text>
<text class="ts" x="343" y="252">devices · map · signals</text></g>
<line class="arr" x1="428" y1="236" x2="454" y2="236" marker-end="url(#mr-arrow)"/>
<g class="amber"><rect x="456" y="214" width="164" height="56" rx="8"/>
<text class="th" x="538" y="232">Verify</text>
<text class="ts" x="538" y="252">human review + note</text></g>
<path class="arr" d="M538 270V294H145V328" marker-end="url(#mr-arrow)"/>
<line class="arr" x1="343" y1="294" x2="343" y2="328" marker-end="url(#mr-arrow)"/>
<line class="arr" x1="538" y1="294" x2="538" y2="328" marker-end="url(#mr-arrow)"/>
<g class="gray"><rect x="60" y="330" width="170" height="56" rx="8"/>
<text class="th" x="145" y="348">False alarm</text>
<text class="ts" x="145" y="368">logged with a note</text></g>
<g class="amber"><rect x="258" y="330" width="170" height="56" rx="8"/>
<text class="th" x="343" y="348">Unresolved</text>
<text class="ts" x="343" y="368">re-check at a set time</text></g>
<path class="arr dash" d="M428 358H442V260H454" marker-end="url(#mr-arrow)"/>
<text class="lbl start" x="448" y="314">when due</text>
<g class="teal"><rect x="456" y="330" width="164" height="56" rx="8"/>
<text class="th" x="538" y="348">Confirmed</text>
<text class="ts" x="538" y="368">swap · resync · escalate</text></g>
<line class="arr" x1="145" y1="386" x2="145" y2="438" marker-end="url(#mr-arrow)"/>
<line class="arr" x1="538" y1="386" x2="538" y2="438" marker-end="url(#mr-arrow)"/>
<g class="gray"><rect x="60" y="440" width="560" height="56" rx="8"/>
<text class="th" x="340" y="458">Decision log &amp; metrics</text>
<text class="ts" x="340" y="478">auto-detection rate · manual-catch fraction · detection time</text></g>
<path class="arr dash" d="M60 468H26V128H58" marker-end="url(#mr-arrow)"/>
<text class="lbl" x="16" y="300" transform="rotate(-90 16 300)">manual-catch rising = detection degrading</text>
</svg>
</figure>
