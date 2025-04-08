<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;

class NoticeController extends Controller
{
    public function store(Request $request)
    {
        try {
            // ✅ Input validation
            $request->validate([
                'notice_type' => 'required|string',
                'notice_description' => 'required|string',
                'notice_date' => 'required|date',
                'notice_by' => 'required|string',
                'notice_attachment' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
            ]);
    
            // ✅ File upload
            $filePath = null;
            if ($request->hasFile('notice_attachment')) {
                $filePath = $request->file('notice_attachment')->store('notices', 'public');
            }
    
            // ✅ Data insert
            $notice = Notice::create([
                'notice_type' => $request->notice_type,
                'notice_description' => $request->notice_description,
                'notice_date' => $request->notice_date,
                'notice_by' => $request->notice_by,
                'notice_attachment' => $filePath,
            ]);
    
            return response()->json(['message' => '✅ Notice saved successfully!', 'notice' => $notice]);
    
        } catch (\Exception $e) {
            // 🔥 Debugging - Server error response
            return response()->json([
                'message' => '❌ Server Error!',
                'error' => $e->getMessage(), // ✅ Show actual error
            ], 500);
        }
        
    }
    
    // ডাটা আনা হচ্ছে
    public function index()
    {
        return response()->json(Notice::all());
    }
    // edit now
    
    public function update(Request $request, $id)
    {
        $notice = Notice::find($id);
        if (!$notice) {
            return response()->json(['message' => 'Notice not found'], 404);
        }

        // Update notice data
        $notice->update([
            'notice_type' => $request->notice_type,
            'notice_description' => $request->notice_description,
            'notice_date' => $request->notice_date,
            'notice_by' => $request->notice_by
        ]);

        return response()->json(['message' => 'Notice updated successfully', 'notice' => $notice], 200);
    }
    // delete now
    public function destroy($id)
    {
        $notice = Notice::find($id);

        if (!$notice) {
            return response()->json(['message' => 'Notice not found'], 404);
        }

        $notice->delete();

        return response()->json(['message' => 'Notice deleted successfully'], 200);
    }
}
