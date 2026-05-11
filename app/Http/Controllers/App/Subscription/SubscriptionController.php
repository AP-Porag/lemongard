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
        return $this->service->myPlan($request->user()->id);
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
        $plan = Plan::whereName($name)->firstOrFail();

        return redirect(
            $request->user()
                ->newSubscription('default', $plan->stripe_price_id)
                ->allowPromotionCodes()
                ->checkout([
                    'success_url' => route('app.checkout.success'),
                    'cancel_url' => route('app.myplan'),
                ])->url
        );
    }

    // public function checkoutSuccess()
    // {
    //     dd("Hello");
    //     return Inertia::render('app/checkout/success');
    // }

    public function success(Request $request)
    {
        return "Hello";
        $sessionId = $request->input('session_id');

        // If session_id is missing, still render page safely
        if (!$sessionId) {
            return Inertia::render('app/checkout/success', [
                'session_id' => null,
                'session' => null,
            ]);
        }

        // OPTIONAL: Verify session with Stripe (recommended for production)
        $session = null;

        try {
            $stripe = new StripeClient(config('services.stripe.secret'));

            $session = $stripe->checkout->sessions->retrieve($sessionId, [
                'expand' => ['customer', 'subscription'],
            ]);
        } catch (\Exception $e) {
            // Do not break UI if Stripe fails
            $session = null;
        }

        return Inertia::render('app/checkout/success', [
            'session_id' => $sessionId,
            'session' => $session,
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
