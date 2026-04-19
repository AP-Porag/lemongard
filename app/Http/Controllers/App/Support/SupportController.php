<?php

namespace App\Http\Controllers\App\Support;

use App\Http\Controllers\Controller;

use App\Http\Requests\Support\StoreSupportRequest;
use App\Services\Subscriber\Support\SupportService;
use Illuminate\Http\RedirectResponse;

class SupportController extends Controller
{
    protected SupportService $supportService;

    public function __construct(SupportService $supportService)
    {
        $this->supportService = $supportService;
    }

    public function store(StoreSupportRequest $request): RedirectResponse
    {
        $data = $request->validated();


        // Transform frontend camelCase → DB snake_case
        $payload = [
            'first_name' => $data['firstName'],
            'last_name'  => $data['lastName'],
            'email'      => $data['email'],
            'phone'      => $data['phone'] ?? null,
            'subject'    => $data['subject'],
            'message'    => $data['message'],
            'consent'    => true,
        ];

        $this->supportService->create($payload);

        return back()->with('success', 'Message sent successfully');
    }
}
