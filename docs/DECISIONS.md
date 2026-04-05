# LemonGard – Architectural Decisions

_Last Updated: 2026-03-08_

This document records key architectural and technical decisions for the LemonGard platform.

---

# 1. Framework Discipline

Backend
- Laravel: ^12.0
- PHP: 8.2+

Frontend
- React: ^19
- TypeScript: ^5
- Vite: ^7
- TailwindCSS: ^4
- shadcn/ui: New York style

These versions must not be downgraded without documenting the change here.

---

# 2. Service Layer Architecture (Core Rule)

The project follows a **service‑layer architecture**.

Rules:

1. Controllers must remain thin.
2. Controllers must call Services for business logic.
3. Services must extend `BaseService`.
4. Controllers must not contain business logic.

Flow:

Controller → Service → Model

This ensures:
- clean separation of concerns
- easier testing
- reusable logic
- maintainable SaaS architecture

---

# 3. BaseService Pattern

Location:

app/Services/BaseService.php

Purpose:

Provide shared CRUD logic for all services.

Common methods:

- all()
- paginate()
- find()
- create()
- update()
- delete()
- exists()
- updateOrCreate()

All services must extend BaseService.

Example:

app/Services/Record/RecordService.php

---

# 4. Service Folder Convention

Services must follow this pattern:

app/Services/

├── BaseService.php
├── User/
│   └── UserService.php
├── Record/
│   └── RecordService.php

Naming rule:

ModelNameService

Examples:

- UserService
- RecordService
- SubscriptionService

---

# 5. Route Architecture

Routes are separated by responsibility:

Public:
/
/login
/register

Subscriber:
/app/*

Admin:
/admin/*

Middleware:

- auth
- verified
- role

---

# 6. Ownership Enforcement

Records follow strict ownership rules:

- Users can modify only their own records.
- Admin can modify all records.

This rule must never be bypassed.

---

# 7. Subscription Handling

Billing handled using:

Laravel Cashier + Stripe

Subscription lifecycle:

trial → active → expired → cancelled

Access enforcement handled by middleware.

---

# 8. Documentation Discipline

The following files must stay synchronized:

- PROJECT_OVERVIEW.md
- DATA_MODELS.md
- ARCHITECTURE.md
- DECISIONS.md
- CONTEXT.md

Architecture changes must be recorded here.

---

_End of DECISIONS.md_
