# LemonGard -- Project Overview

*Last Updated: 2026-03-01*

------------------------------------------------------------------------

## 1. Project Identity

**Project Name:** LemonGard.com\
**Type:** Subscription-Based CRM & Shared Data Platform\
**Target Audience:** Service Industry Professionals\
**Architecture Type:** Full Backend-Driven SaaS (Not Plugin-Based)

This project is based on the agreed proposal and requirements
documentation.

------------------------------------------------------------------------

## 2. Core Product Vision

LemonGard is a subscription-based CRM and shared data access platform
designed to allow service-industry professionals to:

-   Access a shared structured dataset
-   Add their own records
-   Edit/delete only records they personally created
-   Search and filter across all system data
-   Operate within a strictly enforced subscription lifecycle

The system is intentionally designed as a full custom application to
ensure:

-   Clean permission handling
-   Strict ownership enforcement
-   Scalable database growth
-   Subscription reliability
-   Long-term maintainability

------------------------------------------------------------------------

## 3. Business Model

### Subscription Tiers

**Tier 1 -- View Only (\$14.99/month)** - View and search shared data -
No create/edit/delete permissions

**Tier 2 -- Full Access (\$19.99/month)** - View all records - Add new
records - Edit/Delete only own records

### Trial Model

-   30-day free trial
-   Automatic subscription enforcement after trial
-   Immediate access revocation upon expiration

Payments handled via Stripe (monthly recurring billing).

------------------------------------------------------------------------

## 4. Core System Principles

1.  Shared Visibility -- All subscribers can view all records.
2.  Ownership Enforcement -- Users may only modify/delete their own
    records.
3.  Subscription Enforcement -- Access strictly tied to active
    subscription status.
4.  Role Separation -- Clear separation between Admin and App
    (Subscriber) areas.
5.  Scalability First -- Database indexing and architecture designed for
    growth.
6.  Clean Business Logic -- Service-layer driven architecture.

------------------------------------------------------------------------

## 5. Role Structure

-   **Admin**
    -   Full user management
    -   Full record management
    -   Reporting and oversight
-   **User (Subscriber)**
    -   Access based on subscription tier
    -   Ownership-limited editing
    -   Search and filtering

Routes Structure: - `/` → Public website - `/app/*` → Subscriber
dashboard - `/admin/*` → Admin dashboard

------------------------------------------------------------------------

## 6. Technology Stack

### Backend

-   Laravel 12
-   Service-based architecture
-   Policy-based ownership enforcement
-   Custom middleware for role & subscription enforcement

### Frontend

-   React.js with Inertia.js
-   TailwindCSS
-   shadcn/ui
-   Clean separation of Public, App, and Admin layouts

### Database

-   MySQL
-   Structured relational design
-   Indexed searchable fields

### Payments

-   Stripe (via Laravel Cashier)
-   Trial → Active → Expired lifecycle

------------------------------------------------------------------------

## 7. Data Model Philosophy

Core entity types:

-   Users
-   Records
-   Subscriptions (Stripe managed)
-   Administrative oversight

All schema design decisions will be documented in DATA_MODELS.md.

------------------------------------------------------------------------

## 8. Public Website Scope

The public website includes:

-   Home
-   How It Works
-   About Us
-   Pricing
-   Login
-   Register
-   Privacy Policy
-   Terms & Conditions
-   Cookie Policy

Designed to be: - Fully responsive - SEO-friendly - Professional and
trust-focused

Primary branding colors: - Yellow - Deep Navy Blue

------------------------------------------------------------------------

## 9. Architectural Decisions

-   No plugin-based system (fully custom build)
-   No dynamic database field creation in Phase 1
-   No CMS integration in Phase 1
-   No AI features in Phase 1
-   Role-based access via simple role column (no Spatie in Phase 1)
-   `/app` prefix used instead of `/subscriber`

All technical decisions will be tracked in DECISIONS.md.

------------------------------------------------------------------------

## 10. Non-Goals (Phase 1)

-   Blog system
-   CMS-based content editing
-   AI analytics
-   Third-party scraping
-   Multi-tenant organization accounts

------------------------------------------------------------------------

## 11. Long-Term Vision

Future expansion may include:

-   Mobile application (React Native)
-   Advanced reporting & exports
-   Organization/team accounts
-   AI-assisted duplicate detection
-   Infrastructure scaling (Redis, queues, load balancing)

------------------------------------------------------------------------

## 12. Project Objective Summary

This project is designed to:

-   Deliver a stable, scalable SaaS foundation
-   Enforce strict data ownership rules
-   Provide reliable subscription control
-   Enable long-term growth without architectural refactoring
-   Maintain clean separation of concerns across system layers

------------------------------------------------------------------------

*End of PROJECT_OVERVIEW.md*
