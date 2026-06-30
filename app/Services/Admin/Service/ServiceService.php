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
        $query = Service::with('industry');

        // Apply search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('industry', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Apply sorting
        if ($sortBy === 'industry') {
            // Sort by industry name
            $query->leftJoin('industries', 'services.industry_id', '=', 'industries.id')
                ->orderBy('industries.name', $sortDirection)
                ->select('services.*'); // Prevent column conflicts
        } else {
            $query->orderBy($sortBy, $sortDirection);
        }

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
