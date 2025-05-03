<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;
    protected $fillable = [
    'firstName', 'lastName', 'email', 'phone', 'alternativePhone', 'ssn',
    'presentAddress', 'Permanentaddress', 'country', 'city', 'zipCode', 'picture',
    'obtainedDegree', 'university', 'cgpa', 'comments',
    'companyName', 'workingPeriod', 'duties', 'supervisor'
];

}
