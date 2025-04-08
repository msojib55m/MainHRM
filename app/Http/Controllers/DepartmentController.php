<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    // store a new Department
    public function store(Request $request)
    {
       
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);
    
        $department = Department::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);
    
        return response()->json([
            'message' => 'Department created successfully!',
            'department' => $department
        ], 201);
    }
    

    // all data show 
    public function index()
    {
        return response()->json(Department::all());
    }
    // update now
    public function update(Request $request, $id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        $department->update([
            'name' => $request->name,
            'status' => $request->status,
        ]);

        return response()->json(['message' => 'Department updated successfully']);
    }
    // update now
    // delete now
    public function destroy($id)
    {
        $department = Department::find($id);

        if (!$department) {
            return response()->json(['message' => 'Department not found'], 404);
        }

        $department->delete();

        return response()->json(['message' => 'Department deleted successfully']);
    }
    // delete now
}

