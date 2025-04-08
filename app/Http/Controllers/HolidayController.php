<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    // store in mysql 
    public function store(Request $request)
    {
    
        // Validate the request
    $validatedData = $request->validate([
        'holiday_name' => 'required|string|max:255',
        'from_date' => 'required|date',
        'end_date' => 'required|date',
        'total_days' => 'required|integer',
    ]);

    // Create the holiday record
    $holiday = Holiday::create($validatedData);

    // Return the newly created holiday as a response
    return response()->json($holiday, 201);
    }
    //  ডাটা আনা হচ্ছে
    public function index()
    {
        return response()->json(Holiday::all());
    }
    // ডাটা আপডেট করা হচ্ছে এবং সাথে mysql পরিবতন হচ্ছে
    public function update(Request $request, $id)
    {
        $holiday = Holiday::find($id);

        if (!$holiday) {
            return response()->json(['message' => 'Holiday not found'], 404);
        }

        $holiday->update([
            'holiday_name' => $request->holiday_name,
            'from_date' => $request->from_date,
            'end_date' => $request->end_date,
            'total_days' => $request->total_days,
        ]);

        return response()->json(['message' => 'Holiday updated successfully'], 200);
    }
    // ডাটা আপডেট করা হচ্ছে এবং সাথে mysql পরিবতন হচ্ছে
    // ডাটা ডিলেক্ট করা হচে্ছে
    public function destroy($id)
    {
        $holiday = Holiday::find($id);
        if (!$holiday) {
            return response()->json(['message' => 'Holiday not found'], 404);
        }
        $holiday->delete();
        return response()->json(['message' => 'Holiday deleted successfully'], 200);
    }
}
