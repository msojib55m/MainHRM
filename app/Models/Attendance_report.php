<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance_report extends Model
{
    use HasFactory;
     protected $fillable = [
        'employee_name',
        'date',
        'in_time',
        'out_time',
    ];
}
