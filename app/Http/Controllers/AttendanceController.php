<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
  
  
public function store(Request $request)
{
    $request->validate([
        'employee_name' => 'required|string',
        'attendance_time' => 'required|date',
    ]);

    Attendance::create([
        'employee_name' => $request->employee_name,
        'attendance_time' => $request->attendance_time,
    ]);

    return response()->json(['message' => 'Attendance saved successfully'], 201);
}

}
