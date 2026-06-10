<?php

namespace Database\Seeders;

use App\Models\Industry;
use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $industries = [
            ["name" => "Ready-Made Garments"],
            ["name" => "Leather & Footwear Industry"],
            ["name" => "Plastics & Polymers Industry"],
            ["name" => "Pharmaceuticals Industry"],
            ["name" => "Ceramics & Tiles Industry"],
        ];
        foreach ($industries as $industry) {
            Industry::create($industry);
        }
    }
}
