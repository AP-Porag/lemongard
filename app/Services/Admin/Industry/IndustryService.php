<?php

namespace App\Services\Admin\Industry;

use App\Models\Industry;

class IndustryService
{
    public function list($perPage = 10, $search = null)
    {
        return Industry::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data)
    {
        return Industry::create($data);
    }

    public function update(Industry $industry, array $data)
    {
        $industry->update($data);
        return $industry;
    }

    public function delete(Industry $industry)
    {
        return $industry->delete();
    }

    public function find($id)
    {
        return Industry::findOrFail($id);
    }
}
