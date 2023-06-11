<?php

namespace Database\Seeders;

use App\Models\Rdv;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RdvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rdv::factory(10)->create();
    }
}
