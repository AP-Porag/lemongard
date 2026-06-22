<?php

namespace App\Services\Admin\Record;

use App\Models\Record;
use App\Models\User;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class RecordService extends BaseService
{
    public function __construct(Record $model)
    {
        parent::__construct($model);
    }

    public function store(array $data, int $userId): Record
    {
        $data['user_id'] = $userId;

        // Extract services from data
        $services = $data['services'] ?? [];
        unset($data['services']); // Remove services from main data array

        // Use DB transaction to ensure both operations succeed or fail together
        DB::beginTransaction();

        try {
            // ✅ create record
            $record = $this->create($data);

            // ✅ Attach services to pivot table (record_service)
            if (!empty($services)) {
                $record->services()->attach($services);
                // OR use sync if you want to replace existing (for update operations)
                // $record->services()->sync($services);
            }

            // ✅ update user first login
            $user = User::find($userId);

            if ($user && $user->is_first_login) {
                $user->update([
                    'is_first_login' => false,
                ]);
            }

            DB::commit();

            // Load the services relationship before returning
            $record->load('services');

            return $record;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function getPaginatedRecords(array $filters)
    {
        $query = $this->model->with(['industry', 'services']);

        // লাস্ট নেম অনুযায়ী সাজানো
        $sortBy = $filters['sort_by'] ?? 'last_name';
        $sortOrder = $filters['sort_order'] ?? 'asc';

        $allowedSortColumns = ['last_name', 'first_name', 'created_at', 'updated_at'];

        if (in_array($sortBy, $allowedSortColumns)) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('last_name', 'asc');
        }

        // সার্চ ফিল্টার
        if (!empty($filters['search'])) {
            $search = $filters['search'];
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
        }

        // ✅ ইন্ডাস্ট্রি ফিল্টার - যেহেতু records.industry কলামে ইন্ডাস্ট্রির নাম আছে (স্ট্রিং)

        // মাল্টি ইন্ডাস্ট্রি ফিল্টার (industries array থেকে)
        $industryNames = $filters['industries'] ?? [];

        // ডিবাগ লগ
        Log::info('Industry Filter Debug:', [
            'industries_from_filters' => $industryNames,
            'is_array' => is_array($industryNames)
        ]);

        if (is_array($industryNames) && !empty($industryNames)) {
            // ফিল্টার থেকে খালি মান বাদ দিন
            $industryNames = array_filter($industryNames, function ($name) {
                return !empty($name) && $name !== 'all';
            });

            if (!empty($industryNames)) {
                // ✅ industry কলামে নাম দিয়ে ফিল্টার
                $query->whereIn('industry', $industryNames);
                Log::info('Applied multi industry filter:', ['names' => $industryNames]);
            }
        }
        // সিঙ্গেল ইন্ডাস্ট্রি ফিল্টার (ব্যাকওয়ার্ড কম্প্যাটিবিলিটি)
        elseif (!empty($filters['industry']) && $filters['industry'] !== '' && $filters['industry'] !== 'all') {
            $industryName = $filters['industry'];
            $query->where('industry', $industryName);
            Log::info('Applied single industry filter:', ['name' => $industryName]);
        }

        return $query->latest('id')
            ->paginate($filters['perPage'] ?? 5)
            ->withQueryString();
    }
    // public function getPaginatedRecords(array $filters)
    // {
    //     $query = $this->model->with(['industry', 'services']);
    //     // ✅ লাস্ট নেম অনুযায়ী সাজানো
    //     $sortBy = $filters['sort_by'] ?? 'last_name';
    //     $sortOrder = $filters['sort_order'] ?? 'asc';

    //     // সাজানোর জন্য অনুমোদিত কলাম
    //     $allowedSortColumns = ['last_name', 'first_name', 'created_at', 'updated_at'];

    //     if (in_array($sortBy, $allowedSortColumns)) {
    //         $query->orderBy($sortBy, $sortOrder);
    //     } else {
    //         $query->orderBy('last_name', 'asc'); // ডিফল্ট
    //     }

    //     // সার্চ ফিল্টার
    //     if (!empty($filters['search'])) {
    //         $search = $filters['search'];
    //         $query->where(function ($q) use ($search) {
    //             $q->where('first_name', 'like', "%{$search}%")
    //                 ->orWhere('last_name', 'like', "%{$search}%")
    //                 ->orWhere('phone_cell', 'like', "%{$search}%")
    //                 ->orWhere('city', 'like', "%{$search}%")
    //                 ->orWhere('state', 'like', "%{$search}%")
    //                 ->orWhere('zip', 'like', "%{$search}%")
    //                 ->orWhere('street', 'like', "%{$search}%")
    //                 ->orWhere('incident_report', 'like', "%{$search}%")
    //                 ->orWhereHas('industry', function ($q) use ($search) {
    //                     $q->where('name', 'like', "%{$search}%");
    //                 })
    //                 ->orWhereHas('services', function ($q) use ($search) {
    //                     $q->where('name', 'like', "%{$search}%");
    //                 });
    //         });
    //     }

    //     // // ✅ ইন্ডাস্ট্রি ফিল্টার - এটা নিশ্চিত করুন
    //     // if (isset($filters['industry']) && $filters['industry'] !== '' && $filters['industry'] !== 'all') {
    //     //     $industryId = (int) $filters['industry'];
    //     //     $query->where('industry', $industryId);
    //     // }

    //     // // মাল্টি ইন্ডাস্ট্রি
    //     // if (!empty($filters['industries']) && is_array($filters['industries'])) {
    //     //     $industryIds = array_map('intval', $filters['industries']);
    //     //     $query->whereIn('industry', $industryIds);
    //     // }

    //     // Single + multi industry support (SAFE + BACKWARD COMPATIBLE)
    //     $industryIds = $filters['industries'] ?? [];
    //     if (is_array($industryIds)) {
    //         $industryIds = array_filter($industryIds); // remove empty values

    //         if (count($industryIds) > 0) {
    //             $query->whereIn('industry', array_map('intval', $industryIds));
    //         }
    //     } elseif (!empty($filters['industry']) && $filters['industry'] !== 'all') {
    //         $query->where('industry', (int) $filters['industry']);
    //     }

    //     return $query->latest()
    //         ->paginate($filters['perPage'] ?? 5)
    //         ->withQueryString();
    // }
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
    // public function updateRecord(int $id, array $data, User $user)
    // {
    //     $record = $this->model->findOrFail($id);

    //     if ($user->role !== 'admin' && $record->user_id !== $user->id) {
    //         abort(403, 'Unauthorized');
    //     }

    //     $record->update($data);

    //     return $record;
    // }

    public function updateRecord(int $id, array $data): Record
    {
        // Extract services from data
        $services = $data['services'] ?? [];
        unset($data['services']); // Remove services from main data array

        // Use DB transaction to ensure both operations succeed or fail together
        DB::beginTransaction();

        try {
            // Find and update the record
            $record = $this->model->findOrFail($id);
            $record->update($data);

            // Sync services - this will handle pivot table
            // sync() method will:
            // 1. Add new services that aren't already attached
            // 2. Remove services that are no longer selected
            // 3. Keep existing services that are still selected
            if (!empty($services)) {
                $record->services()->sync($services);
            } else {
                // If no services selected, remove all existing services
                $record->services()->detach();
            }

            DB::commit();

            // Reload the services relationship
            $record->load('services');

            return $record;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function findWithServices($id)
    {
        $record = parent::find($id); // বেস সার্ভিসের find মেথড কল
        if ($record) {
            $record->load('services');
        }
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
