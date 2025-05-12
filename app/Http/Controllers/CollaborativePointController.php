<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CollaborativePoint;

class CollaborativePointController extends Controller
{
      public function store(Request $request)
    {
        $data = $request->validate([
            'candidate_name' => 'required|string',
            'reason' => 'required|string',
            'point' => 'required|numeric',
        ]);

        $data['point_date'] = now();
        $point = CollaborativePoint::create($data);
        return response()->json($point);
    }

    public function index()
    {
        return CollaborativePoint::orderBy('id', 'desc')->get();
    }
}
