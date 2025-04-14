<?php

namespace App\Http\Controllers;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();
    return response()->json([
        'data' => $units
    ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
        ]);
    
        Unit::create([
            'unit_name' => $request->unit_name,
        ]);
    
        return response()->json(['message' => 'Unit created']);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
        ]);
    
        $unit = Unit::findOrFail($id);
        $unit->update([
            'unit_name' => $request->unit_name,
        ]);
    
        return response()->json(['message' => 'Unit updated']);
    }
    public function destroy($id)
{
    $unit = Unit::find($id);

    if (!$unit) {
        return response()->json(['message' => 'Unit not found'], 404);
    }

    $unit->delete();

    return response()->json(['message' => 'Unit deleted successfully']);
}
    
}
