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
        Schema::create('vacances', function (Blueprint $table) {
            $table->id();
            $table->integer('Jour')->default(0)->nullable();
            $table->integer('Mois')->default(0)->nullable();
            $table->integer('Annee')->default(0)->nullable();
            $table->integer('All_Mois')->default(8)->nullable();
            $table->string('Service')->default('All')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacances');
    }
};
