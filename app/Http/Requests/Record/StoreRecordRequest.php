<?php

namespace App\Http\Requests\Record;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            // last_name এবং phone_cell এর কম্বিনেশন ইউনিক চেক করা হচ্ছে
            'last_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('records')->where(function ($query) {
                    return $query->where('phone_cell', $this->phone_cell);
                }),
            ],
            'phone_cell' => ['required', 'string', 'max:20'],
            'phone_home' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'string'],
            'street' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'zip' => ['required', 'string', 'max:5'],
            'services' => ['required', 'array'],
            'services.*' => ['exists:services,id'],
            'price' => ['required', 'numeric'],
            'incident_report' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'last_name.unique' => 'Last Name/Cell Phone Already In Use',
            'phone_cell.required' => 'Cell phone number is required. Please enter a valid cell phone number.',
            'phone_cell.string' => 'Cell phone number must be a valid string.',
            'phone_cell.max' => 'Cell phone number cannot exceed 20 characters. Please enter a valid phone number.',

            'phone_home.required' => 'Home phone number is required. Please enter a valid home phone number.',
            'phone_home.string' => 'Home phone number must be a valid string.',
            'phone_home.max' => 'Home phone number cannot exceed 20 characters. Please enter a valid phone number.',
        ];
    }
}
