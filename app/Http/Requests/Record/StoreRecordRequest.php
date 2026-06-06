<?php

namespace App\Http\Requests\Record;

use Illuminate\Foundation\Http\FormRequest;

class StoreRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // user already authenticated via middleware
    }

    public function rules(): array
    {
        return [
            'industry' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone_cell' => ['required', 'string', 'max:20'],
            'phone_home' => ['required', 'string', 'max:20'],
            'street' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'zip' => ['required', 'string', 'max:20'],
            'services' => ['required', 'array'],
            'services.*' => ['exists:services,id'],
            'price' => ['required', 'numeric'],
            'incident_report' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'phone_cell.required' => 'Cell phone number is required. Please enter a valid cell phone number.',
            'phone_cell.string' => 'Cell phone number must be a valid string.',
            'phone_cell.max' => 'Cell phone number cannot exceed 20 characters. Please enter a valid phone number.',

            'phone_home.required' => 'Home phone number is required. Please enter a valid home phone number.',
            'phone_home.string' => 'Home phone number must be a valid string.',
            'phone_home.max' => 'Home phone number cannot exceed 20 characters. Please enter a valid phone number.',
        ];
    }
}
