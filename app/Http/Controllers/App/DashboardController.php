<?php

namespace App\Http\Controllers\App\Record;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('app/dashboard', [
            'isFirstLogin' => Auth::user()->is_first_login,
            'isGoogleUser' => Auth::user()->provider === 'google',
        ]);
    }
}
