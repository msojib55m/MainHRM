<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        // data validation
        $request->validate([
            'employee_id' => 'required|string',
            'attendance_time' => 'required|date',
        ]);

        // Attendance model use do data insert .
        $attendance = Attendance::create([
            'employee_id' => $request->employee_id,
            'attendance_time' => $request->attendance_time,
        ]);

        //  succussfully response 
        return response()->json([
            'message' => 'Attendance recorded successfully!',
            'attendance' => $attendance
        ]);
    }
}
