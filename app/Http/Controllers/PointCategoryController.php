<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PointCategory;

class PointCategoryController extends Controller
{
       // Store method for saving the point category
       public function store(Request $request)
       {
           // Validate incoming request
           $request->validate([
               'category_name' => 'required|string|max:255',
           ]);
   
           // Create a new point category
           $pointCategory = PointCategory::create([
               'category_name' => $request->category_name,
           ]);
   
           return response()->json($pointCategory, 201); // Return the created category with status 201
       }
   
       // Fetch all point categories
       public function index()
       {
           $pointCategories = PointCategory::all();
           return response()->json($pointCategories);
       }

       public function update(Request $request, $id)
       {
           // Find the category by ID
           $pointCategory = PointCategory::findOrFail($id);
       
           // Validate the incoming request
           $request->validate([
               'category_name' => 'required|string|max:255',  // Adjusted field name to match your column
           ]);
       
           // Update the point category with the validated data
           $pointCategory->update([
               'category_name' => $request->category_name,  // Only update the relevant field
           ]);
       
           // Return the updated point category
           return response()->json($pointCategory, 200);
       }

       public function destroy($id)
       {
           $pointCategory = PointCategory::findOrFail($id);
       
           // Delete the point category
           $pointCategory->delete();
       
           // Return a success response
           return response()->json(['message' => 'Category deleted successfully'], 200);
       }
       
}
