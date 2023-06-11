<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rdv>
 */
class RdvFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'NomComplet'  => fake()->name(),
            "Email"  => fake()->unique()->safeEmail(),
            'Tele'  => "0775504195",
            "Date"  => "2023-06-11",
            'Heure'  => "10:00",
            'Service' => "Certificat",
            'Token'  => random_int(1000,3000),
        ];
    }
}
