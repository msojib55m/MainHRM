<?php

namespace App\Http\Controllers;
use App\Models\SetupRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SetupRuleController extends Controller
{
    public function index()
    {
        return response()->json(SetupRule::all());
    }



public function store(Request $request)
{
    $data = $request->all();

    $validated = Validator::make($data, [
        'name' => 'required|string',
        'type' => 'required|string',

        // time না হলে এগুলো লাগবে
        'amount' => 'required_unless:type,time|numeric|nullable',
        'is_percent' => 'required_unless:type,time|boolean',
        'effect_on' => 'nullable|string',

        // টাইম হলে এগুলো লাগবে
        'start_time' => 'required_if:type,time',
        'end_time' => 'required_if:type,time',

        'is_active' => 'required|boolean',
    ])->validate();

    $rule = new SetupRule();
    $rule->name = $validated['name'];
    $rule->type = $validated['type'];
    $rule->amount = $validated['amount'] ?? null;
    $rule->start_time = $validated['start_time'] ?? null;
    $rule->end_time = $validated['end_time'] ?? null;
    $rule->is_percent = $validated['is_percent'] ?? false;
    $rule->effect_on = $validated['effect_on'] ?? null;
    $rule->is_active = $validated['is_active'];
    $rule->save();

    return response()->json(['message' => 'Rule saved successfully']);
}
public function update(Request $request, $id)
{
    $rule = SetupRule::findOrFail($id);

    $rule->type = $request->type;
    $rule->name = $request->name;
    $rule->amount = $request->amount;
    $rule->is_percent = $request->is_percent;
    $rule->effect_on = $request->effect_on;
    $rule->is_active = $request->is_active;
    $rule->start_time = $request->start_time;
    $rule->end_time = $request->end_time;

    $rule->save();

    return response()->json(['message' => 'Rule updated successfully', 'data' => $rule]);
}

}
