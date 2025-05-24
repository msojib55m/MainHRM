<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployParformance extends Model
{
    use HasFactory;
   protected $fillable = ['employee_id', 'total_score'];

    public function employee()
    {
        return $this->belongsTo(EmployeeSub::class, 'employee_id');
    }

}



   