<?php

namespace App\Http\Controllers;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;



class CandidateController extends Controller
{
    // public function store(Request $request)
    // {
    //     $candidate = Candidate::create($request->all());
    //     return response()->json($candidate);
    // }
  public function store(Request $request)
    {
        Log::info('Form submitted', $request->all());

        // Validation, আপনার প্রয়োজনমত ভ্যালিডেশন বাড়াতে পারেন
        $validatedData = $request->validate([
            'firstName'         => 'required|string|max:255',
            'lastName'          => 'required|string|max:255',
            'email'             => 'required|email|max:255|unique:candidates,email',
            'phone'             => 'required|string|max:20',
            'alternativePhone'  => 'nullable|string|max:20',
            'ssn'               => 'required|string|max:20|unique:candidates,ssn',
            'presentAddress'    => 'nullable|string|max:500',
            'Permanentaddress'  => 'nullable|string|max:500',
            'country'           => 'nullable|string|max:255',
            'city'              => 'nullable|string|max:255',
            'zipCode'           => 'nullable|string|max:20',
            'obtainedDegree'    => 'nullable|string|max:255',
            'university'        => 'nullable|string|max:255',
            'cgpa'              => 'nullable|string|max:20',
            'comments'          => 'nullable|string|max:1000',
            'companyName'       => 'nullable|string|max:255',
            'workingPeriod'     => 'nullable|string|max:255',
            'duties'            => 'nullable|string|max:1000',
            'supervisor'        => 'nullable|string|max:255',
            'picture'           => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $candidate = new Candidate();

        $candidate->firstName = $request->firstName;
        $candidate->lastName = $request->lastName;
        $candidate->email = $request->email;
        $candidate->phone = $request->phone;
        $candidate->alternativePhone = $request->alternativePhone;
        $candidate->ssn = $request->ssn;
        $candidate->presentAddress = $request->presentAddress;
        $candidate->Permanentaddress = $request->Permanentaddress;
        $candidate->country = $request->country;
        $candidate->city = $request->city;
        $candidate->zipCode = $request->zipCode;

        $candidate->obtainedDegree = $request->obtainedDegree;
        $candidate->university = $request->university;
        $candidate->cgpa = $request->cgpa;
        $candidate->comments = $request->comments;

        $candidate->companyName = $request->companyName;
        $candidate->workingPeriod = $request->workingPeriod;
        $candidate->duties = $request->duties;
        $candidate->supervisor = $request->supervisor;

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/candidates'), $filename);
            $candidate->picture = 'uploads/candidates/' . $filename;
        }

        $candidate->save();

        return response()->json([
            'message' => 'Candidate created successfully',
            'candidate' => $candidate,
        ], 201);
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
    
public function AllImage()
{
    $candidates = Candidate::all()->map(function ($candidate) {
        $candidate->image_url = $candidate->image
            ? asset('storage/candidates/' . $candidate->image)
            : null;
        return $candidate;
    });

    return response()->json($candidates);
}

}
