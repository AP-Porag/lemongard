<?php

namespace App\Http\Controllers\App\Subscription;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Services\Subscriber\Subscription\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Laravel\Cashier\Cashier;

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


public function billingInfo(Request $request)
{
    $user = $request->user();
    // Laravel Cashier এর ডিফল্ট সাবস্ক্রিপশন নেওয়া হচ্ছে
    $subscription = $user->subscription('default');

    $planPriceLabel = 'N/A';

    // আপনার ইউজার টেবিল বা সাবস্ক্রিপশন থেকে যদি Price ID পান
    // উদাহরণস্বরূপ, স্ট্রাইপ থেকে সরাসরি ডেটা আনা:
    if ($subscription && $subscription->stripe_price) {
        try {
            // Stripe API থেকে প্রাইস অবজেক্ট রিট্রিভ করা হচ্ছে
            $stripePrice = Cashier::stripe()->prices->retrieve($subscription->stripe_price);
            
            // স্ট্রাইপ অ্যামাউন্ট সেন্ট (cents) এ দেয়, তাই ১০০ দিয়ে ভাগ করে ডলারে নেওয়া হয়েছে
            $amount = number_format($stripePrice->unit_amount / 100, 2);
            $currency = strtoupper($stripePrice->currency); // e.g., usd
            
            $planPriceLabel = "$Format $$amount / month"; // আউটপুট হবে: $19.99 / month
        } catch (\Exception $e) {
            $planPriceLabel = 'N/A';
        }
    }

    $planPrices = [
        'view_only'   => '$14.99 / month',
        'full_access' => '$19.99 / month',
    ];

    // ১. সাবস্ক্রিপশন স্ট্যাটাস ক্যাশিয়ার থেকে ডাইনামিক্যালি নেওয়া (বেটার প্র্যাকটিস)
    // ইউজার যদি ট্রায়ালে থাকে, বা একটিভ থাকে, অথবা ক্যানসেলড হয়ে গ্রেস পিরিয়ডে থাকে
    $status = 'unknown';
    if ($user->onTrial()) {
        $status = 'trial';
    } elseif ($subscription) {
        if ($subscription->active()) {
            $status = $subscription->onGracePeriod() ? 'cancelled' : 'active';
        } elseif ($subscription->ended()) {
            $status = 'expired';
        }
    }
   
    $nextBillingDate = null;
if ($subscription && $subscription->active() && !$subscription->onGracePeriod()) {
    try {
        // Stripe Subscription অবজেক্ট নেওয়া হচ্ছে
        $stripeSubscription = $subscription->asStripeSubscription();
        
        // current_period_end আছে কিনা এবং তা null না তা নিশ্চিত করা হচ্ছে
        if (isset($stripeSubscription->current_period_end) && $stripeSubscription->current_period_end) {
            $nextBillingDate = Carbon::createFromTimestamp($stripeSubscription->current_period_end)
                ->format('M d, Y');
              
        } else {
            // যদি স্ট্রাইপ থেকে ডেট না পাওয়া যায়
            $nextBillingDate = $subscription->created_at->addMonth()->format('M d, Y');
        }
    } catch (\Throwable $e) {
        // \Exception এর বদলে \Throwable ব্যবহার করা হয়েছে যা TypeError-ও ক্যাচ করবে
        $nextBillingDate = $subscription->created_at ? $subscription->created_at->addMonth()->format('M d, Y') : null;
    }
}
    return Inertia::render('app/subscriptions/billing-info', [
        'billingInfo' => [
            'subscription_tier' => $user->subscription_tier
                ? str($user->subscription_tier)->replace('_', ' ')->title()
                : 'N/A',

            'subscription_status' => $status,

            'next_billing_date' => $nextBillingDate,

            'trial_ends_at' => $user->trial_ends_at
                ? Carbon::parse($user->trial_ends_at)->format('M d, Y')
                : null,

            'card_brand' => $user->pm_type
                ? strtoupper($user->pm_type)
                : null,

                'plan_price' => $planPriceLabel,

            'card_last_four' => $user->pm_last_four,

            'started_at' => $subscription && $subscription->created_at
                ? $subscription->created_at->format('M d, Y')
                : null,

            'ends_at' => $subscription && $subscription->ends_at
                ? Carbon::parse($subscription->ends_at)->format('M d, Y')
                : null,
        ]
    ]);
}
}
