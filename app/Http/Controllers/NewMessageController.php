<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewMessageTerm;
use Illuminate\Support\Facades\Log;
class NewMessageController extends Controller
{
public function store(Request $request)
{
   
    $request->validate([
        'candidate_name' => 'required|string|max:255',
      'receiver_name' => 'required|string',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    NewMessageTerm::create([
        'candidate_name' => $request->candidate_name,
        'receiver_name' => $request->receiver_name,
        'subject' => $request->subject,
        'message' => $request->message,
    ]);

    return response()->json(['message' => 'Selection term saved successfully']);
}


    public function index()
    {
        return response()->json(NewMessageTerm::orderBy('id', 'desc')->get());
    }

    public function update(Request $request, $id)
{
    // ✅ ডাটা যাচাই
    $request->validate([
        'candidate_name' => 'required|string|max:255',
          'receiver_name' => 'required|string',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    // ✅ ডাটাবেজ থেকে ডাটা খুঁজে বের করা
    $term = NewMessageTerm::findOrFail($id);

    // ✅ ডাটা আপডেট করা
    $term->update([
        'candidate_name' => $request->candidate_name,
        'receiver_name' => $request->receiver_name,
        'subject' => $request->subject,
        'message' => $request->message,
    ]);

    // ✅ রেসপন্স রিটার্ন
    return response()->json(['message' => 'Selection term updated successfully']);
}
public function destroy($id)
{
    $term = NewMessageTerm::findOrFail($id);
    $term->delete();

    return response()->json(['message' => 'Deleted successfully']);
}

}
