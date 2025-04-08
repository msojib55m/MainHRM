<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FileUpload;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'bulk' => 'required|file|mimes:xlsx,csv|max:2048', // শুধু Excel ও CSV অনুমোদিত
        ]);
    
        if ($request->hasFile('bulk')) {
            $file = $request->file('bulk');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
    
            // ডাটাবেজে ফাইল সংরক্ষণ
            FileUpload::create([
                'file_name' => $fileName,
                'file_path' => $filePath,
            ]);
    
            return response()->json([
                'message' => 'File uploaded successfully!',
                'file' => $filePath
            ]);
        }
    
        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
