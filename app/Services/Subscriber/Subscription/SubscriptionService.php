<?php

namespace App\Services\Subscriber\Subscription;

use App\Models\User;
use App\Services\BaseService;
use Carbon\Carbon;

class SubscriptionService extends BaseService
{
    public function __construct(User $model)
    {
        parent::__construct($model); // ✅ concrete model
    }

    public function myPlan($userId)
    {
        $user = $this->model->findOrFail($userId);

        return inertia('app/subscriptions/myplan', [
            'user' => $user,
        ]);
    }

    public function index($request)
    {
        return inertia('app/subscriptions/index', [
            'users' => $this->model->latest()->paginate(20),
        ]);
    }

    public function store($userId, $data)
    {
        $user = $this->model->findOrFail($userId);

        $user->update([
            'plan_type' => 'tier_2',
            'subscription_status' => 'active',
            'subscription_ends_at' => Carbon::now()->addMonth(),
        ]);

        return redirect()
            ->route('app.myplan')
            ->with('success', 'Upgraded successfully');
    }

    public function update(\Illuminate\Database\Eloquent\Model|int $modelOrId, array $data): \Illuminate\Database\Eloquent\Model
    {
        $user = is_int($modelOrId)
            ? $this->model->findOrFail($modelOrId)
            : $modelOrId;

        $user->update([
            'plan_type' => $data['plan_type'] ?? $user->plan_type,
            'subscription_status' => $data['status'] ?? $user->subscription_status,
        ]);

        return $user;
    }

    public function destroy($id)
    {
        $user = $this->model->findOrFail($id);

        $user->update([
            'subscription_status' => 'cancelled',
        ]);

        return redirect()
            ->route('app.myplan')
            ->with('success', 'Cancelled successfully');
    }
}
