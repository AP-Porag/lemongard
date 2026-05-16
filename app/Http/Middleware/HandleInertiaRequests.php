<?php

namespace App\Http\Middleware;

use App\Services\Subscriber\Subscription\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    // public function share(Request $request): array
    // {
    //     $subscriptionService = app(SubscriptionService::class);
    //     $user = $request->user();
    //     return [
    //         ...parent::share($request),
    //         'name' => config('app.name'),
    //         'auth' => [
    //             'user' => $user ? [
    //                 'id' => $user->id,
    //                 'name' => $user->name,
    //                 'role' => $user->role,
    //                 'has_full_access' => $subscriptionService->hasFullAccess($user),
    //             ] : null,
    //         ],
    //         'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',

    //         // ✅ Ziggy add here (same method)
    //         'ziggy' => fn() => (new Ziggy)->toArray(),

    //         // ✅ login controller থেকে আসা data
    //         'isFirstLogin' => fn() => $request->session()->get('is_first_login'),
    //         //Toast
    //         'flash' => [
    //             'success' => fn() => $request->session()->get('success'),
    //             'error' => fn() => $request->session()->get('error'),
    //             'warning' => fn() => $request->session()->get('warning'),
    //         ],
    //     ];
    // }
    // public function share(Request $request): array
    // {
    //     $subscriptionService = app(SubscriptionService::class);
    //     $user = $request->user();

    //     return [
    //         ...parent::share($request),
    //         'name' => config('app.name'),
    //         'auth' => [
    //             // Explicitly build the array to prevent Laravel from dumping the raw model
    //             'user' => $user ? [
    //                 'id' => $user->id,
    //                 'name' => $user->name,
    //                 'email' => $user->email,
    //                 'role' => $user->role,
    //                 // ✅ This explicitly attaches the boolean to the user object
    //                 'has_full_access' => (bool) $subscriptionService->hasFullAccess($user),
    //             ] : null,
    //         ],
    //         'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
    //         'ziggy' => fn() => (new Ziggy)->toArray(),
    //         'isFirstLogin' => fn() => $request->session()->get('is_first_login'),
    //         'flash' => [
    //             'success' => fn() => $request->session()->get('success'),
    //             'error' => fn() => $request->session()->get('error'),
    //             'warning' => fn() => $request->session()->get('warning'),
    //         ],
    //     ];
    // }
    public function share(Request $request): array
    {
        $subscriptionService = app(SubscriptionService::class);
        $user = $request->user();

        // 1. Safe Check: Only evaluate access if a user is logged in
        $hasFullAccess = $user ? (bool) $subscriptionService->hasFullAccess($user) : false;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'has_full_access' => $hasFullAccess, // ✅ Safe variable injection
                ] : null,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'ziggy' => fn() => (new Ziggy)->toArray(),
            'isFirstLogin' => fn() => $request->session()->get('is_first_login'),
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
            ],
        ];
    }
}
