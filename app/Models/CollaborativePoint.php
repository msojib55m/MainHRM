<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollaborativePoint extends Model
{
    use HasFactory;
        protected $fillable = ['candidate_name', 'reason', 'point'];
}
