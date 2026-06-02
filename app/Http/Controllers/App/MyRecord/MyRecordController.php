<?php

namespace App\Http\Controllers\App\MyRecord;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Models\Industry;
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

    public function index(Request $request)
    {
        $user = $request->user();

        $hasFullAccess = $this->recordService->fullAccess($user);

        $records = $this->recordService->getPaginatedMyRecords(
            $request->all()
        );
        $industries = Industry::all();

        return inertia('app/my-records/index', [
            'records' => $records,
            'filters' => $request->only(['search', 'status', 'perPage']),
            'has_full_access' => $hasFullAccess, // 🔥 send to frontend,
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

        return Inertia::render('app/records/edit', [
            'record' => $record
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
