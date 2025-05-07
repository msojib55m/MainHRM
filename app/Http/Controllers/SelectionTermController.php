<?php

namespace App\Http\Controllers;

use App\Models\SelectionTerm;
use Illuminate\Http\Request;

class SelectionTermController extends Controller
{
    public function index()
    {
        return SelectionTerm::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'candidate_name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'terms' => 'required|string',
        ]);

        SelectionTerm::create($request->all());

        return response()->json(['message' => 'Saved successfully'], 201);
    }
    public function update(Request $request, $id)
    {
        $selection = SelectionTerm::findOrFail($id);
        $selection->candidate_name = $request->candidate_name;
        $selection->position = $request->position;
        $selection->terms = $request->terms;
        $selection->save();
    
        return response()->json(['message' => 'Updated successfully']);
    }
    public function destroy($id)
    {
        $item = SelectionTerm::findOrFail($id);
        $item->delete();
    
        return response()->json(['message' => 'Deleted successfully']);
    }
        

}
