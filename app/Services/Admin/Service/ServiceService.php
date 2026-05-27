<?php

namespace App\Services\Admin\Service;

use App\Models\Industry;
use App\Models\Service;

class ServiceService
{
    public function list($perPage = 10, $search = null)
    {
        return Service::query()->with('industry')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);
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
