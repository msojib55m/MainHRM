<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;
    protected $fillable = [
        'salary_name',
        'generate_date',
        'salary_month',
        'approved_date',
        'gross_salary',
        'net_salary',
        'loans',
    ];
    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
    
}
