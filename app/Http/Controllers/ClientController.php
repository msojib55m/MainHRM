<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Client::all());
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $client = Client::create([
            'client_name' => $request->client_name,
            'email' => $request->email,
            'company_name' => $request->company_name,
            'country' => $request->country,
            'address' => $request->address,
        ]);
    
        return response()->json($client);
    }
    public function update(Request $request, $id)
    {
        // Validation (optional but recommended)
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company_name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'country' => 'nullable|string|max:255',
        ]);

        // Find the client
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        // Update data
        $client->client_name = $validated['client_name'];
        $client->email = $validated['email'];
        $client->company_name = $validated['company_name'];
        $client->address = $validated['address'];
        $client->country = $validated['country'];
        $client->save();

        return response()->json($client); // Return updated client
    }
    public function destroy($id)
{
    $client = Client::find($id);

    if (!$client) {
        return response()->json(['message' => 'Client not found'], 404);
    }

    $client->delete();

    return response()->json(['message' => 'Client deleted successfully'], 200);
}

}
