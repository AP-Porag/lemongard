<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        'user_id',
        'industry',
        'first_name',
        'last_name',
        'phone_cell',
        'phone_home',
        'street',
        'city',
        'state',
        'zip',
        'service',
        'price',
        'incident_report'
    ];
}
