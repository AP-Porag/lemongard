<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\GoogleAuthService;

class GoogleAuthController extends Controller
{
    protected GoogleAuthService $service;

    public function __construct(GoogleAuthService $service)
    {
        $this->service = $service;
    }

    public function redirect()
    {
        return $this->service->redirect();
    }

    // public function callback()
    // {
    //     $data = $this->service->handleCallback();

    //     return redirect('/app/dashboard')->with([
    //         'showOnboardingModal' => $data['isFirstLogin'],
    //     ]);
    // }

    public function callback()
    {
        $data = $this->service->handleCallback();

        $user = $data['user'];

        Auth::login($user);

        // =========================
        // SMART REDIRECT LOGIC
        // =========================

        // if ($user->is_social_login) {
        //     return redirect('/app/dashboard')->with([
        //         'showOnboardingModal' => $data['isFirstLogin'],
        //     ]);
        // }

        if (!$user->hasVerifiedEmail()) {
            return redirect('/email/verify');
        }

        return redirect('/app/dashboard');
    }
}
