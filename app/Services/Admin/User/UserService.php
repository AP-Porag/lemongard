<?php

namespace App\Services\Admin\User;

use App\Models\Plan;
use App\Models\User;
use App\Services\BaseService;
use App\Utils\GlobalConstant;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Create new user
     */
    public function createUser(array $data)
    {
        $user = $this->model->create([
            'name'     => $data['first_name'] . ' ' . $data['last_name'],
            'email'    => $data['email'],
            'role'     => $data['role'],
            'password' => Hash::make('password'),
        ]);

        $plan = Plan::where(
            'name',
            GlobalConstant::TIER_TRIAL
        )->first();

        if (
            $user->role !== 'admin' &&
            $plan &&
            $plan->stripe_price_id
        ) {
            // Create Stripe customer if it doesn't exist
            if (!$user->stripe_id) {
                $user->createAsStripeCustomer();
            }

            $user->newSubscription(
                'default',
                $plan->stripe_price_id
            )
                ->trialUntil(now()->addMonth())
                ->create();
        }

        return $user;
    }

    /**
     * Update user
     */
    public function updateUser(User $user, array $data)
    {
        $user->update([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'role'       => $data['role'],
        ]);

        return $user;
    }

    /**
     * Delete user
     */
    public function deleteUser(User $user)
    {
        return $user->delete();
    }

    /**
     * Get all users (for admin table)
     */
    public function getAllUsers()
    {
        return $this->model->latest()->paginate(10);
    }

    /**
     * Get single user
     */
    public function getUserById(int $id)
    {
        return $this->model->findOrFail($id);
    }
}
