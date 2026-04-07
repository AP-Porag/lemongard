<?php
//
//use Illuminate\Support\Facades\Route;
//use Inertia\Inertia;
//use Laravel\Fortify\Features;
//
//Route::get('/', function () {
//    return Inertia::render('welcome', [
//        'canRegister' => Features::enabled(Features::registration()),
//    ]);
//})->name('home');
//
//Route::get('dashboard', function () {
//    return Inertia::render('dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');
//
//require __DIR__.'/settings.php';


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Utils\GlobalConstant;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\App\DashboardController;

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

Route::group([], function () {

    //    Route::get('/', function () {
    //        return Inertia::render('welcome', [
    //            'canRegister' => Features::enabled(Features::registration()),
    //        ]);
    //    })->name('home');

    //    Route::get('/how-it-works', fn() => Inertia::render('Public/HowItWorks'))->name('how.it.works');
    //    Route::get('/about', fn() => Inertia::render('Public/About'))->name('about');
    //    Route::get('/pricing', fn() => Inertia::render('Public/Pricing'))->name('pricing');
    //    Route::get('/privacy-policy', fn() => Inertia::render('Public/PrivacyPolicy'))->name('privacy.policy');
    //    Route::get('/terms-and-conditions', fn() => Inertia::render('Public/Terms'))->name('terms');
    //    Route::get('/cookie-policy', fn() => Inertia::render('Public/CookiePolicy'))->name('cookie.policy');

    Route::get(
        '/',
        fn() =>
        Inertia::render('public/Home')
    )->name('home');

    Route::get(
        '/about',
        fn() =>
        Inertia::render('public/About')
    );

    Route::get(
        '/pricing',
        fn() =>
        Inertia::render('public/Pricing')
    );

    Route::get(
        '/how-it-works',
        fn() =>
        Inertia::render('public/HowItWorks')
    );
});


/*
|--------------------------------------------------------------------------
| App Routes (Subscribers)
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_APP)
    ->middleware(['auth', 'verified', 'role:user'])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('app/dashboard');
        })->name('app.dashboard');
    });

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix(GlobalConstant::ROUTE_ADMIN)
    ->middleware(['auth', 'verified', 'role:admin'])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');
    });



Route::post('/register', [AuthController::class, 'register'])
    ->name('register.store');

// Sign up with google
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);

// Login
// Route::post('/login', [AuthController::class, 'login'])
//     ->name('login');


// Logout
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');




/*
|--------------------------------------------------------------------------
| Settings & Fortify Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
