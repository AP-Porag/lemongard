<?php

namespace App\Services\Auth;

use App\Services\BaseService;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class GoogleAuthService extends BaseService
{
    public function __construct(User $user) // ✅ specific model
    {
        parent::__construct($user);
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = $this->model->updateOrCreate(
            [
                'email' => $googleUser->getEmail(),
            ],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(uniqid()),
            ]
        );

        Auth::login($user);

        return $user;
    }
}
