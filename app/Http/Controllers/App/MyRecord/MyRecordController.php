<?php

namespace App\Http\Controllers\App\MyRecord;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Models\Industry;
use App\Models\Service;
use App\Services\Subscriber\MyRecord\MyRecordService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyRecordController extends Controller
{
    protected MyRecordService $recordService;

    public function __construct(MyRecordService $recordService)
    {
        $this->recordService = $recordService;
    }

    // MyRecordController.php
    public function index(Request $request)
    {
        $user = $request->user();

        $hasFullAccess = $this->recordService->fullAccess($user);

        // ✅ সব ফিল্টার নিন (industry, industries সহ)
        $filters = $request->only(['search', 'status', 'perPage', 'industry', 'industries']);

        $records = $this->recordService->getPaginatedMyRecords($filters);
        $industries = Industry::all();

        return inertia('app/my-records/index', [
            'records' => $records,
            'filters' => $filters,
            'has_full_access' => $hasFullAccess,
            'industries' => $industries
        ]);
    }

    public function create()
    {
        return Inertia::render('app/records/create');
    }

    public function store(StoreRecordRequest $request)
    {
        $this->recordService->store($request->all(), $request->user()->id);

        return redirect()->route('app.records.index')
            ->with('success', 'Record Submitted Successfully');
    }

    public function show($id)
    {
        $record = $this->recordService->find($id);


        if ($record) {
            $record->load(['services', 'industry']);
        }

        return Inertia::render('app/records/show', [
            'record' => $record
        ]);
    }

    public function edit($id)
    {
        $record = $this->recordService->find($id);


        $industries = Industry::orderBy('name')->get();
        $allServices = Service::orderBy('name')->get();

        // Get selected service IDs from the record
        $selectedServices = $record->services->pluck('id')->map(function ($id) {
            return (string) $id;
        })->toArray();

        return Inertia::render('app/my-records/edit', [
            'record' => $record,
            'industries' => $industries,
            'allServices' => $allServices,
            'selectedServices' => $selectedServices,
        ]);
    }

    public function update(StoreRecordRequest $request, $id)
    {
        $record = $this->recordService->updateRecord(
            $id,
            $request->validated()
        );

        return redirect()
            ->route('app.records.index')
            ->with('success', 'Record updated successfully');
    }
    public function destroy($id)
    {
        $this->recordService->delete($id);

        return redirect()->back()->with('success', 'Record deleted successfully.');
    }
}
