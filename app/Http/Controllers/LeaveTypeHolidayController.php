<?php

namespace App\Http\Controllers;

use App\Models\LeaveTypeHoliday;

use Illuminate\Http\Request;

class LeaveTypeHolidayController extends Controller
{
    // ডাটা পাঠানোর জন্য রাস্তা তৈরি করা হলো mysql
    public function store(Request $request)
    {
  
        $leave = new LeaveTypeHoliday();
        $leave->leave_type = $request->leave_type;
        $leave->leave_code = $request->leave_code;
        $leave->leave_days = $request->leave_days;
        $leave->save();
    
        return response()->json([
            'id' => $leave->id,
            'leave_type' => $leave->leave_type,
            'leave_code' => $leave->leave_code,
            'leave_days' => $leave->leave_days,
            'created_at' => $leave->created_at
        ]);
  
    }
    // ডাটগুলো mysql থেকে আনা হচ্ছে
    public function index()
    {
        $leaves = LeaveTypeHoliday::all();
        return response()->json($leaves);
    }
    // update
    
    public function update(Request $request, $id)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'leave_type' => 'required|string|max:255',
                'leave_code' => 'required|string|max:50',
                'leave_days' => 'required|integer|min:1',
            ]);
    
            // Find the leave record
            $leave = LeaveTypeHoliday::find($id);
            if (!$leave) {
                return response()->json(['message' => 'Leave not found'], 404);
            }
    
            // Update the record
            $leave->update($validated);
    
            return response()->json(['message' => 'Leave updated successfully', 'leave' => $leave]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


public function destroy($id)
{
    $leave = LeaveTypeHoliday::find($id);

    if ($leave) {
        $leave->delete(); // Delete the leave record from the database
        return response()->json(['message' => 'Leave deleted successfully']);
    }

    return response()->json(['message' => 'Leave not found'], 404);
}

}
