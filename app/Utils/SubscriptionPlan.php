<?php

namespace App\Utils;

class SubscriptionPlan
{
    public const VIEW_ONLY = 'view_only';
    public const FULL_ACCESS = 'full_access';

    public static function priceId(string $plan): string
    {
        return match ($plan) {
            'view_only' => config('services.stripe.price_view_only'),
            'full_access' => config('services.stripe.price_full_access'),
            default => throw new \InvalidArgumentException('Invalid plan'),
        };
    }
}
