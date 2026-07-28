<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // 👈 ১. Auth ফাসাদ ইম্পোর্ট করা হয়েছে
use Symfony\Component\HttpFoundation\Response;

class EnsureOtpIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'admin') {
                return $next($request);
            }

            if ($user->email_verified_at === null) {

                if (
                    $request->routeIs('otp.verify.view') ||
                    $request->routeIs('otp.verify.submit') ||
                    $request->routeIs('otp.resend')
                ) {
                    return $next($request);
                }

                return redirect()->route('otp.verify.view', [
                    'email' => $user->email,
                ]);
            }
        }

        return $next($request);
    }
}
