<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveApplication extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_name',
        'leave_type',
        'from_date',
        'end_date',
        'total_days',
        'reason',
        'file_path',
    ];
}
