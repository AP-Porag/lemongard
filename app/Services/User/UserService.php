<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Services\BaseService;
use App\Utils\GlobalConstant;

class UserService extends BaseService
{
    public function __construct(User $user)
    {
        parent::__construct($user); // ✅ correct model pass
    }

    public function register(array $data): User
    {
        return $this->model->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => GlobalConstant::ROLE_USER,
            'industry' => $data['industry'] ?? null,
            'company' => $data['company'] ?? null,
            'agree_to_terms' => $data['agree_to_terms'],
            'marketing_emails' => $data['marketing_emails'] ?? false,
        ]);
    }
}
