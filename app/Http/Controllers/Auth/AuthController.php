<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Services\User\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    //Register
    public function register(UserRegisterRequest $request)
    {
        $user = $this->userService->register($request->validated());

        Auth::login($user);

        return redirect()->route('app.dashboard');
    }

    //Login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('rememberMe'))) {
            return back()->withErrors([
                'email' => 'Invalid credentials',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->route('app.dashboard');
    }




    //Logout
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
