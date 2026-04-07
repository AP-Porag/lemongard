<?php

namespace App\Services\Record;

use App\Services\BaseService;
use App\Models\Record;
use App\Models\User;

class RecordService extends BaseService
{
    public function __construct(Record $record)
    {
        parent::__construct($record);
    }

    public function getDashboardData()
    {
        return [
            'stats' => [
                'total_records' => $this->model->count(),
                'my_records' => $this->model->where('user_id', auth()->id())->count(),
                'total_users' => User::count(),
            ],

            'latest_records' => $this->model
                ->latest()
                ->limit(5)
                ->get([
                    'id',
                    'first_name',
                    'last_name',
                    'city',
                    'service',
                    'created_at'
                ]),
        ];
    }
}
