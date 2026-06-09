<?php

namespace App\Services\Subscriber\Record;

use App\Models\Record;
use Illuminate\Support\Facades\DB; // Add this
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

        // ✅ লগইন করা ইউজারের ইন্ডাস্ট্রি আইডি গুলো পাওয়া
        $user = auth()->user();
        $userIndustryIds = $user->industries()->pluck('industries.id')->toArray();

        // ✅ লাস্ট নেম অনুযায়ী সাজানো
        $sortBy = $filters['sort_by'] ?? 'last_name';
        $sortOrder = $filters['sort_order'] ?? 'asc';

        // সাজানোর জন্য অনুমোদিত কলাম
        $allowedSortColumns = ['last_name', 'first_name', 'created_at', 'updated_at'];

        if (in_array($sortBy, $allowedSortColumns)) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->orderBy('last_name', 'asc'); // ডিফল্ট
        }

        // ✅ শুধু ইউজারের ইন্ডাস্ট্রি সম্পর্কিত রেকর্ড দেখাবে
        if (!empty($userIndustryIds)) {
            $query->whereIn('industry', $userIndustryIds); // records টেবিলের industry_id কলাম
        } else {
            // যদি ইউজারের কোন ইন্ডাস্ট্রি না থাকে, তাহলে খালি রেজাল্ট রিটার্ন করবে
            return $query->whereRaw('1=0')->paginate($filters['perPage'] ?? 5);
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
                    });
            });
        }

        // ✅ অতিরিক্ত ইন্ডাস্ট্রি ফিল্টার (যদি ড্রপডাউন থেকে সিলেক্ট করে)
        if (isset($filters['industry']) && $filters['industry'] !== '' && $filters['industry'] !== 'all') {
            $industryId = (int) $filters['industry'];
            // চেক করুন এই ইন্ডাস্ট্রি ইউজারের ইন্ডাস্ট্রির মধ্যে আছে কিনা
            if (in_array($industryId, $userIndustryIds)) {
                $query->where('industry_id', $industryId);
            }
        }

        // মাল্টি ইন্ডাস্ট্রি ফিল্টার
        if (!empty($filters['industries']) && is_array($filters['industries'])) {
            $industryIds = array_map('intval', $filters['industries']);
            // শুধু ইউজারের ইন্ডাস্ট্রির সাথে ম্যাচ করানো ইন্ডাস্ট্রিগুলো নিবে
            $validIndustryIds = array_intersect($industryIds, $userIndustryIds);
            if (!empty($validIndustryIds)) {
                $query->whereIn('industry_id', $validIndustryIds);
            }
        }

        return $query->latest('id')
            ->paginate($filters['perPage'] ?? 5)
            ->withQueryString();
    }



    // RecordService.php
    // public function getPaginatedRecords(array $filters)
    // {
    //     $query = $this->model->with(['industry', 'services']);

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

    //     // ✅ ইন্ডাস্ট্রি ফিল্টার - এটা নিশ্চিত করুন
    //     if (isset($filters['industry']) && $filters['industry'] !== '' && $filters['industry'] !== 'all') {
    //         $industryId = (int) $filters['industry'];
    //         $query->where('industry', $industryId);
    //     }

    //     // মাল্টি ইন্ডাস্ট্রি
    //     if (!empty($filters['industries']) && is_array($filters['industries'])) {
    //         $industryIds = array_map('intval', $filters['industries']);
    //         $query->whereIn('industry', $industryIds);
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

    public function fullAccess($user): bool
    {
        return $this->hasFullAccess($user);
    }

    public function baseQuery()
    {
        return DB::table('subscriptions');
    }


    public function getDashboardStats(User $user): array
    {
        return [
            'total_records' => Record::count(),
            'my_records' => Record::where('user_id', $user->id)->count(),
            'recent_records' => Record::query()
                ->latest()
                ->take(5)
                ->get([
                    'id',
                    'first_name',
                    'last_name',
                    // 'service',
                    'city',
                    'created_at',
                ]),
        ];
    }
}
