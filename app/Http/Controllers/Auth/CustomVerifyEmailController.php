<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CustomVerifyEmailController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        // হ্যাশ ভেরিফিকেশন
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            Log::warning('Invalid verification link', ['user_id' => $id]);
            return redirect()->route('login')
                ->with('error', 'Invalid verification link.');
        }

        // ইউজারকে লগইন করান
        if (!Auth::check()) {
            Auth::login($user);
            $request->session()->regenerate();
        }

        // ইতিমধ্যে ভেরিফাইড কিনা চেক করুন
        if ($user->hasVerifiedEmail()) {
            Log::info('Email already verified', ['user_id' => $user->id]);

            // ইন্ডাস্ট্রি চেক করুন
            if ($user->industries()->count() === 0) {
                return redirect()->route('app.onboarding.industry')
                    ->with('info', 'Please select your industry.');
            }

            return redirect()->route('app.dashboard');
        }

        // ইমেইল ভেরিফাই করুন
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
            Log::info('Email verified successfully', ['user_id' => $user->id]);
        }

        // ✅ ভেরিফিকেশনের পর ইন্ডাস্ট্রি সিলেক্ট পেজে পাঠান
        return redirect()->route('app.onboarding.industry')
            ->with('success', 'Email verified successfully! Please select your industry to continue.');
    }
}
