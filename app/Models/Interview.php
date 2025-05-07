<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;
    protected $fillable = [
        'candidate_name',
        'interview_date',
        'viva_marks',
        'mcq_marks',
        'written_marks',
        'total_marks',
        'recommendation',
        'job_position',
        'interviewer',
        'details',
    ];
}
