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
        'incident_report',
        'status'
    ];

    // Many-to-many relationship with Service
    public function services()
    {
        return $this->belongsToMany(Service::class, 'record_service', 'record_id', 'service_id')
            ->withTimestamps();
    }

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
