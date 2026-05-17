
<?php

use App\Http\Controllers\Admin\Dashboard\AdminDashboardController;
use App\Http\Controllers\Admin\Industry\IndustryController;
use App\Http\Controllers\Admin\Record\RecordController as AdminRecord;
use App\Http\Controllers\Admin\Support\SupportController as AdminSupport;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\MyRecord\MyRecordController;
use App\Http\Controllers\App\Record\RecordController;
use App\Http\Controllers\App\Subscription\SubscriptionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\App\Support\SupportController;
// use App\Http\Middleware\SubscriptionActiveMiddleware;
use App\Utils\GlobalConstant;
use Illuminate\Support\Facades\Route;
use Laravel\Cashier\Http\Controllers\WebhookController;
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
    Route::get('/privacy-policy', fn() => Inertia::render('public/PrivacyPolicy'));
    Route::get('/cookies', fn() => Inertia::render('public/CookiePolicy'));
    Route::get('/terms', fn() => Inertia::render('public/TermsAndConditions'));
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
        // 'tier.full'
        // 'trial.active'
    ])
    ->group(function () {

        // Route::get('/dashboard', function () {
        //     return Inertia::render('app/dashboard');
        // })->name('dashboard');

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('app.dashboard');

        // Record Data Store
        Route::resource('records', RecordController::class);

        Route::resource('my-records', MyRecordController::class);

        // User Own Data
        // Route::get('/my/records', [RecordController::class, 'myRecords'])
        //     ->name('my-records');

        // My Plan
        Route::get('/subscription', [SubscriptionController::class, 'myPlan'])
            ->name('myplan');
        Route::get('/billing', [SubscriptionController::class, 'billingInfo'])
            ->name('billing');

        //Checkout
        Route::get('/checkout/{name}', [SubscriptionController::class, 'checkout'])
            ->name('checkout');
        Route::get('subscription/checkout/success', [SubscriptionController::class, 'success'])
            ->name('checkout.success');


        // Route::get('/checkout/success', function () {
        //     return Inertia::render('app/checkout/success');
        // })->name('checkout.success');

        Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook']);

        Route::post('/subscription/start-trial', [SubscriptionController::class, 'startTrial'])
            ->name('subscription.start-trial');

        Route::get('/subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.plan.resume');

        Route::get('/subscription/plan/cancel', [SubscriptionController::class, 'cancel'])
            ->name('subscription.plan.cancel');




        Route::post('/subscribe', [SubscriptionController::class, 'subscribe']);
        Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel']);
        Route::post('/subscription/resume', [SubscriptionController::class, 'resume']);
        Route::post('/subscription/swap', [SubscriptionController::class, 'swap']);
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
        'role:admin',
        // 'subscription.active,'
    ])
    ->group(function () {

        // Route::get('/dashboard', function () {
        //     return Inertia::render('admin/dashboard');
        // });
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])
            ->name('admin.dashboard');

        //User
        Route::resource('users', UserController::class);

        Route::resource('records', AdminRecord::class);

        //Industry
        Route::resource('industries', IndustryController::class);

        //Support
        Route::get('/supports', [AdminSupport::class, 'index'])
            ->name('supports.index');

        Route::post('/support/{id}/status', [AdminSupport::class, 'updateStatus']);
    });

/*
|--------------------------------------------------------------------------
| Google Auth
|--------------------------------------------------------------------------
*/

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])
    ->name('cashier.webhook');

//Contact
Route::post('/contact', [SupportController::class, 'store'])->name('support.store');

/*
|--------------------------------------------------------------------------
| Settings & Fortify Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
