<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Admin\Dashboard\AdminDashboardService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct(
        protected AdminDashboardService $service
    ) {}

    public function index()
    {
        return Inertia::render('admin/dashboard/dashboard', [
            'stats' => $this->service->getStats(),
        ]);
    }
}
