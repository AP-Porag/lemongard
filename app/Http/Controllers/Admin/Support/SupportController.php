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

    public function store(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|min:2|max:50',
            'lastName' => 'required|string|min:2|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|min:1|max:255',
            'message' => 'required|string|min:10|max:1000',
            'consent' => 'required|boolean|accepted',
        ], [
            'firstName.required' => 'First name is required',
            'firstName.min' => 'First name must be at least 2 characters',
            'lastName.required' => 'Last name is required',
            'lastName.min' => 'Last name must be at least 2 characters',
            'email.required' => 'Email address is required',
            'email.email' => 'Please enter a valid email address',
            'subject.required' => 'Please select a topic',
            'message.required' => 'Message is required',
            'message.min' => 'Message must be at least 10 characters',
            'consent.accepted' => 'You must agree to be contacted',
        ]);

        // Check validation
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get validated data
            $validated = $validator->validated();

            // Create support record
            $support = Support::create([
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'user_id' => auth()->check() ? auth()->id() : null,
                'status' => 'unread',
            ]);

            // Optional: Send email notification to admin
            // Mail::to('admin@lemongard.com')->send(new SupportMessageReceived($support));

            // Optional: Send auto-reply to user
            // Mail::to($support->email)->send(new SupportAutoReply($support));

            Log::info('Support message received', [
                'support_id' => $support->id,
                'email' => $support->email,
                'subject' => $support->subject
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for contacting us! We will get back to you within 24 hours.',
                'data' => $support
            ], 200);
        } catch (\Exception $e) {
            Log::error('Failed to save support message: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }
    public function updateStatus($id, Request $request)
    {

        $this->supportService->updateStatus($id, $request->status);

        return back();
    }
}
