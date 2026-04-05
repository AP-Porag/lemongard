<?php

use App\Utils\GlobalConstant;
use Illuminate\Support\Facades\Auth;

if (!function_exists('is_admin')) {
    function is_admin(): bool
    {
        return Auth::check() && Auth::user()->role === GlobalConstant::ROLE_ADMIN;
    }
}

if (!function_exists('is_user')) {
    function is_user(): bool
    {
        return Auth::check() && Auth::user()->role === GlobalConstant::ROLE_USER;
    }
}

if (!function_exists('subscription_active')) {
    function subscription_active(): bool
    {
        return Auth::check() &&
            Auth::user()->subscription_status === GlobalConstant::SUB_ACTIVE;
    }
}

if (!function_exists('format_currency')) {
    function format_currency($amount): string
    {
        return '$' . number_format($amount, 2);
    }
}
