<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomVerifyEmailController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        if (!Auth::check()) {
            Auth::login($user, true);
            $request->session()->regenerate();
        }

        // 📌 অলরেডি ভেরিফাইড হলে সরাসরি '/app/dashboard' এ পাঠান
        if ($user->hasVerifiedEmail()) {
            return redirect('/app/dashboard');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // 📌 ভেরিফিকেশন শেষে সরাসরি '/app/dashboard' এ পাঠান
        return redirect('/app/dashboard')->with('verified', true);
    }
}
