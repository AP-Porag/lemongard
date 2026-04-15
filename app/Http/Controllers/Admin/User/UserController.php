<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\Admin\User\UserService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', 'all');
        $perPage = $request->input('perPage', 5);

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // if ($status !== 'all') {
        //     $query->where('status', (int) $status);
        // }

        $users = $query->select(
            'id',
            'name',
            'email',
            'role',
            'avatar',
        )
            ->paginate($perPage)
            ->withQueryString();

        //        return $users;
        return Inertia::render('admin/user/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'perPage' => $perPage,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/user/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|in:admin,user',
        ]);

        $this->userService->createUser($data);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully');
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $item = User::find($id);
        return Inertia::render('admin/user/edit', ['item' => $item]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email',
            'role' => 'required|in:admin,user',
            'status' => 'required|in:0,1',
        ]);

        $user = User::findOrFail($id);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];
        $user->status = $validated['status'];

        $user->save();

        return redirect()->route('admin.users.index')
            ->with('success', 'User Updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index');
    }
}
