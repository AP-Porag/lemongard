<?php

namespace App\Utils;

class GlobalConstant
{
    /*
    |--------------------------------------------------------------------------
    | User Roles
    |--------------------------------------------------------------------------
    */
    public const ROLE_ADMIN = 'admin';
    public const ROLE_USER = 'user';

    /*
    |--------------------------------------------------------------------------
    | Subscription Status
    |--------------------------------------------------------------------------
    */
    public const SUB_ACTIVE = 'active';
    public const SUB_TRIAL = 'trial';
    public const SUB_EXPIRED = 'expired';
    public const SUB_CANCELLED = 'cancelled';


    /*
    |--------------------------------------------------------------------------
    | User Status
    |--------------------------------------------------------------------------
    */
    public const USER_ACTIVE = 'active';
    public const USER_INACTIVE = 'inactive';

    /*
    |--------------------------------------------------------------------------
    | Subscription Tiers
    |--------------------------------------------------------------------------
    */
    public const TIER_TRIAL = 'trial';
    public const TIER_VIEW_ONLY = 'tier_1';
    public const TIER_FULL_ACCESS = 'tier_2';

    public const TIER_PRICE = [
        self::TIER_VIEW_ONLY => 14.99,
        self::TIER_FULL_ACCESS => 19.99,
    ];

    /*
    |--------------------------------------------------------------------------
    | Route Prefix
    |--------------------------------------------------------------------------
    */
    public const ROUTE_ADMIN = 'admin';
    public const ROUTE_APP = 'app';

    /*
    |--------------------------------------------------------------------------
    | Pagination Defaults
    |--------------------------------------------------------------------------
    */
    public const PAGINATION_LIMIT = 25;

    /*
    |--------------------------------------------------------------------------
    | Cache Keys
    |--------------------------------------------------------------------------
    */
    public const CACHE_SUBSCRIPTION_PREFIX = 'subscription_';
}
