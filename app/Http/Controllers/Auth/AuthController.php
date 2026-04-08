<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UserRegisterRequest;
use App\Services\Auth\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    //Register
    public function register(UserRegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());

        Auth::login($user);

        return redirect()->route('app.dashboard');
    }

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

        $user = Auth::user();


        // ✅ First login check (NO SESSION)
        // if ($user->is_first_login) {
        //     $user->save([
        //         'is_first_login' => false,
        //     ]);
        //     return $user->is_first_login;
        // }

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
