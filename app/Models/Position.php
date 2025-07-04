<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;


   protected $fillable = ['position_name', 'position_details', 'status'];

    public function employees()
    {
        return $this->hasMany(EmployeeSub::class,"position_id");
    }
}
