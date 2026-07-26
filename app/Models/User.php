<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Services\Subscriber\Subscription\SubscriptionService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Cashier\Billable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;
    use Billable;


    public function sendPasswordResetNotification($token)
    {
        // লিংকটি তৈরি করুন (এটি পুরোপুরি কাজ করবে)
        $url = URL::temporarySignedRoute(
            'password.reset',  // Laravel এর ডিফল্ট রাউটের নাম
            Carbon::now()->addMinutes(60),
            [
                'token' => $token,
                'email' => $this->getEmailForPasswordReset(), // ইমেইলটি এনকোড হয়ে ইউআরএলে যায়
            ]
        );

        // অথবা, যদি উপরেরটি না চান, তাহলে সরাসরি এই লাইনটি ব্যবহার করুন (সহজ ও নিরাপদ):
        // $url = url(route('password.reset', ['token' => $token, 'email' => $this->email], false));

        // নোটিফিকেশন পাঠানো
        $this->notify(new \Illuminate\Auth\Notifications\ResetPassword($token, function ($notification, $notifiable) use ($url) {
            // কাস্টম ভিউ ব্যবহার করে মেইল তৈরি করুন
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('Reset Password Notification')
                ->view('emails.password.reset', ['url' => $url]); // আপনার ব্লেড ফাইল
        }));
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'avatar',
        'subscription_status',
        'subscription_tier',
        'stripe_customer_id',
        'role',
        'agree_to_terms',
        'trial_ends_at',
        'marketing_emails',
        'is_first_login',
        'is_social_login',
        'agree_to_terms',
        'email_verified_at',
        'otp',
        'otp_verified_at',
        'otp_expires_at'

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'is_first_login' => 'boolean',
        ];
    }

    public function hasFullAccess(): bool
    {
        return app(SubscriptionService::class)
            ->hasFullAccess($this);
    }

    // public function industries()
    // {
    //     return $this->belongsToMany(Industry::class, 'industry_user');
    // }

    public function industries()
    {
        return $this->belongsToMany(Industry::class, 'industry_user', 'user_id', 'industry_id')
            ->withTimestamps();
    }
}
