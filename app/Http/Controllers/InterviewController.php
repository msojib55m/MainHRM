<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use Illuminate\Http\Request;


class InterviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Interview::latest()->get();
    }



    public function store(Request $request)
{
    $data = $request->validate([
        'candidate_name' => 'required|string',
        'job_position' => 'required|string',
        'interview_date' => 'required|date',
        'interviewer' => 'required|string',
        'viva_marks' => 'required|integer',
        'written_marks' => 'required|integer',
        'mcq_marks' => 'required|integer',
        'total_marks' => 'required|integer',
        'recommendation' => 'nullable|string',
        'details' => 'nullable|string',
    ]);

    Interview::create($data);
    return response()->json(['message' => 'Interview saved successfully'], 201);
}
public function destroy($id)
{
    $interview = Interview::find($id);

    if (!$interview) {
        return response()->json(['message' => 'Interview not found'], 404);
    }

    $interview->delete();

    return response()->json(['message' => 'Interview deleted successfully']);
}







}
