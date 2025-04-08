<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
        $table->id();
        $table->string('employee_one');
        $table->string('employee_two');
        $table->text('loan_details');
        $table->decimal('amount', 15, 2);
        $table->date('approved_date');
        $table->string('repayment_from');
        $table->decimal('interest_percentage', 5, 2);
        $table->integer('installment_period');
        $table->decimal('repayment_amount', 15, 2);
        $table->decimal('installment', 15, 2);
        $table->string('status');
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
        Schema::dropIfExists('loans');
    }
}
