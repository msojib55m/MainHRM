<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signature;
use Illuminate\Support\Facades\Storage;
class SignatureController extends Controller
{
    // data get now
    public function index()
    {
        $committees = Signature::all();
    
        // Storage path-কে পূর্ণ URL বানিয়ে ফেরত পাঠানো হচ্ছে
        $committees->transform(function ($item) {
            $item->signature = asset('storage/' . $item->signature);
            return $item;
        });
    
        return response()->json($committees);
    }
   
    // data staore
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'signature' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);
    
        // ফাইল আপলোড
        $imagePath = $request->file('signature')->store('signatures', 'public');  // 'public' ডিস্ক ব্যবহার
    
        // কমিটি ডেটা সেভ করা
        $committee = Signature::create([
            'name' => $request->name,
            'signature' => $imagePath,  // ফাইলের পাথ ডাটাবেসে সেভ হচ্ছে
        ]);
    
        return response()->json($committee);
    }
    // update
    public function update(Request $request, $id)
    {
        $committee = Signature::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'signature' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
    
        $committee->name = $request->name;
    
        // Check if new file is uploaded
        if ($request->hasFile('signature')) {
            // Delete old signature file if exists
            if ($committee->signature) {
                $oldPath = str_replace('storage/', '', $committee->signature); // remove public URL part
                Storage::disk('public')->delete($oldPath);
            }
    
            // Store new signature
            $path = $request->file('signature')->store('signatures', 'public');
            $committee->signature = 'signatures/' . basename($path);
        }
    
        $committee->save();
    
        return response()->json([
            'message' => 'Committee updated successfully',
            'committee' => $committee,
        ]);
    }
    // delete now 
    public function destroy($id)
    {
        $committee = Signature::findOrFail($id);
    
        // পুরাতন সিগনেচার ইমেজ ডিলিট করো (যদি থাকে)
        if ($committee->signature) {
            Storage::disk('public')->delete($committee->signature);
        }
    
        // ডেটাবেইজ থেকে রেকর্ড ডিলিট করো
        $committee->delete();
    
        return response()->json(['message' => 'Committee deleted successfully']);
    }
}
