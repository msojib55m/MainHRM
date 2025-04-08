<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;
    protected $fillable = [
        'notice_type',
        'notice_description',
        'notice_date',
        'notice_attachment',
        'notice_by',
    ];
}
