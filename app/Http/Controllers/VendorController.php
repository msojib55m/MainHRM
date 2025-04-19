<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;
class VendorController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string',
            'mobile'  => 'required|string',
            'email'   => 'required|email',
            'address' => 'required|string',
            'country' => 'nullable|string',
            'city'    => 'nullable|string',
            'zip'     => 'nullable|string',
            'balance' => 'nullable|numeric',
        ]);
    
        $vendor = Vendor::create($request->all());
    
        return response()->json(['message' => 'Vendor created successfully', 'vendor' => $vendor]);
    }
    
    public function index()
    {
        return response()->json(Vendor::all());
    }
    public function update(Request $request, $id)
     {
         $vendor = Vendor::findOrFail($id);
         $vendor->update($request->all());
         return response()->json(['vendor' => $vendor]);
     }
     
    public function destroy($id)
    {
        $vendor = Vendor::find($id);
        if (!$vendor) {
            return response()->json(['message' => 'Vendor not found'], 404);
        }
    
        $vendor->delete();
    
        return response()->json(['message' => 'Vendor deleted successfully']);
    }

}
