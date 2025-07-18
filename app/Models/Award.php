<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;
    protected $fillable = [
                           "awardName",
                           "description",
                           "giftItem",
                           "date",
                           "employeeName",
                           "awardBy",
                         ];
}
