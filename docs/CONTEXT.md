# LemonGard -- Product & Business Context

*Last Updated: 2026-03-01*

This document explains the *why* behind LemonGard.\
It provides business reasoning, strategic context, and product
philosophy to ensure that technical decisions always align with product
goals.

------------------------------------------------------------------------

# 1. Core Problem Being Solved

Service-industry professionals often:

-   Operate independently
-   Maintain private, fragmented data
-   Duplicate work across systems
-   Lack structured CRM tools tailored to their workflow

There is no centralized, shared platform that:

-   Allows cross-user data visibility
-   Maintains strict ownership rules
-   Enforces structured data standards
-   Provides predictable subscription-based access

LemonGard solves this by offering a structured shared CRM environment
with enforced ownership control.

------------------------------------------------------------------------

# 2. Why Shared Data?

Unlike traditional CRMs that isolate user data, LemonGard uses:

**Shared Visibility Model**

All subscribers can view the entire dataset, but:

-   Users can only modify/delete records they created
-   Admin retains full oversight

### Business Reasoning

-   Encourages collaborative ecosystem
-   Prevents data silos
-   Increases platform value as database grows
-   Creates network effect over time

------------------------------------------------------------------------

# 3. Why Strict Ownership Enforcement?

Without ownership rules:

-   Data integrity collapses
-   Trust erodes
-   Platform becomes chaotic

Ownership enforcement ensures:

-   Clear responsibility
-   Legal safety
-   Predictable audit trails
-   Controlled modification rights

This is a core architectural principle, not a feature.

------------------------------------------------------------------------

# 4. Why Subscription-Based?

The platform follows a SaaS model with:

-   30-day free trial
-   Monthly recurring billing
-   Tiered feature access

### Strategic Goals

-   Recurring revenue
-   Predictable cash flow
-   Long-term sustainability
-   Continuous feature expansion funding

------------------------------------------------------------------------

# 5. Why Two Subscription Tiers?

Tier 1 -- View Only\
Tier 2 -- Full Access

This structure:

-   Lowers entry barrier
-   Encourages upgrade path
-   Allows data growth even from view-only users
-   Simplifies permission logic in Phase 1

------------------------------------------------------------------------

# 6. Why Custom Build (Not CMS)?

LemonGard is intentionally built as a fully custom Laravel application.

Reasons:

-   Fine-grained permission control
-   Clean service-layer logic
-   Scalable relational schema
-   Long-term extensibility
-   Performance predictability

------------------------------------------------------------------------

# 7. Why /app and /admin Separation?

Clear route separation:

-   `/` → Public marketing site
-   `/app` → Subscriber system
-   `/admin` → Administrative control

This prevents:

-   UI mixing
-   Access confusion
-   Routing conflicts
-   Permission overlap

------------------------------------------------------------------------

# 8. Long-Term Product Vision

Phase 1 focuses on stability and core subscription logic.

Future roadmap may include:

-   Mobile application (React Native)
-   Advanced reporting and analytics
-   Organization/team-based accounts
-   AI-assisted duplicate detection
-   Performance scaling infrastructure

The system is intentionally structured to grow without architectural
refactoring.

------------------------------------------------------------------------

# 9. Design Philosophy

Brand Identity: - Yellow + Deep Navy Blue - Professional, trustworthy,
structured

UX Philosophy: - Clean - Predictable - Minimal distractions -
Business-focused

No unnecessary animations or visual gimmicks inside dashboard.

------------------------------------------------------------------------

# 10. Non-Goals for Phase 1

To protect launch stability, Phase 1 excludes:

-   CMS blog system
-   User-generated schema modifications
-   Marketplace integrations
-   Complex team permissions
-   AI-driven automation

Focus remains on:

-   Stability
-   Subscription reliability
-   Data ownership enforcement

------------------------------------------------------------------------

# 11. Guiding Principles for Development

When making technical decisions, prioritize:

1.  Stability over speed
2.  Clarity over cleverness
3.  Structure over flexibility
4.  Long-term scalability over short-term hacks
5.  Clean separation of concerns

If a feature risks destabilizing ownership enforcement or subscription
reliability, it should be deferred.

------------------------------------------------------------------------

# 12. Strategic Outcome Goal

LemonGard aims to become:

-   A trusted shared CRM ecosystem
-   A recurring revenue SaaS business
-   A scalable, performance-driven data platform
-   A long-term sustainable product

All architecture, schema design, and code patterns must align with this
goal.

------------------------------------------------------------------------# 12. Strategic Outcome Goal

# 13. Rules

Files to read:
- PROJECT_OVERVIEW.md
- DATA_MODELS.md
- ARCHITECTURE.md
- DECISIONS.md
- Lemon Gard - Project Proposal.docx
- Website Design Requirements.docx
- Do not change scope
- Do not rename models
- Follow existing architecture

------------------------------------------------------------------------

*End of CONTEXT.md*
