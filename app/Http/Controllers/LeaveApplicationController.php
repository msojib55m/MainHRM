<?php

namespace App\Http\Controllers;
use App\Models\LeaveApplication;
use Illuminate\Http\Request;

class LeaveApplicationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'employee_name' => 'required|string|max:255',
            'leave_type' => 'required|string|max:255',
            'from_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:from_date',
            'total_days' => 'required|integer',
            'reason' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('leave_applications', 'public');
        }

        LeaveApplication::create([
            'employee_name' => $request->employee_name,
            'leave_type' => $request->leave_type,
            'from_date' => $request->from_date,
            'end_date' => $request->end_date,
            'total_days' => $request->total_days,
            'reason' => $request->reason,
            'file_path' => $filePath,
        ]);

        return response()->json(['message' => 'Leave application submitted successfully'], 201);
    }
    public function index()
    {
        return response()->json(LeaveApplication::all());
    }
    public function destroy($id)
    {
        $leave = LeaveApplication::find($id);
        
        if (!$leave) {
            return response()->json(['message' => 'Leave application not found'], 404);
        }
    
        $leave->delete();
    
        return response()->json(['message' => 'Leave application deleted successfully']);
    }
 
    public function AllLeveShowHeader()
    {
        $leaveApplications = LeaveApplication::all()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->employee_name,
                'reason' => $item->reason,
                'status' => 'Pending', // optional
                'image' => $item->file_path ? asset('storage/' . $item->file_path) : null,
            ];
        });
    
        return response()->json($leaveApplications);
    }
      public function AllLeveShowNumber()
    {
        $countleave = LeaveApplication::count();

        return response()->json([
            'countleave' => $countleave
        ]);
    }
}
