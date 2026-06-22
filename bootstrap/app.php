<?php

use App\Http\Middleware\EnsureIndustrySelected;
use App\Http\Middleware\EnsureOtpIsVerified;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {


        $middleware->validateCsrfTokens(except: [
            'stripe/*',
        ]);
        // Cookies encryption
        $middleware->encryptCookies(except: [
            'appearance',
            'sidebar_state',
        ]);

        // Web middleware stack
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Aliases (LemonGard + Laravel 12)
        $middleware->alias([
            'role' => RoleMiddleware::class,
            // 'tier.full' => \App\Http\Middleware\EnsureFullAccessTier::class,
            'guest.redirect' => \App\Http\Middleware\RedirectIfAuthenticated::class,
            'otp.verified' => EnsureOtpIsVerified::class,  // ✅ এখানে alias যোগ করুন
            'industry.selected' => EnsureIndustrySelected::class,  // ✅ এখানে alias যোগ করুন
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
