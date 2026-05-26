<?php

namespace App\Http\Requests\Support;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName' => 'required|string|min:2|max:50',
            'lastName' => 'required|string|min:2|max:50',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|min:1',
            'message' => 'required|string|min:10|max:1000',
            'consent' => 'accepted',
        ];
    }

    public function messages(): array
    {
        return [
            'firstName.required' => 'First name is required',
            'lastName.required' => 'Last name is required',
            'email.required' => 'Email address is required',
            'email.email' => 'Please enter a valid email address',
            'subject.required' => 'Please select a topic',
            'message.required' => 'Message is required',
            'message.min' => 'Message must be at least 10 characters',
            'consent.accepted' => 'You must agree to be contacted',
        ];
    }
}
