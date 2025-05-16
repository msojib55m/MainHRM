<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewMessageTermsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_message_terms', function (Blueprint $table) {
            $table->id();
                 $table->string('candidate_name');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('status')->default('not seen');
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
        Schema::dropIfExists('new_message_terms');
    }
}
