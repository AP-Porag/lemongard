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
use Illuminate\Support\Facades\Mail;
use App\Mail\UserInactiveMail;
use App\Mail\AdminUserInactiveMail;

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

    // public function index(Request $request)
    // {
    //     $search = $request->input('search', '');
    //     $status = $request->input('status', 'all');
    //     $perPage = $request->input('perPage', 5);
    //     $sortBy = $request->input('sort_by', 'name');
    //     $sortOrder = $request->input('sort_order', 'asc');

    //     $query = User::query()->with('industries');

    //     if ($search) {
    //         $query->where(function ($q) use ($search) {
    //             $q->where('name', 'like', "%{$search}%")
    //                 ->orWhere('role', 'like', "%{$search}%")
    //                 ->orWhere('email', 'like', "%{$search}%");
    //         });
    //     }

    //     // Sorting
    //     switch ($sortBy) {

    //         case 'industry':
    //             $query->leftJoin('industry_user', 'users.id', '=', 'industry_user.user_id')
    //                 ->leftJoin('industries', 'industry_user.industry_id', '=', 'industries.id')
    //                 ->orderBy('industries.name', $sortOrder)
    //                 ->select('users.*')
    //                 ->distinct();
    //             break;

    //         case 'created_at':
    //             $query->orderBy('users.created_at', $sortOrder);
    //             break;

    //         case 'name':
    //         default:
    //             $query->orderBy('users.name', $sortOrder);
    //             break;
    //     }

    //     $users = $query->select(
    //         'id',
    //         'name',
    //         'email',
    //         'role',
    //         'status',
    //         'avatar',
    //     )
    //         ->paginate($perPage)
    //         ->withQueryString();


    //     //        return $users;
    //     return Inertia::render('admin/user/index', [
    //         'users' => $users,
    //         'filters' => [
    //             'search' => $search,
    //             'status' => $status,
    //             'perPage' => $perPage,
    //             'sort_by' => $sortBy,
    //             'sort_order' => $sortOrder,
    //         ],
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $status = $request->input('status', 'all');
        $perPage = $request->input('perPage', 5);
        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');

        $query = User::query()->with('industries');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        switch ($sortBy) {

            case 'industry':
                $query
                    ->leftJoin('industry_user', 'users.id', '=', 'industry_user.user_id')
                    ->leftJoin('industries', 'industry_user.industry_id', '=', 'industries.id')
                    ->selectRaw('
            users.id,
            users.name,
            users.email,
            users.role,
            users.status,
            users.avatar,
            MIN(industries.name) as industry_name
        ')
                    ->groupBy(
                        'users.id',
                        'users.name',
                        'users.email',
                        'users.role',
                        'users.status',
                        'users.avatar'
                    )
                    ->orderBy('industry_name', $sortOrder);

                break;

            case 'created_at':
                $query->orderBy('users.created_at', $sortOrder);
                break;

            case 'name':
            default:
                $query->orderBy('users.name', $sortOrder);
                break;
        }

        if ($sortBy !== 'industry') {
            $query->select(
                'users.id',
                'users.name',
                'users.email',
                'users.role',
                'users.status',
                'users.avatar',
            );
        }

        $users = $query
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('admin/user/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'perPage' => $perPage,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }
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
    // public function update(Request $request, string $id)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|string|min:3',
    //         'email' => 'required|email',
    //         'role' => 'required|in:admin,user',
    //         'status' => 'required|in:0,1',
    //     ]);

    //     $user = User::findOrFail($id);

    //     $user->name = $validated['name'];
    //     $user->email = $validated['email'];
    //     $user->role = $validated['role'];
    //     $user->status = $validated['status'];

    //     $user->save();

    //     return redirect()->route('admin.users.index')
    //         ->with('success', 'User Updated successfully');
    // }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'email' => 'required|email',
            'role' => 'required|in:admin,user',
            'status' => 'required|in:0,1',
        ]);

        $user = User::findOrFail($id);

        $user->update([
            'name'   => $validated['name'],
            'email'  => $validated['email'],
            'role'   => $validated['role'],
            'status' => $validated['status'],
        ]);

        // User became inactive
        if ((int) $validated['status'] === 0) {

            // Cancel Stripe subscription
            if ($user->subscribed('default')) {
                $user->subscription('default')->cancelNow();
            }

            // Remove remember me token
            $user->remember_token = null;
            $user->save();

            // Logout all devices (Database session driver)
            DB::table('sessions')
                ->where('user_id', $user->id)
                ->delete();

            // Send email
            Mail::to($user->email)->send(new UserInactiveMail($user));
            // Send confirmation mail to admin
            Mail::to(auth()->user()->email)
                ->send(new AdminUserInactiveMail(
                    $user,
                    auth()->user()
                ));
        }


        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // ১. ইউজারের সব সেশন ডিলিট করুন (যাতে লগআউট হয়)
        DB::table('sessions')->where('user_id', $user->id)->delete();

        // ২. ব্যাকআপ: কোনো সেশন বাদ পড়লে user_id null করে দিন (foreign key error এড়াতে)
        DB::table('sessions')->where('user_id', $user->id)->update(['user_id' => null]);

        // ৩. remember_token মুছে দিন (অটো-লগইন বন্ধ করতে)
        $user->remember_token = null;
        $user->save();

        // ৪. ইউজার ডিলিট করুন
        $user->delete();

        // ৫. Success Message সহ রিডাইরেক্ট করুন
        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully!');
    }
}
