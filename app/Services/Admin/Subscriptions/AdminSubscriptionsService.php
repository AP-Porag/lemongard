<?php

namespace App\Services\Admin\Subscriptions;

use App\Models\Record;
use App\Models\User;
use App\Services\BaseService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Subscription;

class AdminSubscriptionsService extends BaseService
{
    public function __construct(Subscription $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated subscriptions with filters.
     *
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getSubscriptions(array $filters)
    {
        $query = $this->model->query()->with('user');

        // Search by user name or email
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by status (stripe_status)
        if (!empty($filters['status'])) {
            $query->where('stripe_status', $filters['status']);
        }

        // Sorting
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $filters['perPage'] ?? 10;

        return $query->paginate($perPage)->withQueryString();
    }

    public function getSubscription($id)
    {
        return $this->model->with('user')->findOrFail($id);
    }
}
