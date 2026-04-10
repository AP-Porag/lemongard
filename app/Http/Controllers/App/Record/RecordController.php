<?php

namespace App\Http\Controllers\App\Record;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Services\Record\RecordService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecordController extends Controller
{
    protected RecordService $recordService;

    public function __construct(RecordService $recordService)
    {
        $this->recordService = $recordService;
    }

    public function index()
    {
        $records = $this->recordService->paginate(10);

        return Inertia::render('app/records/index', [
            'records' => $records
        ]);
    }

    public function create()
    {
        return Inertia::render('app/records/create');
    }

    public function store(StoreRecordRequest $request)
    {
        // $this->recordService->store(
        //     $request->validated(),
        //     Auth::id()
        // );

        // return redirect()->back()->with('success', 'Record created successfully.');
        $this->recordService->store($request->all(), $request->user()->id);

        return back()->with('success', 'Record Submitted Successfully');;
    }

    public function show($id)
    {
        $record = $this->recordService->find($id);

        return Inertia::render('app/records/show', [
            'record' => $record
        ]);
    }

    public function edit($id)
    {
        $record = $this->recordService->find($id);

        return Inertia::render('app/records/edit', [
            'record' => $record
        ]);
    }

    public function update(StoreRecordRequest $request, $id)
    {
        $this->recordService->update($id, $request->validated());

        return redirect()->back()->with('success', 'Record updated successfully.');
    }

    public function destroy($id)
    {
        $this->recordService->delete($id);

        return redirect()->back()->with('success', 'Record deleted successfully.');
    }
}
