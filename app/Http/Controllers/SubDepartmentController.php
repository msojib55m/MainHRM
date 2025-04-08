<?php

namespace App\Http\Controllers;

use App\Models\SubDepartment;
use Illuminate\Http\Request;

class SubDepartmentController extends Controller
{
    // new subdeartment add now
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sub_department' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);
        $subDepartment = SubDepartment::create($validated);

        return response()->json($subDepartment, 201);

    }
    public function index()
    {
        return response()->json(SubDepartment::all());
    }

    // update now
    public function update(Request $request, $id)
   {
    $subDepartment = SubDepartment::find($id);

    if (!$subDepartment) {
        return response()->json(["message" => "Sub Department not found"], 404);
    }

    $subDepartment->sub_department = $request->sub_department;
    $subDepartment->department = $request->department;
    $subDepartment->status = $request->status ?? 'active';

    $subDepartment->save();

    return response()->json($subDepartment);
    }
  // update now
  // delete now
  public function destroy($id)
  {
      $subDepartment = SubDepartment::find($id);
  
      if (!$subDepartment) {
          return response()->json(["message" => "Sub Department not found"], 404);
      }
  
      $subDepartment->delete();
  
      return response()->json(["message" => "Sub Department deleted successfully"]);
  }
  

}
