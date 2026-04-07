<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
{
    /**
     * Authorize request
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules
     */
    public function rules(): array
    {
        return [
            // Name
            'name' => ['required', 'string', 'max:255'],

            // Email
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],

            // Password
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            // Extra fields
            'industry' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:100'],

            // Checkboxes
            'agree_to_terms' => ['accepted'],
            'marketing_emails' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Custom messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Full name is required',

            'email.required' => 'Email is required',
            'email.email' => 'Enter a valid email',
            'email.unique' => 'Email already exists',

            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 8 characters',
            'password.confirmed' => 'Passwords do not match',

            'industry.required' => 'Please select your industry',

            'agree_to_terms.accepted' => 'You must accept the terms',
        ];
    }

    /**
     * Prepare data before validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => strtolower($this->email),
            'agree_to_terms' => $this->boolean('agree_to_terms'),
            'marketing_emails' => $this->boolean('marketing_emails'),
        ]);
    }
}
