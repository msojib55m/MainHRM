<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeSub;
use Illuminate\Support\Facades\Log;

class EmployeeSubController extends Controller
{
    // data get in to mysql
 public function index()
{
    $employees = EmployeeSub::all(); // ✅ পুরো কলেকশন নিচ্ছে

    return response()->json($employees);
}
    // data store in mysql
public function store(Request $request)
{
    Log::info('Received employee data:', $request->all());

    try {
        $validated = $request->validate([
            'employee_id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'mobile' => 'required',
            'dob' => 'required|date',
            'designation' => 'required',
            'joining_date' => 'required|date',
            'confirm_joining' => 'nullable|date', // ✅ fixed
            'status' => 'required|in:active,inactive',
        ]);

        $employee = EmployeeSub::create($validated);

        return response()->json([
            'message' => 'Employee stored successfully',
            'data' => $employee
        ]);
    } catch (\Exception $e) {
        Log::error('Error while storing employee: '.$e->getMessage());
        return response()->json(['error' => 'Server error occurred.'], 500);
    }
}

// update now
public function update(Request $request, $id)
{
    $employee = EmployeeSub::findOrFail($id);

    $validated = $request->validate([
        'employee_id' => 'required',
        'name' => 'required',
        'email' => 'required|email',
        'mobile' => 'required',
        'dob' => 'nullable|date',
        'designation' => 'required',
        'joining_date' => 'nullable|date',
        'confirm_joining' => 'nullable|date',
        'status' => 'required',
    ]);

    $employee->update($validated);

    return response()->json(['message' => 'Employee updated successfully'], 200);
}

public function destroy($id)
{
    $item = EmployeeSub::find($id);
    if ($item) {
        $item->delete();
        return response()->json(['message' => 'Deleted successfully']);
    } else {
        return response()->json(['message' => 'Not found'], 404);
    }
}
    
}
