<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->string('candidate_name');
            $table->string('job_position');
            $table->date('interview_date');
            $table->string('interviewer');
            $table->integer('viva_marks');
            $table->integer('written_marks');
            $table->integer('mcq_marks');
            $table->integer('total_marks');
            $table->string('recommendation')->nullable();
            $table->text('details')->nullable();
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
        Schema::dropIfExists('interviews');
    }
}
