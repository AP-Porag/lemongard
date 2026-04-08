<?php

namespace App\Http\Requests\Record;

use Illuminate\Foundation\Http\FormRequest;

class StoreRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'industry' => 'nullable|string|max:255',

            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',

            'phone_cell' => 'required|string|max:20',
            'phone_home' => 'nullable|string|max:20',

            'street' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:20',

            'service' => 'required|string|max:255',
            'price' => 'nullable|numeric',

            'incident_report' => 'nullable|string',

            'company_name' => 'nullable|string|max:255',
        ];
    }
}
