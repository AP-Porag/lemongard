<?php

namespace App\Services\Admin\Service;

use App\Models\Industry;
use App\Models\Service;

class ServiceService
{
    // public function list($perPage = 10, $search = null)
    // {
    //     return Service::query()->with('industry')
    //         ->when($search, function ($query) use ($search) {
    //             $query->where('name', 'like', "%{$search}%");
    //         })
    //         ->latest()
    //         ->paginate($perPage);
    // }

    public function list($perPage = 10, $search = null, $sortBy = 'name', $sortDirection = 'asc')
    {
        // Industry is ALWAYS the primary key. The sort headers only flip direction.
        $industryDirection = $sortBy === 'industry' ? $sortDirection : 'asc';
        $serviceDirection  = $sortBy === 'name'     ? $sortDirection : 'asc';

        $query = Service::with('industry')
            ->leftJoin('industries', 'services.industry_id', '=', 'industries.id')
            ->select('services.*'); // prevent column collisions from the join

        // Apply search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('services.name', 'like', "%{$search}%")
                    ->orWhere('industries.name', 'like', "%{$search}%");
            });
        }

        // Industry first → service second → id as a deterministic tiebreaker
        $query->orderBy('industries.name', $industryDirection)
            ->orderBy('services.name', $serviceDirection)
            ->orderBy('services.id', 'asc');

        return $query->paginate($perPage);
    }

    public function create(array $data)
    {
        return Service::create($data);
    }

    public function update(Service $service, array $data)
    {
        $service->update($data);
        return $service;
    }

    public function delete(Service $service)
    {
        return $service->delete();
    }

    public function find($id)
    {
        return Service::findOrFail($id);
    }
}
