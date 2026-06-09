<?php

namespace App\Http\Controllers\App\Industry;

use App\Models\Industry;
use Illuminate\Http\Request;
use App\Services\Subscriber\Industry\IndustryUserService;

class IndustryOnboardingController
{

    public function index()
    {
        return inertia('app/onboarding/IndustrySelect', [
            'industries' => Industry::all()
        ]);
    }
    public function store(Request $request, IndustryUserService $service)
    {
        $request->validate([
            'industry_id' => ['required', 'exists:industries,id']
        ]);

        $service->attach($request->user(), $request->industry_id);

        return redirect('/app/dashboard');
    }
}
