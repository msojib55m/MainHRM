<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Award;
class AwardController extends Controller
{
  // data to mysql add
    public function store(Request $request)
    {
      $data = new Award();
      $data->awardName = $request->awardName;
      $data->description = $request->description;
      $data->giftItem = $request->giftItem;
      $data->date  = $request->date;
      $data->employeeName = $request->employeeName;
      $data->awardBy = $request->awardBy;
      $data->save();
      return response()->json(['message' => 'Data saved successfully!']);
    }

    // mysql to laravel to react table
     public function index()
    {
        return response()->json(Award::latest()->get());
    }
    // data update to mysql react to mysql
    public function update(Request $request,$id)
    {
      $data = Award::find($id);
      // update data table
      $data->awardName = $request->awardName;
      $data->description = $request->description;
      $data->giftItem = $request->giftItem;
      $data->date  = $request->date;
      $data->employeeName = $request->employeeName;
      $data->awardBy = $request->awardBy;
      $data->save();
      return response()->json([
        "success"=>true,
        "updatedItem"=>$data
      ]);
    }
    // delete to mysql and react tale
    public function delete($id)
    {
      $data = Award::find($id);
      $data->delete();
      return response()->json(['success'=>true]);
    }
}
