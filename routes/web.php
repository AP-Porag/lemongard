<?php

use App\Http\Controllers\Admin\Industry\IndustryController;
use App\Http\Controllers\Admin\Record\RecordController as AdminRecord;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\App\Record\RecordController;
use App\Http\Controllers\App\Subscription\SubscriptionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\App\Support\SupportController;
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
    Route::get('/contact', fn() => Inertia::render('public/Contact'));
});

/*
|--------------------------------------------------------------------------
| App Routes (Subscribers)
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_APP)
    ->name('app.')
    ->middleware([
        'auth',
        'verified',
        'role:user',
        'trial.active'
    ])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('app/dashboard');
        })->name('dashboard');

        // Record Data Store
        Route::resource('records', RecordController::class);

        // User Own Data
        Route::get('/my/records', [RecordController::class, 'myRecords'])
            ->name('my-records');

        // My Plan
        Route::get('/subscription', [SubscriptionController::class, 'myPlan'])
            ->name('myplan');

        //Contact
        Route::post('/contact', [SupportController::class, 'store'])->name('support.store');
    });

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_ADMIN)
    ->name('admin.')
    ->middleware([
        'auth',
        'verified',
        'role:admin'
    ])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        });

        //User
        Route::resource('users', UserController::class);

        Route::resource('records', AdminRecord::class);

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
