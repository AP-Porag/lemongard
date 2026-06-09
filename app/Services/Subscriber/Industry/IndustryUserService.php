<?php

namespace App\Services\Subscriber\Industry;

use App\Models\User;

class IndustryUserService
{
    public function attach(User $user, int $industryId): void
    {
        $user->industries()->syncWithoutDetaching([
            $industryId
        ]);
    }
}
