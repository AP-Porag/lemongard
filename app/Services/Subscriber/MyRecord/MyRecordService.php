<?php

namespace App\Services\Subscriber\MyRecord;

use App\Models\Record;
use App\Models\User;
use App\Services\BaseService;

class MyRecordService extends BaseService
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

    // MyRecordService.php
    public function getPaginatedMyRecords(array $filters)
    {
        return $this->model
            ->with(['industry', 'services'])
            ->where('user_id', auth()->id())
            ->orderBy('last_name', 'asc')


            // সার্চ ফিল্টার
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('phone_cell', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('state', 'like', "%{$search}%")
                        ->orWhere('zip', 'like', "%{$search}%")
                        ->orWhere('street', 'like', "%{$search}%")
                        ->orWhere('incident_report', 'like', "%{$search}%")
                        ->orWhereHas('industry', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })
                        ->orWhereHas('services', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })->orWhereRaw("CONCAT_WS(' ', first_name, last_name, phone_cell) LIKE ?", ["%{$search}%"])
                        ->orWhereRaw("CONCAT_WS(' ', last_name, first_name, phone_cell) LIKE ?", ["%{$search}%"]);
                });
            })

            // স্ট্যাটাস ফিল্টার
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })

            // ✅ ইন্ডাস্ট্রি ফিল্টার (সিঙ্গেল)
            ->when(isset($filters['industry']) && $filters['industry'] !== '' && $filters['industry'] !== 'all', function ($query) use ($filters) {
                $industryId = (int) $filters['industry'];
                $query->where('industry', $industryId);
            })

            // ✅ ইন্ডাস্ট্রি ফিল্টার (মাল্টি)
            ->when(!empty($filters['industries']) && is_array($filters['industries']), function ($query) use ($filters) {
                $industryIds = array_map('intval', $filters['industries']);
                $query->whereIn('industry', $industryIds);
            })

            ->latest()
            ->paginate($filters['perPage'] ?? 5)
            ->withQueryString();
    }
    //Record Update
    public function updateRecord(int $id, array $data)
    {
        $record = $this->model->findOrFail($id);

        // ✅ 1) Services আলাদা করে নিন (pivot table এ sync হবে)
        $serviceIds = null;
        if (array_key_exists('services', $data)) {
            $serviceIds = array_filter((array) $data['services'], fn($v) => $v !== '' && $v !== null);
            unset($data['services']);   // scalar update থেকে বাদ
        }

        // ✅ 2) Record-এর scalar fields update
        $record->update($data);

        // ✅ 3) Pivot table sync — এটাই মূল fix
        if ($serviceIds !== null) {
            $record->services()->sync($serviceIds);
        }

        return $record->fresh(['services', 'industry', 'user']);
    }
    public function fullAccess($user): bool
    {
        return $this->hasFullAccess($user);
    }
}
