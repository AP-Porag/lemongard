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
            return redirect()->route('login');
        }
        $subscription = $user->subscription('default');

        $hasAccess =
            $subscription &&
            (
                $subscription->stripe_status === 'active' ||
                ($subscription->trial_ends_at && now()->lt($subscription->trial_ends_at))
            );

        if (! $hasAccess) {
            return redirect()
                ->route('app.myplan')
                ->with('error', 'Your subscription has expired.');
        }

        return $next($request);
    }
}
