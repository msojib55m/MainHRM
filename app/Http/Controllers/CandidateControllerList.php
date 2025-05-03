<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Candidateshortlist;
class CandidateControllerList extends Controller
{
    public function index()
    {
        return Candidateshortlist::all();
    }
// CandidateController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'job_position' => 'required|string',
        'shortlist_date' => 'required|date',
        'interview_date' => 'required|date',
    ]);

    CandidateShortlist::create($validated);

    return response()->json(['message' => 'Candidate Shortlisted Successfully']);
}

}
