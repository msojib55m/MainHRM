<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployParformance extends Model
{
    use HasFactory;
   protected $fillable = ['employee_id','employee_name','total_score'];

    public function employee()
    {
        return $this->belongsTo(EmployeeSub::class, 'employee_id');
    }

    // একটি shortcut accessor যদি চাই employee এর position পাওয়া
    // Accessor for position
public function position()
{
    if ($this->employee) {
        return $this->employee->position;
    }
    return null;
}


}



   