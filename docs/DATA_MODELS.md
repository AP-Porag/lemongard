# LemonGard – Data Models

_Last Updated: 2026-03-08_

This document describes the database schema and model responsibilities for Phase 1.

---

# 1. users

Purpose:
Authentication, roles, and subscription lifecycle.

Table: users

- id (PK)
- name
- email (unique)
- email_verified_at
- password
- role (admin, user)
- subscription_tier (view_only, full_access)
- subscription_status (trial, active, expired, cancelled)
- trial_ends_at
- stripe_customer_id
- remember_token
- created_at
- updated_at

Service Responsible:
UserService

---

# 2. records

Purpose:
Core shared CRM dataset.

Table: records

- id (PK)
- user_id (FK → users.id)
- industry
- first_name
- last_name
- phone_cell
- phone_home
- street
- city
- state
- zip
- service
- price
- incident_report
- notes
- created_at
- updated_at

Indexes:

- last_name
- phone_cell
- city
- service
- user_id

Service Responsible:
RecordService

---

# 3. subscriptions

Managed by Laravel Cashier.

Fields include:

- user_id
- stripe_id
- stripe_status
- stripe_price
- quantity
- trial_ends_at
- ends_at

Service Responsible:
SubscriptionService (future)

---

# 4. subscription_items

Managed by Laravel Cashier.

Fields include:

- subscription_id
- stripe_price
- quantity

---

# 5. password_reset_tokens

Laravel Fortify default table.

---

# 6. sessions

Used when database session driver is enabled.

---

# RELATIONSHIP EXPLANATION (IMPORTANT)

One User → Many Records

One Record → Belongs to One User

One User → One Active Subscription

One Subscription → Many Subscription Items

All Users → Can View All Records

Only Record Owner → Can Edit/Delete That Record

Admin → Can Modify All Records

Subscription Status → Belongs To User

---

# SERVICE ARCHITECTURE RELATIONSHIP

UserService → handles users table logic

RecordService → handles records table logic

SubscriptionService → handles subscription lifecycle

Controllers must call services for all data operations.

---

_End of DATA_MODELS.md_
