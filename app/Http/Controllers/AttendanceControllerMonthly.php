<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\AttendanceMonthly;

class AttendanceControllerMonthly extends Controller
{
      public function store(Request $request)
    {
        $request->validate([
            'employee_name' => 'required|string',
            'year' => 'required',
            'month' => 'required',
            'time_in' => 'required',
            'time_out' => 'required',
        ]);

        AttendanceMonthly::create([
            'employee_name' => $request->employee_name,
            'year' => $request->year,
            'month' => $request->month,
            'time_in' => $request->time_in,
            'time_out' => $request->time_out,
        ]);

        return response()->json(['message' => 'Attendance saved successfully'], 200);
    }
}
