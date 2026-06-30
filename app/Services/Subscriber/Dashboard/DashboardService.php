<?php

namespace App\Services\Subscriber\Dashboard;

use App\Models\Record;
use Illuminate\Support\Facades\DB; // Add this
use App\Models\User;
use App\Services\BaseService;
use App\Services\Subscriber\Record\RecordService;

class DashboardService extends BaseService
{
    public function __construct(
        protected RecordService $recordService
    ) {}

    public function getDashboardStats(User $user): array
    {
        return [
            'my_records' => Record::where('user_id', $user->id)->count(),
            'recent_records' => Record::query()
                ->with(['industry:id,name', 'services:id,name'])
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get()
                ->map(fn($r) => $this->transformRecord($r)),
        ];
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

        return Record::query()
            ->with(['industry:id,name', 'services:id,name'])
            ->where('first_name', 'like', '%' . $criteria['first_name'] . '%')
            ->where('last_name', 'like', '%' . $criteria['last_name'] . '%')
            ->where('email', 'like', '%' . $criteria['email'] . '%')
            ->where(function ($q) use ($phone) {
                $q->where('phone_cell', 'like', '%' . $phone . '%')
                    ->orWhere('phone_home', 'like', '%' . $phone . '%');
            })
            ->latest()
            ->take(50)
            ->get()
            ->map(fn($r) => $this->transformRecord($r));
    }

    private function transformRecord($r): array
    {
        $industry = $r->relationLoaded('industry') ? $r->getRelation('industry') : $r->industry()->first();
        $services = $r->relationLoaded('services') ? $r->getRelation('services') : $r->services()->get();

        return [
            'id'              => $r->id,
            'user_id'         => $r->user_id,
            'first_name'      => $r->first_name,
            'last_name'       => $r->last_name,
            'email'           => $r->email,
            'phone_cell'      => $r->phone_cell,
            'phone_home'      => $r->phone_home,
            'industry'        => $industry ? ['id' => $industry->id, 'name' => $industry->name] : null,
            'services'        => $services->map(fn($s) => ['id' => $s->id, 'name' => $s->name])->values(),
            'price'           => $r->price,
            'incident_report' => $r->incident_report,
            'status'          => $r->status,
            'city'            => $r->city,
            'created_at'      => $r->created_at,
        ];
    }
}
