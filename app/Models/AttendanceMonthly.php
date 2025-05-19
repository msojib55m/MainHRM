<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceMonthly extends Model
{
    use HasFactory;
       protected $fillable = [
        'employee_name',
        'year',
        'month',
        'time_in',
        'time_out',
    ];
}
