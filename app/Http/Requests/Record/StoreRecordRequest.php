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
            'phone_home' => ['nullable', 'string', 'max:20'],
            'street' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'zip' => ['required', 'string', 'max:20'],
            'service' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'incident_report' => ['nullable', 'string'],
        ];
    }
}
