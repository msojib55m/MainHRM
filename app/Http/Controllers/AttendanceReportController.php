<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance_report;
use Illuminate\Support\Facades\Log;
class AttendanceReportController extends Controller
{
    // data to mysql in table show
    public function index()
    {
        return response()->json(Attendance_report::all());
    }
    // data react to mysql store
    public function store(Request $request)
    {
    
        $data = $request->validate([
            "employee_name" => "required|string|max:255",
            "date" => "required|date",
            "in_time" => "required",
            "out_time" => "required"
        ]);
    
    
    
        $attendance_report = Attendance_report::create($data);
    
        return response()->json([
            'message' => 'Attendance report created successfully',
            'data' => $attendance_report
        ], 201);
    }

    // data update to mysql and react table
    public function update(Request  $request ,$id)
    {
        $data = Attendance_report::findOrFail($id);
        $data->update($request->all());
        return response()->json(['message'=>'Attendance report updated successfully']);
    }
   // delete  to  mysql and react table
    public function destroy($id)
    {
        $data  = Attendance_report::find($id);
        if(!$data)
        {
           return response()->json(['message' => 'Attendance report not found'], 404);
        }
        $data->delete();
      return response()->json(['message' => 'Attendance report deleted successfully']);
    }

}
