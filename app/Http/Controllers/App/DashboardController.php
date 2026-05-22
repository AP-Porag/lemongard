<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Services\Subscriber\Record\RecordService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected RecordService $recordService
    ) {}

    public function index(Request $request)
    {
        $user = $request->user();

        $stats = $this->recordService->getDashboardStats($user);

        return Inertia::render('app/dashboard/index', [
            'stats' => $stats,
            // 'auth' => [
            //     'user' => $user,
            // ],

        ]);
    }
}
