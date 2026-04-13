<?php

use App\Http\Controllers\Admin\Industry\IndustryController;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\App\Record\RecordController;
use App\Http\Controllers\App\Subscription\SubscriptionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Middleware\SubscriptionActiveMiddleware;
use App\Utils\GlobalConstant;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

Route::group([], function () {

    Route::get('/', fn() => Inertia::render('public/Home'))->name('home');

    Route::get('/about', fn() => Inertia::render('public/About'));

    Route::get('/pricing', fn() => Inertia::render('public/Pricing'));

    Route::get('/how-it-works', fn() => Inertia::render('public/HowItWorks'));
});

/*
|--------------------------------------------------------------------------
| App Routes (Subscribers)
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_APP)
    ->middleware([
        'auth',
        'verified',
        'role:user',
        'trial.active' // ✅ HERE IS YOUR TRIAL MIDDLEWARE
    ])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('app/dashboard');
        })->name('app.dashboard');

        // Record Data Store
        Route::resource('records', RecordController::class);

        // User Own Data
        Route::get('/my/records', [RecordController::class, 'myRecords'])
            ->name('app.my-records');

        // My Plan
        Route::get('/subscription', [SubscriptionController::class, 'myPlan'])
            ->name('app.myplan');
    });

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_ADMIN)
    ->middleware([
        'auth',
        'verified',
        'role:admin'
    ])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');

        //User
        Route::resource('users', UserController::class);

        //Industry
        Route::resource('industries', IndustryController::class);
    });

/*
|--------------------------------------------------------------------------
| Google Auth
|--------------------------------------------------------------------------
*/

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

/*
|--------------------------------------------------------------------------
| Settings & Fortify Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
