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
        'email',
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

    public function industry()
    {
        // 'industry' is the foreign key in records table, 'id' is primary key in industries table
        return $this->belongsTo(Industry::class, 'industry', 'id');
    }

    // Accessor for industry name
    public function getIndustryNameAttribute()
    {
        return $this->industry ? $this->industry->name : 'N/A';
    }
}
