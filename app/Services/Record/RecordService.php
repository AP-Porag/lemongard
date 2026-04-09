<?php

namespace App\Services\Record;

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
}
