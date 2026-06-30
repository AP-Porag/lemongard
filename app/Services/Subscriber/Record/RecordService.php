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

    public function searchRecords(array $criteria)
    {
        $required = ['first_name', 'last_name', 'email', 'phone'];
        foreach ($required as $field) {
            if (blank($criteria[$field] ?? null)) {
                return collect();
            }
        }

        $phone = $criteria['phone'];

        return $this->model->query()
            ->with(['industry', 'services'])
            ->where('first_name', 'like', '%' . $criteria['first_name'] . '%')
            ->where('last_name', 'like', '%' . $criteria['last_name'] . '%')
            ->where('email', 'like', '%' . $criteria['email'] . '%')
            ->where(function ($q) use ($phone) {
                $q->where('phone_cell', 'like', '%' . $phone . '%')
                    ->orWhere('phone_home', 'like', '%' . $phone . '%');
            })
            ->latest('id')
            ->take(50)
            ->get()
            ->map(fn($r) => $this->transformRecord($r))
            ->values();
    }

    private function transformRecord($r): array
    {
        // read the relation explicitly — the `industry` column shadows the relationship
        $industry = $r->relationLoaded('industry') ? $r->getRelation('industry') : null;

        return [
            'id'              => $r->id,
            'user_id'         => $r->user_id,
            'first_name'      => $r->first_name,
            'last_name'       => $r->last_name,
            'email'           => $r->email,
            'phone_cell'      => $r->phone_cell,
            'phone_home'      => $r->phone_home,
            'industry'        => $industry ? ['id' => $industry->id, 'name' => $industry->name] : null,
            'services'        => $r->services->map(fn($s) => ['id' => $s->id, 'name' => $s->name])->values(),
            'price'           => $r->price,
            'incident_report' => $r->incident_report,
            'status'          => $r->status,
            'city'            => $r->city,
            'created_at'      => $r->created_at,
        ];
    }
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
}
