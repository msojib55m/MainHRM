<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendancePoints extends Model
{
    use HasFactory;
    protected $fillable = [
    'employee',     // অথবা employee_id যদি relation থাকে
    'in_time',
    'points',
    'date',
];

}
