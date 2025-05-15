<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetupRule extends Model
{
    use HasFactory;
protected $fillable = [
    'name',
    'type',
    'amount',
    'start_time',
    'end_time',
    'is_percent',
    'effect_on',
    'is_active',
];
}
