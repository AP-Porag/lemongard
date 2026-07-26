<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

// ⚠️ এই দুটি নেমস্পেস একদম হুবহু নিচের মতো হতে হবে:
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Features;
use App\Utils\GlobalConstant;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    // app/Providers/AppServiceProvider.php

    public function register(): void
    {
        $this->app->singleton(RegisterResponse::class, function () {
            return new class implements RegisterResponse {
                public function toResponse($request)
                {
                    $user = $request->user();

                    // ✅ অ্যাডমিন চেক
                    if ($user->role === GlobalConstant::ROLE_ADMIN) {
                        return redirect('/admin/dashboard');
                    }

                    // ✅ OTP ভেরিফিকেশন পেজে রিডাইরেক্ট করুন
                    return redirect()->route('app.otp.verify.view');
                }
            };
        });
    }
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ==============================================
        // পাসওয়ার্ড রিসেট ইমেইল কাস্টমাইজ করার কোড (এখানে যোগ করুন)
        // ==============================================
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            // রিসেট লিংক তৈরি করা (এটি ১০০% কাজ করবে)
            $url = URL::temporarySignedRoute(
                'password.reset',
                Carbon::now()->addMinutes(60),
                [
                    'token' => $token,
                    'email' => $notifiable->getEmailForPasswordReset(),
                ]
            );

            // কাস্টম ভিউ সহ মেইল রিটার্ন করুন
            return (new MailMessage)
                ->subject('Reset Password Notification') // ইমেইলের সাবজেক্ট
                ->view('emails.password.reset', ['url' => $url]); // আমাদের ব্লেড ফাইল
        });
        // ==============================================
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null
        );
    }
}
