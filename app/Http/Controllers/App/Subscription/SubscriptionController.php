<?php

namespace App\Http\Controllers\App\Subscription;

use App\Http\Controllers\Controller;
use App\Services\Subscriber\Subscription\SubscriptionService;
use Illuminate\Http\Request;

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
    public function checkout(Request $request)
    {
        $session = $this->service->checkout(
            $request->user(),
            $request->plan
        );

        return Inertia::location($session->url);
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
