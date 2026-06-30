<?php

namespace App\Http\Controllers\App\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Subscriber\Dashboard\DashboardService;
use App\Services\Subscriber\Record\RecordService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    public function index(Request $request)
    {
        $user     = $request->user();
        $criteria = $request->only(['first_name', 'last_name', 'email', 'phone']);
        $searched = collect($criteria)->filter(fn($v) => filled($v))->isNotEmpty();

        return Inertia::render('app/dashboard/index', [
            'stats'          => $this->dashboardService->getDashboardStats($user),
            'searchResults'  => $searched ? $this->dashboardService->searchRecords($criteria) : null,
            'searchCriteria' => $criteria,
            'hasSearched'    => $searched,
        ]);
    }
}
