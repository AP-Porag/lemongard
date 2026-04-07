<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Services\Record\RecordService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $recordService;

    public function __construct(RecordService $recordService)
    {
        $this->recordService = $recordService;
    }

    public function index()
    {
        $data = $this->recordService->getDashboardData();

        return Inertia::render('app/dashboard', $data);
    }
}
