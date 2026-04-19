<?php

namespace App\Http\Controllers\Admin\Support;

use App\Http\Controllers\Controller;
use App\Services\Message\MessageService;
use App\Services\Admin\Support\SupportService;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class SupportController extends Controller
{
    public function __construct(
        private SupportService $supportService
    ) {}

    public function index()
    {
        return Inertia::render('admin/support/index', [
            'messages' => $this->supportService->allMessage()
        ]);
    }
    public function updateStatus($id, Request $request)
    {

        $this->supportService->updateStatus($id, $request->status);

        return back();
    }
}
