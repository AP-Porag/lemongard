<?php

namespace App\Services\Auth;

use App\Models\Plan;
use App\Services\BaseService;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Utils\GlobalConstant;

class GoogleAuthService extends BaseService
{
    public function __construct(User $user) // ✅ specific model
    {
        parent::__construct($user);
    }

    // public function redirect()
    // {
    //     return Socialite::driver('google')->redirect();
    // }

    public function redirect()
    {
        return Socialite::driver('google')
            ->with([
                'prompt' => 'consent', // ✅ force confirm screen
            ])
            ->redirect();
    }

    public function handleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = $this->model->firstOrCreate(
            [
                'email' => $googleUser->getEmail(),
            ],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(uniqid()),
                'is_social_login' => true,
            ]
        );

        if (! $user->subscribed('default')) {

            $plan = Plan::where(
                'name',
                GlobalConstant::TIER_TRIAL
            )->first();

            if ($plan) {

                $user->createOrGetStripeCustomer();

                $user->newSubscription(
                    'default',
                    $plan->stripe_price_id
                )->trialUntil(now()->addDays(30))
                    ->create();
            }
        }

        // ✅ Detect first login
        if ($user->wasRecentlyCreated) {
            $user->update([
                'is_first_login' => true,
            ]);
        }

        Auth::login($user);

        return [
            'user' => $user,
            'isFirstLogin' => (bool) $user->is_first_login,
        ];
    }
}
