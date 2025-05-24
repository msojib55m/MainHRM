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
    public function emplyee()
{
    $employees = EmployeeSub::select('id', 'name')->get();
    return response()->json($employees);
}

public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'employee_id' => 'required',
            'name' => 'required',
            'email' => 'required|email|unique:employees_sub,email',
            'mobile' => 'required',
            'dob' => 'required|date',
            'designation' => 'required',
            'joining_date' => 'required|date',
            'confirm_joining' => 'nullable|date',
            'status' => 'required|in:active,inactive',
            'position_id' => 'required|exists:positions,id'
        ]);

        $employee = EmployeeSub::create($validated);

        return response()->json([
            'message' => 'Employee stored successfully',
            'data' => $employee
        ]);
    } catch (\Throwable $e) {
        Log::error('Error storing employee: '.$e->getMessage());
        return response()->json([
            'error' => 'Server error occurred',
            'details' => $e->getMessage()
        ], 500);
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
