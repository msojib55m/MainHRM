<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
class TasksController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_name' => 'required|string',
            'client_name' => 'required|string',
            'project_lead' => 'required|string',
            'task_count' => 'required|integer',
            'project_duration' => 'required|string',
        ]);

        Tasks::create($validated);

        return response()->json(['message' => 'Project added'], 201);
    }

    public function index()
    {
        return Tasks::orderBy('id', 'desc')->get();
    }
    // update
    public function update(Request $request, $id)
    {
        // Validate request
        $validated = $request->validate([
            'project_name' => 'required|string|max:255',
            'client_name' => 'required|string|max:255',
            'project_lead' => 'required|string|max:255',
            'task_count' => 'required|integer|min:1',
            'project_duration' => 'required|string|max:255',
        ]);

        // Find the task by ID
        $task = Tasks::findOrFail($id);

        // Update fields
        $task->update($validated);

        return response()->json([
            'message' => 'Project updated successfully!',
            'task' => $task
        ]);
    }
    // delete now id
    public function destroy($id)
    {
        $task = Tasks::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Project task not found.'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Project task deleted successfully.'
        ]);
    }
}
