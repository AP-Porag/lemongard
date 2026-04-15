<?php

namespace App\Services\Admin\User;

use App\Models\User;
use App\Services\BaseService;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Create new user
     */
    public function createUser(array $data)
    {
        return $this->model->create([
            'name' => $data['first_name'] . ' ' . $data['last_name'],
            'email'      => $data['email'],
            'role'       => $data['role'],
            'password'   => Hash::make('password'), // default password
        ]);
    }

    /**
     * Update user
     */
    public function updateUser(User $user, array $data)
    {
        $user->update([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => $data['email'],
            'role'       => $data['role'],
        ]);

        return $user;
    }

    /**
     * Delete user
     */
    public function deleteUser(User $user)
    {
        return $user->delete();
    }

    /**
     * Get all users (for admin table)
     */
    public function getAllUsers()
    {
        return $this->model->latest()->paginate(10);
    }

    /**
     * Get single user
     */
    public function getUserById(int $id)
    {
        return $this->model->findOrFail($id);
    }
}
