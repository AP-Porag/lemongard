<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'industry_id'
    ];

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    // Relationship with Record
    public function records()
    {
        return $this->belongsToMany(Record::class, 'record_service');
    }
}
