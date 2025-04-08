<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
  
    public function index()
    {
        // সমস্ত Employee ডাটা ফেচ করা
        $employees = Employee::all();

        // JSON রেসপন্স হিসেবে পাঠানো
        return response()->json($employees);
    }

 
  public function store(Request $request)
  {
      $request->validate([
          'employee' => 'required|string|max:255',
          'notice_description' => 'required|string',
          'salary_month' => 'required|date',
          'is_active' => 'required|in:active,inactive'
      ]);

      $employee = Employee::create([
          'name' => $request->employee,
          'notice_description' => $request->notice_description,
          'salary_month' => $request->salary_month,
          'is_active' => $request->is_active
      ]);

      return response()->json(['message' => 'Employee added successfully', 'employee' => $employee], 201);
  }

   

  
    public function update(Request $request, $id)
    {
        // Find the salary advance by ID
        $salaryAdvance = Employee::find($id);

        if (!$salaryAdvance) {
            return response()->json(['error' => 'Salary advance not found'], 404);
        }

        // Update the fields with the new data
        $salaryAdvance->name = $request->name;
        $salaryAdvance->notice_description = $request->notice_description;
        $salaryAdvance->salary_month = $request->salary_month;
        $salaryAdvance->is_active = $request->is_active;

        // Save the changes to the database
        $salaryAdvance->save();

        // Return the updated data to the frontend
        return response()->json([
            'success' => true,
            'updatedItem' => $salaryAdvance
        ]);
    }

     public function destroy($id)
    {
        // Find the salary advance by ID
        $salaryAdvance = Employee::find($id);

        if (!$salaryAdvance) {
            return response()->json(['error' => 'Salary advance not found'], 404);
        }

        // Delete the salary advance record
        $salaryAdvance->delete();

        // Return success response
        return response()->json(['success' => true]);
    }
}
