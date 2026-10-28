---
title: "CarePilot"
group: "Hands-on Builds"
order: 4
description: "A local-first personal health tracker and backend sandbox exploring FastAPI and the HL7 FHIR standard."
cover: CarePilot_dashboard.png
thumb: CarePilot_cover.png
tags: [python, streamlit, fastapi, sqlalchemy, pytest]
---
## Project Overview  

> CarePilot — Personal Health Tracker & Backend Sandbox

In 2025, I earned my Emergency Medical Technician (EMT-1) certification in Taiwan. On the frontline, I witnessed first-hand how fragmented health information can hinder critical care. This experience sparked my interest in MedTech, leading me to join the OHDSI community and compete in the Civic Tech Taiwan competition (MODA × Taoyuan City Gov't; 2025), where my team was honored as a Finalist.

> "Bridging the gap between the ambulance frontline and personal health data standards."

While the competition exposed the systemic obstacles in medical data exchange, it also inspired me to tackle the problem from the individual's perspective. I developed CarePilot — a personal health tracking dashboard — as a functional extension of these insights.

CarePilot is more than just a tracking app; it is a **technical sandbox** where I explore the intersection of backend architecture and the **HL7 FHIR** standard. As the sole developer and PM, I focused on building a system that doesn't just record numbers, but structures them for future medical interoperability.

---

## Role & Scope  
I led the full lifecycle from architecture to deployment, validating backend patterns and FHIR interoperability.

My core strategy was a "Local-first" philosophy. By building a self-hosted, lightweight dashboard similar to Home Assistant, CarePilot prioritizes Data Sovereignty. This addresses the market gap between convenient tracking and absolute data privacy, ensuring sensitive metrics remain under the user's direct control.

---

### Tech Stack  

| Category     | Technologies Used                                      |
|--------------|--------------------------------------------------------|
| **Backend**  | FastAPI, SQLAlchemy, Pydantic, Redis, SMTP             |
| **Frontend** | Streamlit                                              |
| **Database** | PostgreSQL + Alembic                                   |
| **Data Analytics** | pandas (matplotlib)                              |
| **DevOps**   | Docker, multi-env configuration                        |
| **Testing**  | Pytest                                                 |

---

## Key Challenges & Solutions  

- **Health Data Modeling & Interoperability**：Designed a scalable FastAPI backend with SQLAlchemy ORM and Pydantic schema validation, with planned support for FHIR conversion  
- **Authentication & Security**：Implemented JWT and OTP-based authentication with multi-environment support, Redis-backed session management for secure access  
- **Scalability & Maintainability**：Built a modular backend architecture with Alembic migrations and Dockerized environments for long-term extensibility  
- **Testing & Reliability**：Used pytest for unit testing and validation of core modules

---

## Software Development Lifecycle  

| Phase                   | Key Activities                                                                 |
|-------------------------|--------------------------------------------------------------------------------|
| **Initiation**          | • Defined scope: health tracking, authentication, backend sandbox<br>• Outlined core features and architecture goals |
| **Planning**            | • Selected tech stack: FastAPI, PostgreSQL, Streamlit<br>• Designed modular backend and multi-env setup |
| **Development & Testing** | • Built core modules: CRUD, auth, goal tracking<br>• Implemented pytest-based unit tests |
| **Release & Deployment** | • Dockerized app for local and cloud deployment<br>• Published documentation and usage examples |
| **Iteration & Impact**   | • Planned FHIR integration and MQTT support<br>• Continued refinement based on usage and architectural goals |

---

## Project Structure
The tool follows a modular architecture for maintainability and extensibility:

```
carepilot-dashboard/
├── backend/                      # FastAPI backend
│   ├── alembic/                  # Alembic migration scripts
│   │   ├── versions/
│   │   ├── env.py
│   │   ├── script.py.mako
│   ├── config/                   # Configuration settings
│   │   └── settings.py
│   ├── models/                   # ORM models
│   │   ├── user.py
│   │   └── umixin.py
│   ├── routers/                  # API route definitions
│   ├── schemas/                  # Pydantic schemas
│   │   ├── dailylog.py
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── goal.py
│   │   └── vitalsign.py
│   ├── services/                 # Business logic
│   ├── alembic.ini
│   ├── db.py                     # DB session and engine setup
│   └── main.py                   # FastAPI entry point
├── dashboard/                    # Frontend dashboard
├── tests/                        # Backend test cases
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
├── docker-compose.yml            # Docker orchestration
├── pyproject.toml                # Python project configuration
├── pytest.ini                    # Pytest configuration
└── uv.lock                       # Dependency lock file

```

**GitHub Repository**: [CarePilot Dashboard](https://github.com/maudes/carepilot-dashboard)

---

## Demo Video

<div class="video-container"><iframe width="100%" height="400" src="https://www.youtube.com/embed/vUQTXPYX7bw" frameborder="0" allowfullscreen></iframe></div>
