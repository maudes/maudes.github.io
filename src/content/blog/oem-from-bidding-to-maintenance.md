---
title: 'OEM Projects: From Bidding to Maintenance'
date: 2026-11-01
categories:
  - Field Notes
  - CPE
draft: true
---
I've spent almost a year handling CPE bids from start to finish. Here's a quick overview of how an OEM project runs, from the first RFQ to the last patch.

<!-- more -->

***Keywords: #OEM #RFQ #NPI #EVT #DVT #PVT***

## The Flow at a Glance

The flow has four phases, three gates and one key milestone. Each column shows who owns the step: the OEM, the client, or the chip vendor and other third parties.

<figure>
  <a href="/assets/oem-flow-overview.webp" target="_blank"><img src="/assets/oem-flow-overview.webp" alt="OEM project flow from tender to warranty, in four phases across three swimlanes: OEM, client, and chip vendor / third parties" /></a>
  <figcaption>The full flow. Click to open at full size.</figcaption>
</figure>

## The Three Gates & One Key Milestone

| Checkpoint | Decision | Unlocks | If failed |
|---|---|---|---|
| **Gate 1** | Awarded, at least as 2nd source? | The business case | Lose the business |
| **Gate 2** | Contracts signed? | Resources and onboarding kick-off | No resources or budget |
| **Gate 3** | Schedule agreed? | Full-speed development toward delivery | Client's launch and our resources at risk |
| **The Milestone** | MP / TA | Project closes with minimal maintenance; the team moves to new projects | Client's launch at risk, plus penalties |


## Phase 1 · Tender & RFQ/RFP

<figure>
  <a href="/assets/oem-flow-phase-1.webp" target="_blank"><img src="/assets/oem-flow-phase-1.webp" alt="Phase 1: tender call, internal feasibility, RFQ iterations, and Gate 1: awarded, at least as the 2nd source" /></a>
</figure>

The client sends out the RFQ with its requirements and specs. We review them and reply with questions and proposed solutions. The client then reviews our answers and sends follow-ups. This goes back and forth for a few rounds.

Most of the talking happens between the two sales teams. Our sales team passes the HW and SW details to the internal team. Hardware usually leads at this stage: the HW PLM or PM drives the review and gets quotes from the chip vendor. On the software side, the focus is on the specs and whether we need any third-party service providers.

**Watch out for major gaps.** Any gap in features or pricing needs to be cleared up now, not after the award.

## Phase 2 · Award & Contracting

<figure>
  <a href="/assets/oem-flow-phase-2.webp" target="_blank"><img src="/assets/oem-flow-phase-2.webp" alt="Phase 2: award notice, commercial lock, reference design locked, and Gate 2 contracts signed" /></a>
</figure>

If the client picks us, we lock in the business here with a formal contract and PO. This step is mainly between the two sales teams.

> **Point of no return.** Once the contract is signed, there's basically no turning back. Every scope change after this costs money and time.

## Phase 3 · Technical Readiness & Launch

<figure>
  <a href="/assets/oem-flow-phase-3.webp" target="_blank"><img src="/assets/oem-flow-phase-3.webp" alt="Phase 3: architecture and onboarding, kickoff and bring-up, master schedule, Gate 3, HW and SW validation, certification in parallel, client UAT, and MP" /></a>
</figure>

This is where development really starts. Early on, most of the talking is with the chip vendor: getting dev boards, trying the first bring-up, and sorting out development details and the support we need. In the middle and later stages, we meet the client more often to align on specs and run acceptance on the hardware, the software, and other items such as packaging design.

The main players are the development teams on both sides. On the client side, the quality team usually leads. Certification runs in parallel, and we work through it mainly with the chip vendor and the test labs.

**Watch out for two things.** First, make sure the features we deliver match what was promised. Second, expect schedule issues. For example, some raw material prices have shot up recently, and everyone is struggling to secure parts. How do we tell the client? How does it affect the delivery date? Does the contract call for penalties, or can we ask the client to cover the price difference? All of this needs careful checking and negotiation.

## Phase 4 · Warranty & Maintenance

<figure>
  <a href="/assets/oem-flow-phase-4.webp" target="_blank"><img src="/assets/oem-flow-phase-4.webp" alt="Phase 4: a repeating loop of dev or bug fix, internal test, client test and sign-off, and release, backed by vendor SLA support" /></a>
</figure>

By now, the base software has been delivered and the product is in mass production. What follows is maintenance, plus minor features delivered over OTA.

Our FAE team works with the client's QA team.

**Watch out for resources.** The support period is part of the deal, so we need enough people to keep maintenance going while the team moves on to new projects. And if the client asks for a new major feature, talk to them about whether it's an extra charge. OEM work runs much like NRE: new development is usually paid for separately.



## In Short

- **Each gate is a promise.** Once you pass it, you have to deliver on it.
- **The point of no return comes early.** It's not MP. It's Phase 2, when the PO is placed and long-lead parts are ordered.
- **Hardware and software ship together.** The two tracks move side by side, with certification running in parallel.
- **MP isn't the end.** The support period in the RFQ (e.g. 2 years) keeps the team in a maintenance loop, so plan for it from day one.

### From In-House to OEM

This was the biggest shift for me.

As an in-house PM, I planned software around the whole product line. Unless a feature was built for one specific product, hardware and software ran on separate tracks. When new hardware came in, we mostly ran validation to make sure the firmware already in production worked on it. Vice versa, after each new software release, we validated its features across the affected product portfolio.

I also used to plan many iterations toward the "end game" of the software's features and performance. OEM work is different. The goal is a solid MVP+: the device runs without major issues, and both our base software and the client's own app-layer updates run smoothly on top of it.
