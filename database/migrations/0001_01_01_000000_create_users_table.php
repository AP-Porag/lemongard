<?php

use App\Utils\GlobalConstant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // =========================
            // AUTH BASIC INFO
            // =========================
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avatar')->nullable();


            // =========================
            // ROLE MANAGEMENT
            // =========================
            $table->string('role')->default(GlobalConstant::ROLE_USER)->index();

            // =========================
            // SUBSCRIPTION SYSTEM
            // =========================
            $table->string('subscription_tier')
                ->default(GlobalConstant::TIER_TRIAL)->index();

            $table->string('subscription_status')
                ->default('trial')
                ->index();

            $table->timestamp('trial_ends_at')->nullable();

            $table->string('stripe_customer_id')->nullable()->index();

            // =========================
            // PROFILE / BUSINESS INFO
            // =========================
            $table->string('industry')->nullable();
            $table->string('company')->nullable();

            // =========================
            // USER CONSENT FLAGS
            // =========================
            $table->boolean('agree_to_terms')->default(false);
            $table->boolean('marketing_emails')->default(false);

            // =========================
            // ONBOARDING FLAGS
            // =========================
            $table->boolean('is_first_login')->default(true);
            $table->boolean('is_social_login')->default(false);

            // =========================
            // LARAVEL CORE
            // =========================
            $table->rememberToken();
            $table->timestamps();

            // Optional performance indexes (important for SaaS scale)
            $table->index(['email']);
            $table->index(['subscription_status', 'subscription_tier']);
        });

        // =========================
        // PASSWORD RESET TABLE
        // =========================
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();

            $table->index('email');
        });

        // =========================
        // SESSIONS TABLE
        // =========================
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();

            $table->foreignId('user_id')
                ->nullable()
                ->index()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
