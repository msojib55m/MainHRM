<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveTypeHoliday extends Model
{
    use HasFactory;
    protected $fillable = ['leave_type', 'leave_code', 'leave_days'];
}

