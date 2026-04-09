<?php

namespace App\Services\Record;

use App\Models\Record;
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

        return $this->create($data);
    }
}
