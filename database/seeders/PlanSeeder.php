<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            ["name" => "tier_1_view_only", "stripe_plan_id" => "prod_URppGOJSOJdBmB", "stripe_price_id" => "price_1TSwAKHKtXG9R7bGP5EtUGrg"],
            ["name" => "tier_2_full_access", "stripe_plan_id" => "prod_URsLguJJ1NBvOM", "stripe_price_id" => "price_1TSyapHKtXG9R7bGgdo6OLrA"]
        ];
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
