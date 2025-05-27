<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesSubTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees_sub', function (Blueprint $table) {
     $table->id();
        $table->unsignedBigInteger('position_id');
        $table->string('name');
        $table->string('email')->unique();
        $table->string('mobile')->nullable();
        $table->date('dob')->nullable();
        $table->string('designation')->nullable();
        $table->date('joining_date')->nullable();
        $table->string('confirm_joining')->nullable();
        $table->string('status')->nullable();
        $table->timestamps();

        $table->foreign('position_id')->references('id')->on('positions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees_sub');
    }
}
