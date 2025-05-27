<?php

namespace App\Http\Controllers;

use App\Models\EmployeeSub;
use App\Models\EmployParformance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeSubController extends Controller
{
    // সব employee দেখানো
    public function index()
    {
        return response()->json(EmployeeSub::with('position')->get());
    }

    // নতুন employee যুক্ত করা
    public function store(Request $request)
    {
        $validated = $request->validate([
            'position_id' => 'required|integer|exists:positions,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees_sub,email',
            'mobile' => 'required|string|max:20',
            'dob' => 'required|date',
            'designation' => 'required|string|max:255',
            'joining_date' => 'required|date',
            'confirm_joining' => 'required|date',
            'status' => 'required|string|in:active,inactive',
        ]);

        $employee = EmployeeSub::create($validated);

        return response()->json(['message' => 'Employee created successfully', 'employee' => $employee], 201);
    }

    // employee আপডেট করা
    public function update(Request $request, $id)
    {
        $employee = EmployeeSub::findOrFail($id);

        $validated = $request->validate([
            'position_id' => 'required|integer|exists:positions,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees_sub,email,' . $employee->id,
            'mobile' => 'required|string|max:20',
            'dob' => 'required|date',
            'designation' => 'required|string|max:255',
            'joining_date' => 'required|date',
            'confirm_joining' => 'required|date',
            'status' => 'required|string|in:active,inactive',
        ]);

        $employee->update($validated);

        return response()->json(['message' => 'Employee updated successfully', 'employee' => $employee]);
    }

    // employee delete করা
    public function destroy($id)
    {
        $employee = EmployeeSub::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully']);
    }

    // সব employee reset করা
    public function resetEmployees()
    {
        try {
            // প্রথমে employ_parformances ডিলিট করা (FK আছে)
            DB::table('employ_parformances')->delete();

            // তারপর employees_sub ডিলিট করা
            DB::table('employees_sub')->delete();

            // auto increment রিসেট করা
            DB::statement('ALTER TABLE employees_sub AUTO_INCREMENT = 1');

            return response()->json(['message' => 'All employees have been reset successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occurred: ' . $e->getMessage()], 500);
        }
    }
}
