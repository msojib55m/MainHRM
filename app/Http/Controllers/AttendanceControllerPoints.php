<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AttendancePoints;

class AttendanceControllerPoints extends Controller
{
        public function store(Request $request)
    {
        $data = AttendancePoints::create([
            'employee' => $request->employee,
            'in_time' => $request->in_time,
            'points' => $request->points,
            'date' => $request->date,
        ]);

        return response()->json($data);
    }

    public function index()
    {
        return AttendancePoints::all();
    }
}
