<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;
       // টেবিলের নাম (যদি Laravel এর default নামের সাথে মিল না হয়)
       protected $table = 'requests';

       // সেভ হওয়ার ফিল্ডগুলো
       protected $fillable = [
           'employee',
           'position',
           'start_date',
           'end_date',
           'description1',
           'description2',
           'unit_id',
           'amount',
       ];
}
