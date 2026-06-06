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
        // ১. আইডি দিয়ে ইউজার বের করুন
        $user = User::findOrFail($id);

        // ২. সিকিউরিটি হ্যাশ চেক করুন (URL ভ্যালিড কিনা)
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link.');
        }

        // ৩. অন্য ডিভাইস হলে তাকে সেশনে লগইন করিয়ে দিন (সেশন রি-জেনারেট সহ)
        if (!Auth::check()) {
            Auth::login($user, true); // true দিলে 'remember me' অন থাকবে
            $request->session()->regenerate(); // 📌 সেশন ফিক্স করার জন্য এটি অত্যন্ত জরুরি
        }

        // ৪. ইউজার অলরেডি ভেরিফাইড থাকলে ড্যাশবোর্ডে পাঠান
        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(config('fortify.home', '/app/dashboard'));
        }

        // ৫. ভেরিফাইড না থাকলে ভেরিফিকেশন কমপ্লিট করুন
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // ৬. অবশেষে অ্যাপ ড্যাশবোর্ডে রিডাইরেক্ট (intended ব্যবহার করা ভালো)
        return redirect()->intended(config('fortify.home', '/app/dashboard'))->with('verified', true);
    }
}
