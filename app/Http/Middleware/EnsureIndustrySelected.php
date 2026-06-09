<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureIndustrySelected
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user->industries()->exists()) {
            return redirect()->route('app.onboarding.industry');
        }

        return $next($request);
    }
}
