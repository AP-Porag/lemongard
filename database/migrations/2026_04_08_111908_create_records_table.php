<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->string('industry')->nullable();
            $table->string('first_name');
            $table->string('last_name')->index();

            $table->string('phone_cell')->index();
            $table->string('phone_home')->nullable();

            $table->string('street')->nullable();
            $table->string('city')->index();
            $table->string('state')->nullable();
            $table->string('zip')->nullable();

            $table->string('service')->index();
            $table->decimal('price', 10, 2)->nullable();

            $table->text('incident_report')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
