<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\SendOTPMail;
use App\Models\Industry;

class OTPVerificationController extends Controller
{
    public function showView(Request $request)
    {


        // $user = Auth::user();

        // যদি ইতিমধ্যে OTP ভেরিফাই করা হয়ে থাকে
        // if ($user->otp_verified_at !== null) {
        //     return redirect()->route('app.dashboard');
        // }

        // return inertia('auth/verify-otp', [
        //     'email' => $user->email,
        //     'otp_sent' => session('otp_sent', true),
        // ]);
        return Inertia::render('auth/verify-otp', [
            'email' => $request->query('email'),
        ]);
    }

    // public function verify(Request $request)
    // {
    //     $request->validate([
    //         'otp' => 'required|string|size:6',
    //     ]);

    //     $user = Auth::user();

    //     // OTP ম্যাচ করে কিনা চেক করুন
    //     if ($user->otp !== $request->otp) {
    //         return back()->withErrors(['otp' => 'Invalid OTP code. Please try again.']);
    //     }

    //     // OTP এক্সপায়ার্ড কিনা চেক করুন
    //     if ($user->otp_expires_at < now()) {
    //         return back()->withErrors(['otp' => 'OTP has expired. Please request a new one.']);
    //     }

    //     // OTP ভেরিফাই করুন
    //     $user->update([
    //         'otp_verified_at' => now(),
    //         'otp' => null, // OTP null করে দিন
    //         'otp_expires_at' => null,
    //     ]);

    //     // ইন্ডাস্ট্রি সিলেক্ট করা আছে কিনা চেক করুন
    //     if ($user->industries()->count() === 0) {
    //         return redirect()->route('app.onboarding.industry')
    //             ->with('success', 'OTP verified successfully! Please select your industry.');
    //     }

    //     return redirect()->route('app.dashboard')
    //         ->with('success', 'OTP verified successfully!');
    // }

    public function verify(Request $request)
    {

        $request->validate([
            'email' => ['required', 'email'],
            'otp' => ['required', 'digits:6'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors([
                'email' => 'User not found.'
            ]);
        }

        if ($user->otp != $request->otp) {
            return back()->withErrors([
                'otp' => 'Invalid OTP.'
            ]);
        }

        if (now()->gt($user->otp_expires_at)) {
            return back()->withErrors([
                'otp' => 'OTP has expired.'
            ]);
        }

        $user->update([
            // 'otp' => null,
            'otp_verified_at' => now(),
            // 'otp_expires_at' => null,
            'email_verified_at' => now(),
        ]);

        Auth::login($user);

        return inertia('app/onboarding/IndustrySelect', [
            'industries' => Industry::all()
        ]);
    }

    // public function resend(Request $request)
    // {
    //     $user = Auth::user();

    //     // নতুন OTP জেনারেট করুন
    //     $otp = rand(100000, 999999);
    //     $user->update([
    //         'otp' => $otp,
    //         'otp_expires_at' => now()->addMinutes(10),
    //     ]);

    //     // OTP ইমেইল পাঠান (অপশনাল)
    //     // Mail::to($user->email)->send(new OTPMail($otp));

    //     return back()->with('success', 'New OTP sent to your email.');
    // }

    public function resend(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $otp = random_int(100000, 999999);

        $user->update([
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(new SendOTPMail($otp));

        return back()->with('success', 'A new OTP has been sent.');
    }
}
