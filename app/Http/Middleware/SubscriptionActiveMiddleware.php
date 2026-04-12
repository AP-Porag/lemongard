<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SubscriptionActiveMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user) {

            // ✅ TRIAL EXPIRY LOGIC
            if (
                $user->subscription_status === 'trial' &&
                $user->trial_ends_at &&
                now()->gt($user->trial_ends_at)
            ) {
                $user->update([
                    'subscription_status' => 'expired'
                ]);
            }

            // Optional: block access
            if ($user->subscription_status === 'expired') {
                return redirect('/app/trial-expired');
            }
        }

        return $next($request);
    }
}
