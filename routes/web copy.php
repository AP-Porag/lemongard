
<?php

use App\Http\Controllers\Admin\Dashboard\AdminDashboardController;
use App\Http\Controllers\Admin\Industry\IndustryController;
use App\Http\Controllers\Admin\Record\RecordController as AdminRecord;
use App\Http\Controllers\Admin\Service\ServiceController;
use App\Http\Controllers\Admin\Support\SupportController as AdminSupport;
use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\Industry\IndustryOnboardingController;
use App\Http\Controllers\App\MyRecord\MyRecordController;
use App\Http\Controllers\App\Record\RecordController;
use App\Http\Controllers\App\Subscription\SubscriptionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\App\Support\SupportController;
use App\Http\Controllers\Auth\CustomVerifyEmailController;
// use App\Http\Middleware\SubscriptionActiveMiddleware;
use App\Utils\GlobalConstant;
use Illuminate\Support\Facades\Route;
use Laravel\Cashier\Http\Controllers\WebhookController;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Pest\ArchPresets\Custom;

/*
|--------------------------------------------------------------------------
| Artisan command Routes
|--------------------------------------------------------------------------
*/

Route::get('/clear-config', function () {
    Artisan::call('config:clear');
    return "Config cleared! Now try your execute-command route again.";
});

Route::get('/execute-command', function () {
    //    Artisan::call('storage:link');

    // 1. Tell MySQL to stop checking for foreign key relations temporarily
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');

    // 2. Safely wipe and re-migrate (using array syntax for flags)
    Artisan::call('migrate:fresh', ['--seed' => true]);

    // 3. Turn the safety checks back on
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('optimize');
    dd('All commands executed successfully');

    //deploy command
    ///opt/alt/php84/usr/bin/php artisan migrate:fresh --seed -vvv

});

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

Route::group([], function () {

    Route::get('/', fn() => Inertia::render('public/Home'))->name('home');

    Route::get('/about', fn() => Inertia::render('public/About'));

    Route::get('/pricing', fn() => Inertia::render('public/Pricing'));
    Route::get('/features', fn() => Inertia::render('public/Features'));

    Route::get('/how-it-works', fn() => Inertia::render('public/HowItWorks'));
    Route::get('/contact', fn() => Inertia::render('public/Contact'));
    Route::get('/privacy-policy', fn() => Inertia::render('public/PrivacyPolicy'));
    Route::get('/terms', fn() => Inertia::render('public/TermsAndConditions'));
    Route::get('/cookies', fn() => Inertia::render('public/CookiePolicy'));
});


Route::post('/contact', [SupportController::class, 'store'])->name('contact.store');


// Route::middleware('auth')->group(function () {

//     Route::get('/verify-email', function () {
//         return inertia('auth/verify-email');
//     })->name('verification.notice');

//     Route::get('/verify-email/{id}/{hash}', function (EmailVerificationRequest $request) {
//         $request->fulfill();

//         return redirect('/app/dashboard');
//     })->middleware(['signed'])->name('verification.verify');

//     Route::post('/email/verification-notification', function (Request $request) {
//         $request->user()->sendEmailVerificationNotification();

//         return back()->with('success', 'Verification link sent.');
//     })->middleware(['throttle:6,1'])->name('verification.send');
// });

/*
|--------------------------------------------------------------------------
| App Routes (Subscribers)
|--------------------------------------------------------------------------
*/

// Route::middleware('guest.redirect')->group(function () {
//     Route::get('/login', function () {
//         return Inertia::render('Auth/Login');
//     })->name('login');
// });

Route::prefix(GlobalConstant::ROUTE_APP)
    ->name('app.')
    ->middleware([
        'auth',
        'verified',
        'role:user',
        // 'tier.full'
        // 'trial.active',
    ])
    ->group(function () {

        // Route::get('/dashboard', function () {
        //     return Inertia::render('app/dashboard');
        // })->name('dashboard');


        Route::get('/onboarding/industry', [IndustryOnboardingController::class, 'index'])
            ->name('onboarding.industry');

        Route::post('/app/onboarding/industry', [IndustryOnboardingController::class, 'store'])
            ->name('app.onboarding.industry.store');

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->middleware(['industry.selected'])
            ->name('app.dashboard');

        // Record Data Store
        Route::resource('records', RecordController::class);

        //Resolve Route
        Route::patch('/record/{record}/resolve', [RecordController::class, 'resolve'])
            ->name('records.resolve');

        Route::patch('/my-record/{record}/resolve', [RecordController::class, 'resolve'])
            ->name('my-records.resolve');

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

        //Service
        Route::resource('services', ServiceController::class);

        //Support
        Route::get('/supports', [AdminSupport::class, 'index'])
            ->name('supports.index');



        Route::post('/support/{id}/status', [AdminSupport::class, 'updateStatus']);
    });

Route::post('/support/store', [AdminSupport::class, 'store'])
    ->name('supports.store');

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

// 📌 Fortify লোড হওয়ার পর আপনার কাস্টম রাউটটি দিন যেন এটি ওভাররাইড না হয়
Route::get('/email/verify/{id}/{hash}', [CustomVerifyEmailController::class, 'verify'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');
