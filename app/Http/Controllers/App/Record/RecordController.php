<?php

namespace App\Http\Controllers\App\Record;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Models\Industry;
use App\Models\Record;
use App\Models\Service;
use App\Services\Subscriber\Record\RecordService;
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

    // RecordController.php
    public function index(Request $request)
    {
        $user = $request->user();


        $filters = $request->only(['search', 'status', 'perPage', 'industry', 'industries']);


        $hasFullAccess = $this->recordService->fullAccess($user);
        $records = $this->recordService->getPaginatedRecords($filters);
        $industries = Industry::all();

        return Inertia::render('app/records/index', [
            'records' => $records,
            'filters' => $filters,
            'has_full_access' => $hasFullAccess,
            'industries' => $industries,
        ]);
    }
    public function create(Request $request)
    {

        $user = auth()->user();
        $userIndustries = $user->industries;
        return Inertia::render('app/records/create', [
            'industries' => $userIndustries,
            'allServices' => Service::all(), // Load all services
        ]);
    }
    public function store(StoreRecordRequest $request)
    {
        // $this->recordService->store(
        //     $request->validated(),
        //     Auth::id()
        // );

        // return redirect()->back()->with('success', 'Record created successfully.');
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

    // public function edit($id)
    // {
    //     $record = $this->recordService->find($id);

    //     return Inertia::render('app/records/edit', [
    //         'record' => $record
    //     ]);
    // }

    // app/Http/Controllers/RecordController.php

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

        return Inertia::render('app/records/edit', [
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


    // public function update(StoreRecordRequest $request, $id)
    // {
    //     $record = $this->recordService->updateRecord(
    //         $id,
    //         $request->validated()
    //     );

    //     return redirect()
    //         ->route('app.records.index')
    //         ->with('success', 'Record updated successfully');
    // }
    public function destroy($id)
    {
        $this->recordService->delete($id);

        return redirect()->back()->with('success', 'Record deleted successfully.');
    }


    public function myRecords(Request $request)

    {
        $user = $request->user();

        $hasFullAccess = $this->recordService->fullAccess($user);

        $records = $this->recordService->getPaginatedMyRecords(
            $request->all()
        );

        return inertia('app/my-records/index', [
            'records' => $records,
            'filters' => $request->only(['search', 'status', 'perPage']),
            'has_full_access' => $hasFullAccess, // 🔥 send to frontend
        ]);
    }
    public function resolve(Record $record)
    {
        $record->update([
            'status' => 'resolved',
        ]);

        return back();
    }
}
