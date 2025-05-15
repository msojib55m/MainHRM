<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSetupRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('setup_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // time, basic, allowance, etc.
            $table->decimal('amount', 10, 2)->nullable(); // যদি percentage হয়
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->boolean('is_percent')->default(0); // 0 = No, 1 = Yes
            $table->enum('effect_on', ['on_basic', 'on_gross'])->nullable();
            $table->boolean('is_active')->default(1); // 1 = active, 0 = inactive
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setup_rules');
    }
}
