<?php

namespace App\Http\Controllers\Admin\Record;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
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
        $filters = $request->only(['search', 'status', 'perPage']);

        $records = $this->recordService->getPaginatedRecords($filters);

        return Inertia::render('admin/records/index', [
            'records' => $records,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/records/create');
    }

    public function store(StoreRecordRequest $request)
    {
        // $this->recordService->store(
        //     $request->validated(),
        //     Auth::id()
        // );

        // return redirect()->back()->with('success', 'Record created successfully.');
        $this->recordService->store($request->all(), $request->user()->id);

        return redirect()->route('admin.records.index')
            ->with('success', 'Record Submitted Successfully');
    }

    public function show($id)
    {
        $record = $this->recordService->find($id);

        return Inertia::render('admin/records/show', [
            'record' => $record
        ]);
    }

    public function edit($id)
    {
        $record = $this->recordService->find($id);

        return Inertia::render('admin/records/edit', [
            'record' => $record
        ]);
    }

    public function update(StoreRecordRequest $request, $id)
    {
        $this->recordService->updateRecord(
            $id,
            $request->validated(),
            $request->user()
        );

        return redirect()->route('admin.records.index')
            ->with('success', 'Record updated successfully');
    }

    public function destroy(Request $request, $id)
    {
        $this->recordService->deleteRecord(
            $id,
            $request->user()
        );

        return back()->with('success', 'Record deleted successfully.');
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
