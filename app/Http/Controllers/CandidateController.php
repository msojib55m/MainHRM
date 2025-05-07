<?php

namespace App\Http\Controllers;
use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function store(Request $request)
    {
        $candidate = Candidate::create($request->all());
        return response()->json($candidate);
    }
    public function index()
    {
        return response()->json(Candidate::latest()->get());
    }
    public function update(Request $request, $id)
    {
        // Validate only the fields you care about
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'ssn' => 'required|string|max:255',
        ]);
    
        // Find and update candidate
        $candidate = Candidate::findOrFail($id);
        $candidate->update($validatedData);
    
        return response()->json($candidate);
    }    
    
    public function destroy($id)
    {
        $candidate = Candidate::find($id);
        if(!$candidate)
        {
            return response()->json([
                'message'=>'Project task not found.'
            ]);
        }
        $candidate->delete();
        return response()->json([
            'message' => 'Project task deleted successfully.'
        ]);
    }
    public function AllCandateShow()
    {
        $employees = Candidate::select('firstName', 'lastName')->get();
        $fullNames = $employees->map(function ($employee) {
            return $employee->firstName . ' ' . $employee->lastName;
        });
    
        return response()->json($fullNames);
    }
    
    public function Candidate()
    {
        $employees = Candidate::pluck('name')->toArray(); // OK
        return response()->json($employees); // অথবা response()->json(['data' => $employees])
    }
    
    
}
