---
title: "CarePilot"
group: "Hands-on Builds"
order: 4
description: "A local-first personal health tracker and backend sandbox exploring FastAPI and the HL7 FHIR standard."
cover: CarePilot_dashboard.png
thumb: CarePilot_cover.png
tags: [python, streamlit, fastapi, sqlalchemy, pytest]
glance:
  - ["Role", "Sole developer & PM"]
  - ["Period", "Jun 2025 – Dec 2025"]
  - ["Stack", "FastAPI, PostgreSQL, Streamlit"]
  - ["Approach", "Local-first, FHIR-ready"]
lead: "A personal health dashboard and technical sandbox at the intersection of backend architecture and HL7 FHIR, structuring data for future medical interoperability."
why:
  title: "Why CarePilot?"
  body:
    - "In 2025 I earned my EMT-1 certification in Taiwan and saw first-hand how fragmented health information hinders critical care. That led me to the OHDSI community and the Civic Tech Taiwan competition (MODA × Taoyuan City Gov’t, 2025), where my team was a Finalist."
    - "The competition exposed the systemic obstacles in medical data exchange. CarePilot is my attempt to tackle the problem from the individual’s perspective."
callout:
  title: "Local-first strategy"
  body: "A self-hosted, lightweight dashboard in the spirit of Home Assistant. It prioritizes data sovereignty, filling the gap between convenient tracking and real privacy, so sensitive metrics stay under the user’s control."
stack:
  - ["Backend", "FastAPI, SQLAlchemy, Pydantic, Redis, SMTP"]
  - ["Frontend", "Streamlit"]
  - ["Database", "PostgreSQL + Alembic"]
  - ["Analytics", "pandas (matplotlib)"]
  - ["DevOps", "Docker, multi-env configuration"]
  - ["Testing", "Pytest"]
challenges:
  - ["Health data modeling", "A scalable FastAPI backend with SQLAlchemy and Pydantic validation, with planned FHIR conversion."]
  - ["Authentication & security", "JWT and OTP authentication with multi-environment support and Redis-backed sessions."]
  - ["Scalability & maintainability", "Modular backend with Alembic migrations and Dockerized environments."]
  - ["Testing & reliability", "pytest unit tests and validation of core modules."]
phases:
  - ["Initiation", ["Defined scope: health tracking, authentication, backend sandbox", "Outlined core features and architecture goals"]]
  - ["Planning", ["Selected FastAPI, PostgreSQL, Streamlit", "Designed a modular backend and multi-env setup"]]
  - ["Development & Testing", ["Built CRUD, auth and goal tracking", "Added pytest unit tests"]]
  - ["Release & Deployment", ["Dockerized for local and cloud deployment", "Published documentation and usage examples"]]
  - ["Iteration & Impact", ["Planned FHIR integration and MQTT support", "Refined based on usage and architecture goals"]]
structure: |
  carepilot-dashboard/
  ├── backend/              # FastAPI backend
  │   ├── alembic/          # migration scripts
  │   ├── config/           # settings
  │   ├── models/           # ORM models
  │   ├── routers/          # API routes
  │   ├── schemas/          # Pydantic schemas
  │   ├── services/         # business logic
  │   ├── db.py
  │   └── main.py           # entry point
  ├── dashboard/            # Streamlit frontend
  ├── tests/
  ├── docker-compose.yml
  └── pyproject.toml
repo:
  label: "CarePilot Dashboard"
  url: "https://github.com/maudes/carepilot-dashboard"
video: "https://www.youtube.com/embed/vUQTXPYX7bw"
---
