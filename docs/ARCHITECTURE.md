# LemonGard -- System Architecture (Updated With Service Layer)

*Last Updated: 2026-03-08*

This document reflects the **actual project structure and architecture
decisions** for the LemonGard SaaS platform.

The architecture follows a **Laravel 12 + React 19 + Inertia.js**
service‑layer design.

------------------------------------------------------------------------

# 1. Backend Framework

Backend stack:

-   Laravel Framework: \^12.0
-   PHP: 8.2+
-   Authentication: Laravel Fortify
-   Billing: Laravel Cashier (Stripe)
-   Database: MySQL

Laravel 12 conventions are strictly followed:

-   No `app/Http/Kernel.php`
-   Middleware registered using bootstrap configuration
-   Typed PHP classes and modern syntax

------------------------------------------------------------------------

# 2. Backend Folder Structure (Actual)

app/

├── Actions/ │ └── Fortify/

├── Concerns/

├── Http/ │ ├── Controllers/ │ │ └── Settings/ │ ├── Middleware/ │ │ ├──
HandleAppearance.php │ │ ├── HandleInertiaRequests.php │ │ └──
RoleMiddleware.php │ └── Requests/ │ └── Settings/

├── Models/ │ └── User.php

├── Providers/ │ ├── AppServiceProvider.php │ └──
FortifyServiceProvider.php

├── Services/ │ └── BaseService.php

└── Utils/ ├── GlobalConstant.php └── helper.php

------------------------------------------------------------------------

# 3. Service Layer Architecture

A **service‑oriented architecture** is used to keep controllers thin and
isolate business logic.

Controllers should only:

1.  Receive request
2.  Validate request
3.  Call service
4.  Return response

Business logic belongs inside services.

------------------------------------------------------------------------

## BaseService

Location:

app/Services/BaseService.php

Purpose:

Provides reusable generic CRUD methods for all services.

Examples of shared logic:

-   all()
-   paginate()
-   find()
-   create()
-   update()
-   delete()
-   exists()
-   updateOrCreate()

This prevents duplication across services.

------------------------------------------------------------------------

## Service Naming Convention

All domain services follow this structure:

app/Services/

Example structure:

app/Services/

├── BaseService.php

├── User/ │ └── UserService.php

├── Record/ │ └── RecordService.php

Future services will follow:

app/Services/ModelName/ModelService.php

Example:

app/Services/Record/RecordService.php

Rules:

-   Each service represents one model/domain
-   Services extend `BaseService`
-   Controllers should never directly contain business logic

------------------------------------------------------------------------

# 4. Frontend Architecture

Frontend stack:

-   React \^19
-   TypeScript \^5
-   Vite \^7
-   Inertia.js React adapter
-   Tailwind CSS \^4
-   shadcn/ui (New York style)
-   Radix UI components
-   lucide-react icons

------------------------------------------------------------------------

# 5. Frontend Folder Structure

resources/js/

├── app.tsx ├── ssr.tsx

├── actions/ ├── components/ │ └── ui/

├── hooks/

├── layouts/ │ ├── app/ │ ├── auth/ │ └── settings/

├── lib/

├── pages/ │ ├── admin/ │ ├── app/ │ ├── auth/ │ └── settings/

├── routes/ │ ├── admin/ │ ├── app/ │ ├── login/ │ ├── register/ │ ├──
password/ │ ├── profile/ │ └── verification/

├── types/

├── utils/ │ ├── GlobalConstant.js │ └── helper.js

└── wayfinder/

Important rule:

`routes/index.ts` and Wayfinder generated files **must never be manually
edited**.

------------------------------------------------------------------------

# 6. Route Architecture

Public routes:

/ /pricing /about /login /register

Subscriber routes:

/app/dashboard

Admin routes:

/admin/dashboard

Route access controlled by:

-   auth middleware
-   verified middleware
-   role middleware

------------------------------------------------------------------------

# 7. Middleware

Current middleware:

-   HandleAppearance
-   HandleInertiaRequests
-   RoleMiddleware

Future middleware:

-   SubscriptionActiveMiddleware
-   TierAccessMiddleware

------------------------------------------------------------------------

# 8. Utilities

Backend utilities:

app/Utils/

-   GlobalConstant.php
-   helper.php

Frontend utilities:

resources/js/utils/

-   GlobalConstant.js
-   helper.js

These files provide shared constants and helper functions.

------------------------------------------------------------------------

# 9. Database Overview

Primary tables:

-   users
-   records

Stripe tables (Cashier):

-   subscriptions
-   subscription_items

System tables:

-   password_reset_tokens
-   sessions

Schema defined in **DATA_MODELS.md**.

------------------------------------------------------------------------

# 10. Architectural Rules

The following rules must be respected:

-   Controllers remain thin
-   Business logic lives in services
-   Services extend BaseService
-   No logic duplication across controllers
-   Policies enforce ownership rules
-   Wayfinder routes must not be manually edited
-   Folder naming conventions remain consistent

------------------------------------------------------------------------

# 11. Future Scalability

The architecture supports future additions:

-   Mobile API layer
-   Queue workers
-   Redis caching
-   Reporting modules
-   Additional service modules

The service‑layer design allows these features to be added without major
refactoring.

------------------------------------------------------------------------

*End of ARCHITECTURE.md*
