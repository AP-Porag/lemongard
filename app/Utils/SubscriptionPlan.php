<?php

namespace App\Utils;

class SubscriptionPlan
{
    public const VIEW_ONLY = 'view_only';
    public const FULL_ACCESS = 'full_access';

    public static function priceId(string $tier): string
    {
        return match ($tier) {
            self::VIEW_ONLY => env('STRIPE_PRICE_VIEW_ONLY'),
            self::FULL_ACCESS => env('STRIPE_PRICE_FULL_ACCESS'),

            default => throw new \InvalidArgumentException("Invalid tier: " . $tier),
        };
    }
}
