<?php

namespace App\Http\Controllers;
use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    // all data show now
    public function index()
    {
        return response()->json(Position::all());
    }
    // data store now
 
    public function store(Request $request)
    {
        $validated = $request->validate([
            'position_name' => 'required|string|max:255',
            'position_details' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $position = Position::create($validated);
        return response()->json($position, 201);
    }
    // update
    public function update(Request $request, $id)
    {
        $position = Position::find($id);
        if (!$position) {
            return response()->json(['message' => 'Position not found'], 404);
        }

        $request->validate([
            'position_name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $position->update([
            'position_name' => $request->position_name,
            'status' => $request->status,
        ]);

        return response()->json($position, 200);
    }
    // delete now
    public function destroy($id)
    {
        $position = Position::find($id);
        if (!$position) {
            return response()->json(['error' => 'Position not found'], 404);
        }
        $position->delete();
        return response()->json(['message' => 'Position deleted successfully']);
    }
}
