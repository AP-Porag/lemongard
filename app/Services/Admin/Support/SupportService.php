<?php

namespace App\Services\Admin\Support;

use App\Models\Support;
use App\Services\BaseService;

class SupportService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new Support());
    }

    public function allMessage()
    {
        return Support::orderBy('created_at', 'desc')->get();
    }


    public function updateStatus($id, $status)
    {
        $support = Support::findOrFail($id);

        $support->update([
            'status' => $status
        ]);

        return $support;
    }
}
