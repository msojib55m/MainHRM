<?php

namespace App\Http\Controllers;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
       public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'symbol' => 'required|string',
            'country' => 'required|string',
            'status' => 'required|in:active,inactive',
        ]);

        $currency = Currency::create($request->all());

        return response()->json($currency);
    }

    public function index()
    {
        return response()->json(Currency::all());
    }
public function update(Request $request, $id) {
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'symbol' => 'required|string|max:10',
        'country' => 'required|string|max:255',
        'status' => 'required|string|in:active,inactive',
    ]);

    $currency = Currency::findOrFail($id);
    $currency->update($validated);

    return response()->json($currency, 200);
}
public function destroy($id)
{
    $currency = Currency::find($id);

    if (!$currency) {
        return response()->json(['message' => 'Currency not found'], 404);
    }

    $currency->delete();

    return response()->json(['message' => 'Currency deleted successfully']);
}

}
