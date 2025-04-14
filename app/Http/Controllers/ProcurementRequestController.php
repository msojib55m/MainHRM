<?php

namespace App\Http\Controllers;

use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;

class ProcurementRequestController extends Controller
{
    public function store(HttpRequest $request)
    {
        // ডাটাবেজে সেভ করার জন্য
        $newRequest = Request::create([
            'employee' => $request->employee,
            'position' => $request->position,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description1' => $request->description1,
            'description2' => $request->description2,
            'unit_id' => $request->unit_id,
            'amount' => $request->amount,
        ]);

        // সফল হলে JSON রেসপন্স পাঠানো
        return response()->json(['message' => 'Request created successfully', 'data' => $newRequest]);
    }
    public function index()
    {
        // $employees = Request::select('employee', 'position', 'end_date', 'amount')->get();
        // return response()->json($employees);
        $employees = Request::all();
        return response()->json($employees);
    }
    // update
    

    public function edit($id)
{
    $data = Request::findOrFail($id);
    return response()->json($data);
}
public function update(HttpRequest $request, $id)
{
    \Log::info($request->all());

    $data = Request::findOrFail($id);

    $data->employee = $request->input('employee');
    $data->position = $request->input('position');
    $data->start_date = $request->input('start_date');
    $data->end_date = $request->input('end_date');
    $data->description1 = $request->input('description1');
    $data->description2 = $request->input('description2');
    $data->amount = $request->input('amount');
    $data->save();

    return response()->json(['message' => 'Data updated successfully']);
}

}
