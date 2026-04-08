<?php

namespace App\Services\Record;

use App\Services\BaseService;
use App\Models\Record;

class RecordService extends BaseService
{
    public function __construct(Record $record)
    {
        parent::__construct($record);
    }

    public function createForUser(array $data, int $userId)
    {
        $data['user_id'] = $userId;

        return $this->create($data);
    }
}
