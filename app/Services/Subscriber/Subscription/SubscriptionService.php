<?php

namespace App\Services\Subscriber\Subscription;

use App\Models\User;
use App\Services\BaseService;
use Carbon\Carbon;
use App\Utils\SubscriptionPlan;

class SubscriptionService extends BaseService
{
    public function __construct(User $model)
    {
        parent::__construct($model); // ✅ concrete model
    }

    public function myPlan($userId)
    {
        $user = $this->model->findOrFail($userId);

        $subscription = $user->subscription('default');

        $nextBillingDate = $subscription
            ? $subscription->asStripeSubscription()->current_period_end
            : null;

        $isCancelled = $subscription && $subscription->ends_at !== null;

        return [
            'user' => $user,

            'subscription_tier' => $user->subscription_tier,

            'subscription_status' => $subscription?->stripe_status,

            'is_trial' => $user->onTrial('default'),

            'is_subscribed' => $user->subscribed('default'),

            'trial_ends_at' => $subscription?->trial_ends_at,

            'is_cancelled' => $isCancelled,

            'next_billing_date' => $nextBillingDate,

            'has_full_access' => $this->hasFullAccess($user),
        ];
    }

    // public function myPlan($userId)
    // {
    //     $user = $this->model->findOrFail($userId);
    //     $subscription = $user->subscription('default');
    //     // $stripe = new \Stripe\StripeClient(config('cashier.secret'));

    //     // $stripeSubscription = $stripe->subscriptions->retrieve(
    //     //     $subscription->stripe_id
    //     // );

    //     // $nextBillingDate = $stripeSubscription->current_period_end;


    //     $isCancelled =
    //         $subscription &&
    //         $subscription->ends_at !== null;

    //     $nextBillingDate = $subscription
    //         ? $subscription->asStripeSubscription()->current_period_end
    //         : null;
    //     //  dd($nextBillingDate);

    //     return [
    //         'user' => $user,
    //         'is_trial' => $user->onTrial('default'),
    //         'is_subscribed' => $user->subscribed('default'),
    //         'trial_ends_at' => optional($user->subscription('default'))->trial_ends_at,
    //         'subscription_tier' => $user->subscription_tier,
    //         'subscription_status' => $user->subscribed('default')
    //             ? 'active'
    //             : ($user->onTrial('default') ? 'trial' : 'expired'),
    //         'is_cancelled' => $isCancelled,
    //         'next_billing_date' => $nextBillingDate,
    //         'has_full_access' => $this->hasFullAccess($user),
    //         'stripe_status' => $this->getSubscription($user)?->stripe_status,
    //     ];
    // }

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

    // public function checkout(User $user, string $tier)
    // {

    //     $priceId = SubscriptionPlan::priceId($tier);

    //     return $user->newSubscription('default', $priceId)
    //         ->checkout([
    //             'success_url' => route('app.dashboard'),
    //             'cancel_url' => route('app.subscription.index'),
    //         ]);
    // }

    // public function createSubscription(User $user, string $tier, string $paymentMethod)
    // {
    //     $priceId = SubscriptionPlan::priceId($tier);

    //     return $user->newSubscription('default', $priceId)
    //         ->create($paymentMethod, [
    //             'email' => $user->email,
    //         ]);
    // }

    /**
     * Cancel subscription (ends at period end)
     */
    // public function cancelSubscription(User $user)
    // {
    //     $subscription = $user->subscription('default');

    //     if ($subscription && $subscription->active()) {
    //         return $subscription->cancel();
    //     }

    //     return false;
    // }

    /**
     * Resume subscription
     */
    // public function resumeSubscription(User $user)
    // {
    //     $subscription = $user->subscription('default');

    //     if ($subscription && $subscription->onGracePeriod()) {
    //         return $subscription->resume();
    //     }

    //     return false;
    // }

    /**
     * Swap plan (upgrade/downgrade)
     */
    // public function swapPlan(User $user, string $tier)
    // {
    //     $priceId = SubscriptionPlan::priceId($tier);

    //     return $user->subscription('default')
    //         ->swap($priceId);
    // }

    /**
     * Check access
     */
    public function hasAccess(User $user): bool
    {
        return $user->subscribed('default');
    }
}
