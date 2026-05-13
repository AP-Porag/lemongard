<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureFullAccessTier
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user) {
            abort(401);
        }

        if ($user->subscription_tier !== 'tier_2_full_access') {
            abort(403, 'Upgrade your plan to access this feature.');
        }

        return $next($request);
    }
}
