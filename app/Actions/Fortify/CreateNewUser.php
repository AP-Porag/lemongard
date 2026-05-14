<?php

namespace App\Actions\Fortify;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{

    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:8'],
        ])->validate();

        /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */
        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'is_first_login' => true,
        ]);

        /*
    |--------------------------------------------------------------------------
    | Default Trial Plan
    |--------------------------------------------------------------------------
    */
        $plan = Plan::where(
            'name',
            'tier_1_view_only'
        )->first();

        /*
    |--------------------------------------------------------------------------
    | Start Cashier Trial
    |--------------------------------------------------------------------------
    */
        if ($plan && $plan->stripe_price_id) {

            $user->newSubscription(
                'default',
                $plan->stripe_price_id
            )->trialUntil(now()->addMinute())
                ->create();
            // ->trialDays(30)->create();
        }

        return $user;
    }
}
