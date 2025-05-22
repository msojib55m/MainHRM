<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeSub extends Model
{
    use HasFactory;
   protected $table = 'employees_sub';

    protected $fillable = [
        'employee_id',
        'name',
        'email',
        'mobile',
        'dob',
        'designation',
        'joining_date',
        'confirm_joining',
        'status',
    ];
}
