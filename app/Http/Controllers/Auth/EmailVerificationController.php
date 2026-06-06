<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

class EmailVerificationController
{
    public function __invoke(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect('/app/dashboard');
        }

        $request->user()->markEmailAsVerified();

        event(new \Illuminate\Auth\Events\Verified($request->user()));

        return redirect('/app/dashboard')->with('success', 'Email verified successfully');
    }
}
