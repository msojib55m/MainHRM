<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('alternativePhone')->nullable();
            $table->string('ssn');
            $table->text('presentAddress');
            $table->text('Permanentaddress');
            $table->string('country');
            $table->string('city');
            $table->string('zipCode');
            $table->string('picture')->nullable();
    
            // Step 2: Educational Info
            $table->string('obtainedDegree');
            $table->string('university');
            $table->string('cgpa');
            $table->text('comments')->nullable();
    
            // Step 3: Work Experience
            $table->string('companyName');
            $table->string('workingPeriod');
            $table->text('duties');
            $table->string('supervisor');
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
        Schema::dropIfExists('candidates');
    }
}
