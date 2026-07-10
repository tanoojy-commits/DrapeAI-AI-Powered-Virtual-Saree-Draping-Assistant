# Phase 1: Project Foundation

## 1. Goal

Set up the foundation for DrapeAI before writing application code. This phase defines the architecture, repository layout, and baseline project documentation.

Why this matters: a clean structure prevents confusion later. Frontend code, backend code, documentation, deployment notes, and GitHub configuration each get a clear home.

## 2. What We Are Building

In this phase we are building:

- Root project documentation
- Frontend and backend folders
- Backend clean architecture folders
- Documentation folders
- Git ignore rules
- License file
- Placeholder files so Git can track the intended structure

We are not building React or FastAPI yet. Those start in Phase 2 and Phase 3.

## 3. Folder Structure

```text
DrapeAI
├── .github
├── backend
│   └── app
│       ├── api
│       ├── config
│       ├── core
│       ├── db
│       ├── middleware
│       ├── models
│       ├── schemas
│       ├── services
│       └── utils
├── docs
│   ├── architecture
│   ├── deployment
│   └── setup
├── frontend
├── .gitignore
├── LICENSE
└── README.md
```

## 4. Required Packages

No runtime packages are required in Phase 1.

Packages will be installed later:

- Phase 2: React, Vite, TypeScript, Tailwind CSS, routing, forms, validation, animation
- Phase 3: FastAPI, Uvicorn, SQLAlchemy, Pydantic settings, security packages

## 5. Code

This phase creates documentation and structural files only.

Important files:

- `README.md`: project overview and phase roadmap
- `.gitignore`: prevents secrets, dependencies, caches, and build outputs from being committed
- `LICENSE`: MIT license
- `.gitkeep`: keeps empty architectural folders visible in Git

## 6. Explanation

The backend structure follows clean architecture principles:

- `api`: HTTP routes and request handlers
- `models`: database models
- `schemas`: request and response validation models
- `services`: business logic
- `core`: security, app settings, shared core behavior
- `middleware`: request middleware such as CORS and rate limiting
- `utils`: small reusable helpers
- `config`: environment-specific configuration helpers
- `db`: database engine, sessions, and migrations integration

The key idea is separation of concerns. Routes should stay thin. Services should hold business rules. Models should represent database tables. Schemas should validate input and output.

## 7. Testing Instructions

Run these commands from the project root:

```powershell
git status
Get-ChildItem -Recurse
```

Expected result:

- Git should recognize the project.
- The planned folders and files should exist.
- No dependencies need to be installed yet.

## 8. Common Mistakes

- Starting React and FastAPI before planning the structure.
- Committing `.env` files with secret keys.
- Placing business logic directly inside route handlers.
- Mixing frontend and backend dependencies in one folder.
- Skipping documentation until the end.

## 9. Git Commit Message

```text
chore: initialize DrapeAI project foundation
```

## 10. Next Phase Preview

Phase 2 will set up the frontend:

- Vite React TypeScript app
- Tailwind CSS
- React Router
- Base page layout
- Initial route structure

Stop here until approval. When you say "Continue", we will move to Phase 2.

