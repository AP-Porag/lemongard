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

    public function callback()
    {
        $this->service->handleCallback();
        return redirect('/app/dashboard');
    }
}
