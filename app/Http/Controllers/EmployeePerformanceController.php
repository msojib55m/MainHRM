<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployParformance;

class EmployeePerformanceController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'total_score' => 'required|numeric',
        ]);

        // Create a new employee performance record in the database
        $performance = EmployParformance::create([
            'employee_name' => $validated['employee_name'],
            'total_score' => $validated['total_score'],
        ]);

        // Return a success message
        return response()->json(['message' => 'Performance data saved successfully!'], 200);
    }
    // data all now
    public function index()
    {
        return response()->json(EmployParformance::all());
    }
    // data all now
    // updataMethod now
    public function update(Request $request, $id)
    {
        // পারফরম্যান্স খুঁজে পাওয়া যাচ্ছে কি না চেক করুন
        $performance = EmployParformance::find($id);

        // পারফরম্যান্স না পাওয়া গেলে 404 রেসপন্স পাঠান
        if (!$performance) {
            return response()->json(['message' => 'Performance Not Found'], 404);
        }

        // ডাটা আপডেট
        $performance->employee_name = $request->employee_name; // employee_name আপডেট
        $performance->total_score = $request->total_score; // total_score আপডেট
        $performance->save(); // সেভ করা

        // সফলতা বার্তা
        return response()->json(['message' => 'Performance Updated Successfully'], 200);
    }
    
    // updataMethod now
    // delete Performance  now
    public function destroy($id)
    {
        $performance = EmployParformance::find($id);
        
        if (!$performance) {
            return response()->json(['message' => 'Performance not found'], 404);
        }
    
        $performance->delete();
    
        return response()->json(['message' => 'Performance deleted successfully'], 200);
    }
    // delete Performance  now
}
