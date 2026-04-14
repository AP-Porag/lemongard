<?php

namespace App\Services\Admin\Record;

use App\Models\Record;
use App\Models\User;
use App\Services\BaseService;

class RecordService extends BaseService
{
    public function __construct(Record $model)
    {
        parent::__construct($model);
    }

    public function store(array $data, int $userId): Record
    {
        $data['user_id'] = $userId;

        // ✅ create record
        $record = $this->create($data);

        // ✅ update user first login
        $user = User::find($userId);

        if ($user && $user->is_first_login) {
            $user->update([
                'is_first_login' => false,
            ]);
        }

        return $record;
    }
    public function getPaginatedRecords(array $filters)
    {
        return $this->model
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('phone_cell', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('service', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate($filters['perPage'] ?? 5)
            ->withQueryString();
    }

    // public function getPaginatedMyRecords(array $filters)
    // {
    //     return $this->model
    //         ->where('user_id', auth()->id()) // 🔥 ownership inside service

    //         ->when($filters['search'] ?? null, function ($query, $search) {
    //             $query->where(function ($q) use ($search) {
    //                 $q->where('first_name', 'like', "%{$search}%")
    //                     ->orWhere('last_name', 'like', "%{$search}%")
    //                     ->orWhere('phone_cell', 'like', "%{$search}%")
    //                     ->orWhere('city', 'like', "%{$search}%")
    //                     ->orWhere('service', 'like', "%{$search}%");
    //             });
    //         })

    //         ->when($filters['status'] ?? null, function ($query, $status) {
    //             $query->where('status', $status);
    //         })

    //         ->latest()
    //         ->paginate($filters['perPage'] ?? 5)
    //         ->withQueryString();
    // }
    //Record Update
    public function updateRecord(int $id, array $data, User $user)
    {
        $record = $this->model->findOrFail($id);

        if ($user->role !== 'admin' && $record->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        $record->update($data);

        return $record;
    }

    public function deleteRecord(int $id, User $user)
    {
        $record = $this->model->findOrFail($id);

        if ($user->role !== 'admin' && $record->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        return $record->delete();
    }
}
