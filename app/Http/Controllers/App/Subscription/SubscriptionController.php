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

        return Inertia::render('app/subscriptions/success', [
            'plan' => $plan->name,
            'subscription_status' => $user->subscription_status,
            'subscription_tier' => $user->subscription_tier,
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

    public function cancel()
    {
        $this->service->cancelSubscription(auth()->user());

        return back();
    }

    public function resume()
    {
        $this->service->resumeSubscription(auth()->user());

        return back();
    }

    public function swap(Request $request)
    {
        $request->validate([
            'tier' => 'required|string',
        ]);

        $this->service->swapPlan(
            auth()->user(),
            $request->tier
        );

        return back();
    }
}
