<?php

namespace App\Http\Controllers\Admin\Service;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Admin\Service\ServiceService;

class ServiceController extends Controller
{
    protected $service;

    public function __construct(ServiceService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('admin/service/index', [
            'services' => $this->service->list(
                $request->perPage ?? 10,
                $request->search ?? null,
                $request->sortBy ?? 'name',        // Add sortBy
                $request->sortDirection ?? 'asc'   // Add sortDirection
            ),
            'filters' => $request->only(['search', 'perPage', 'page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $industries = Industry::all();
        return Inertia::render('admin/service/create', [
            'industries' => $industries
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:industries,name',
            'industry_id' => 'required|exists:industries,id',
        ]);

        $this->service->create($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Industry $industry)
    {
        return Inertia::render('Admin/Industry/Show', [
            'industry' => $industry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $service = $this->service->find($id);
        $industries = Industry::all();
        return Inertia::render('admin/service/edit', [
            'service' => $service,
            'industries' => $industries
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:industries,name,' . $service->id,
            'industry_id' => 'required|exists:industries,id',
        ]);

        $this->service->update($service, $validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $this->service->delete($service);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
