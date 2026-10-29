---
title: "WiZ Local Control Test"
group: "Hands-on Builds"
order: 3
description: "A Python CLI that validates WiZ local (UDP) control, built to unblock partners and regional sales demos."
cover: wiz_smart_lighting.webp
thumb: wiz_smart_lighting.webp
tags: [iot, python, streamlit, automation_test, cli_tool, pytest]
glance:
  - ["Role", "Solo developer & product owner"]
  - ["Period", "Mar 2024 – Aug 2025"]
  - ["Stack", "Python, pytest, Streamlit"]
  - ["Status", "Open source"]
lead: "A lightweight, cloud-free CLI for testing WiZ local control over UDP. Engineering resources were tied up, so I built it myself to unblock partners and sales."
why:
  title: "Why the tool?"
  body:
    - "External API partners were stalled in PoC with no local testing environment, while regional sales, especially EU retail, were losing momentum without a demo tool that could survive poor in-store networks."
    - "Stepping in as a solo developer was the fastest way to validate the protocol for partners and give high-stakes deployments an immediate stopgap, including hundreds of showrooms in China and roadshows in the US."
callout:
  title: "The trade-off"
  body: "Regional requests leaned toward a feature-rich hardware config board, but it was slow to build and ill-suited to unstable retail networks. I chose a software-only design that reused existing factory tools. That secured the EU pipeline and scaled to US roadshows and Chinese showrooms at zero extra development cost."
challenges:
  - ["Tooling gap for local testing", "Built a lightweight, cloud-independent utility to validate local control commands during PoC and partner integration."]
  - ["Protocol complexity", "Abstracted device types and command flows to simplify UDP-based testing."]
  - ["Maintainability", "Refactored into a modular architecture after leaving, for broader use and long-term maintenance."]
contributions:
  - ["End-to-end development", "CLI with UDP communication, a test runner and device-type abstraction."]
  - ["Test-driven", "pytest-based automated tests for reliable command execution."]
  - ["Modular architecture", "Reusable modules for new device types and test scenarios."]
  - ["Documentation", "Usage examples and a README for internal and external adopters."]
  - ["Clear boundaries", "Deliberately left out OTA updates, reusing WiZ’s factory OTA module instead."]
phases:
  - ["Initiation", ["Identified the lack of local testing tools", "Proposed a Python CLI solution"]]
  - ["Planning", ["Designed core modules: UDP, runner, type abstraction", "Prioritized key features"]]
  - ["Development & Testing", ["Built iteratively with pytest", "Validated packet construction and device responses"]]
  - ["Release & Deployment", ["Published with documentation", "Refactored for modularity after leaving WiZ"]]
  - ["Iteration & Impact", ["Refined based on usage", "Improved adaptability for PoC and QA environments"]]
structure: |
  wiz-light-local-test-script
  ├── modules/            # UDP communication, test runner, device abstraction
  │   ├── communication.py
  │   ├── runner.py
  │   └── type_data.py    # test cases per device type
  ├── pytest/
  │   └── tests/          # conftest.py, test_basic.py
  ├── simple_scripts/
  ├── cli.py              # CLI entry point
  ├── app.py              # optional Streamlit GUI
  └── README.md
links:
  - { label: "GitHub", url: "https://github.com/maudes/wiz-light-local-test-script" }
gallery:
  - { img: wiz_local_ui.webp, caption: "Optional Streamlit UI", tag: "#streamlit" }
---
