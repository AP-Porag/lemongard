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
        // $plans = [
        //     ["name" => "trial", "stripe_plan_id" => "prod_UWJgd9Tttck3WM", "stripe_price_id" => "price_1TXH33HKtXG9R7bGb5heMCgK"],
        //     ["name" => "tier_1_view_only", "stripe_plan_id" => "prod_URppGOJSOJdBmB", "stripe_price_id" => "price_1TSwAKHKtXG9R7bGP5EtUGrg"],
        //     ["name" => "tier_2_full_access", "stripe_plan_id" => "prod_URsLguJJ1NBvOM", "stripe_price_id" => "price_1TSyapHKtXG9R7bGgdo6OLrA"]
        // ];

        $plans = [
            ["name" => "trial", "stripe_plan_id" => "prod_V0p7JjqpmQFR8I", "stripe_price_id" => "price_1U0nSxFulxMQQHJjszqFW2i1"],
            ["name" => "tier_1_view_only", "stripe_plan_id" => "prod_V0p4dCkZrsfEc4", "stripe_price_id" => "price_1U0nQCFulxMQQHJjvEsWv8wc"],
            ["name" => "tier_2_full_access", "stripe_plan_id" => "prod_V0p6ERsPvOL9xT", "stripe_price_id" => "price_1U0nRqFulxMQQHJjA3FJ4s5r"]
        ];
        foreach ($plans as $plan) {
            Plan::create($plan);
        }
    }
}
