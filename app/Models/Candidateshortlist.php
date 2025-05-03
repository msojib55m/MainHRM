<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidateshortlist extends Model
{
    use HasFactory;
    protected $table = 'candidateshortlist';

    protected $fillable = [
        'name',
        'job_position',
        'shortlist_date',
        'interview_date',
    ];
}
