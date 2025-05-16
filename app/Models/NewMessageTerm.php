<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewMessageTerm extends Model
{
    use HasFactory;
    // app/Models/SelectionTerm.php
    protected $fillable = ['candidate_name', 'subject', 'message'];
  
}
