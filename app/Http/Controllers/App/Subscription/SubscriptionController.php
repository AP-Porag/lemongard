<?php

namespace App\Http\Controllers\App\Subscription;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Services\Subscriber\Subscription\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    protected SubscriptionService $service;

    public function __construct(SubscriptionService $service)
    {
        $this->service = $service;
    }

    public function myPlan(Request $request)
    {
        // return $this->service->myPlan($request->user()->id);
        $data = $this->service->myPlan($request->user()->id);

        return inertia('app/subscriptions/myplan', $data);
    }

    public function index(Request $request)
    {
        return $this->service->index($request);
    }

    public function store(Request $request)
    {
        return $this->service->store($request->user()->id, $request->all());
    }

    public function update(Request $request, $id)
    {
        return $this->service->update($id, $request->all());
    }

    public function destroy($id)
    {
        return $this->service->destroy($id);
    }
    public function checkout($name, Request $request)
    {

        $plan = Plan::whereName($name)->first();
        $planPrice = $plan->stripe_price_id;
        return $request->user()
            ->newSubscription('default', $planPrice)
            ->checkout([
                'success_url' => route('app.checkout.success', [
                    'plan' => $plan->name,
                ]),
                'cancel_url' => route('app.myplan'),
            ]);
    }

    public function success(Request $request)
    {
        // return Inertia::render('app/subscriptions/success', [
        //     'plan' => $request->plan,
        // ]);

        $user = $request->user();

        $plan = Plan::whereName($request->plan)->firstOrFail();

        // ✅ Update local subscription state
        $user->update([
            'subscription_status' => 'active',
            'subscription_tier' => $plan->name,

            // optional cleanup (important)
            'trial_ends_at' => null,
        ]);
        $subscription = $user->subscription('default');

        return Inertia::render('app/subscriptions/success', [
            'plan' => $plan->name,
            // 'subscription_status' => $user->subscription_status,
            'subscription_status' => $user->subscription('default')?->stripe_status,
            'subscription_tier' => $user->subscription_tier,
            'on_grace_period' => $subscription?->onGracePeriod(),
            'subscription_ends_at' => $subscription?->ends_at,
            'is_cancelled' => $subscription?->stripe_status === 'canceled',
            'is_active' => $subscription?->stripe_status === 'active',
            'is_expired' => $subscription?->ends_at?->isPast(),

        ]);
    }
    public function subscribe(Request $request)
    {
        $request->validate([
            'tier' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $this->service->createSubscription(
            auth()->user(),
            $request->tier,
            $request->payment_method
        );

        return redirect()->route('app.dashboard');
    }

    public function cancel(Request $request)
    {
        $user = $request->user();

        $subscription = $user->subscription('default');

        // 1. Check before anything
        if (!$subscription) {
            return Inertia::render('app/subscriptions/error', [
                'message' => 'No active subscription found.',
            ]);
        }

        // 2. Cancel subscription
        $subscription->cancel();

        // 3. Refresh subscription to get updated state
        $subscription = $subscription->fresh();

        // 4. Reliable Cashier state check
        $isCancelled = $subscription->canceled();

        return Inertia::render('app/subscriptions/cancel-success', [
            'is_cancelled' => $isCancelled,
            'message' => 'Subscription cancelled successfully.',
        ]);
    }
    public function resume(Request $request)
    {
        $user = $request->user();

        // যদি আপনি Laravel Cashier ব্যবহার করেন:
        if ($user->subscription('default')->onGracePeriod()) {
            $user->subscription('default')->resume();
        }
        $subscription = $user->subscription('default');

        /*
    // অথবা যদি ম্যানুয়াল ডাটাবেজ ফিল্ড মেইনটেইন করেন:
    if ($user->is_cancelled && $user->on_grace_period) {
        $user->update([
            'is_cancelled' => false,
            'subscription_status' => 'active'
        ]);
    }
    */
        $nextBillingDate = $subscription?->asStripeSubscription()?->current_period_end
            ? \Carbon\Carbon::createFromTimestamp(
                $subscription->asStripeSubscription()->current_period_end
            )
            : null;

        return Inertia::render('app/subscriptions/resume', [
            'plan' => $user->subscription_tier,
            'nextBillingDate' => $nextBillingDate
                ? $nextBillingDate->format('F d, Y')
                : null,
        ]);
    }

    public function billingInfo(): array
    {
        $user = auth()->user();

        $subscription = $user->subscription('default');

        $planPrices = [
            'view_only' => '$14.99 / month',
            'full_access' => '$19.99 / month',
        ];

        return [
            'subscription_tier' => $user->subscription_tier
                ? str($user->subscription_tier)->replace('_', ' ')->title()
                : null,

            'subscription_status' => $user->subscription_status,

            'plan_price' => $planPrices[$user->subscription_tier] ?? null,

            'next_billing_date' => $subscription && ! $subscription->ended()
                ? optional($subscription->asStripeSubscription()->current_period_end)
                ? \Carbon\Carbon::createFromTimestamp(
                    $subscription->asStripeSubscription()->current_period_end
                )->format('M d, Y')
                : null
                : null,

            'trial_ends_at' => $user->trial_ends_at
                ? \Carbon\Carbon::parse($user->trial_ends_at)->format('M d, Y')
                : null,

            'card_brand' => $user->pm_type
                ? strtoupper($user->pm_type)
                : null,

            'card_last_four' => $user->pm_last_four,

            'started_at' => $subscription && $subscription->created_at
                ? $subscription->created_at->format('M d, Y')
                : null,

            'ends_at' => $subscription && $subscription->ends_at
                ? \Carbon\Carbon::parse($subscription->ends_at)->format('M d, Y')
                : null,
        ];
    }
    // public function resume()
    // {
    //     $this->service->resumeSubscription(auth()->user());

    //     return back();
    // }

    // public function swap(Request $request)
    // {
    //     $request->validate([
    //         'tier' => 'required|string',
    //     ]);

    //     $this->service->swapPlan(
    //         auth()->user(),
    //         $request->tier
    //     );

    //     return back();
    // }
}
