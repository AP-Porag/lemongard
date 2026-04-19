<?php

namespace App\Services\Subscriber\Support;

use App\Models\Support;
use App\Services\BaseService;

class SupportService extends BaseService
{
    public function __construct()
    {
        parent::__construct(new Support());
    }
}
