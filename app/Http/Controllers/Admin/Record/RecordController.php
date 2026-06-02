<?php

namespace App\Http\Controllers\Admin\Record;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Models\Industry;
use App\Models\Service;
use App\Services\Admin\Record\RecordService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordController extends Controller
{
    protected RecordService $recordService;

    public function __construct(RecordService $recordService)
    {
        $this->recordService = $recordService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status', 'perPage', 'industry', 'industries']);

        $records = $this->recordService->getPaginatedRecords($filters);

        $industries = Industry::all();

        return Inertia::render('admin/records/index', [
            'records' => $records,
            'filters' => $filters,
            'industries' => $industries,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/records/create', [
            'industries' => Industry::all(),
            'allServices' => Service::all(), // Load all services
        ]);
    }

    public function store(StoreRecordRequest $request)
    {

        $this->recordService->store($request->all(), $request->user()->id);

        return redirect()->route('admin.records.index')
            ->with('success', 'Record Created Successfully');
    }

    public function show($id)
    {

        $record = $this->recordService->find($id);
        if ($record) {
            $record->load(['services', 'industry']);
        }

        return Inertia::render('admin/records/show', [
            'record' => $record
        ]);
    }

    public function edit($id)
    {
        // Load record with its services relationship
        $record = $this->recordService->find($id);

        // Get all industries and services
        $industries = Industry::all();
        $allServices = Service::all();

        // Get selected service IDs from the record
        $selectedServices = $record->services->pluck('id')->map(function ($id) {
            return (string) $id; // Convert to string for JavaScript comparison
        })->toArray();

        return Inertia::render('admin/records/edit', [
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
            ->route('admin.records.index')
            ->with('success', 'Record updated successfully');
    }

    public function destroy(Request $request, $id)
    {
        $this->recordService->deleteRecord(
            $id,
            $request->user()
        );

        return back();
    }


    // public function myRecords(Request $request)

    // {

    //     // $records = $this->recordService->paginate(10);

    //     // return Inertia::render('app/records/index', [
    //     //     'records' => $records,
    //     // ]);

    //     $records = $this->recordService->getPaginatedMyRecords(
    //         $request->all()
    //     );

    //     return inertia('app/my-records/index', [
    //         'records' => $records,
    //         'filters' => $request->only(['search', 'status', 'perPage']),
    //     ]);
    // }
}
