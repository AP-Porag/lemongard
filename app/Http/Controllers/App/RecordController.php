<?php


namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\Requests\Record\StoreRecordRequest;
use App\Services\Record\RecordService;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    public function __construct(protected RecordService $recordService) {}

    public function store(StoreRecordRequest $request)
    {
        $this->recordService->createForUser(
            $request->validated(),
            Auth::id()
        );

        Auth::user()->update([
            'is_first_login' => false
        ]);

        return redirect()->route('app.dashboard');
    }
}
