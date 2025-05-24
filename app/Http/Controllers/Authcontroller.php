<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        
        if(!Auth::attempt($data)){
            return response([
                'message' => 'email or password are wrong'
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);
    }
    // public function getEmployees()
    // {
    //     $employees = User::pluck('name')->toArray(); // অ্যারে আকারে রিটার্ন করবে
    //     return response()->json($employees);
    // }
    public function getEmployees()
{
    $employees = User::select('id', 'name')->get();  // collection of objects with id and name
    return response()->json($employees);
}

    public function getEmployeesAdd()
    {
        $employees = User::pluck('name')->toArray(); // অ্যারে আকারে রিটার্ন করবে
        return response()->json($employees);
    }
    public function getEmployeesAddTwo()
    {
        $employess = User::pluck('name')->toArray();
        return response()->json($employess);
    }

    public function EmployessId()
    {
        $employess = User::pluck('name')->toArray();
        return response()->json($employess);
    }

    public function AllEmploye()
    {
        $employess = User::pluck('name')->toArray();
        return response()->json($employess);
    }

public function index()
{
    try {
        $data = DB::table('users')
        ->leftJoin('salaries', 'users.id', '=', 'salaries.user_id')
        ->select(
            'users.id as user_id',   // 'users.id' নিশ্চিত করুন এখানে 'user_id' পাঠানো হচ্ছে
            'users.name as user_name',
            'salaries.salary_month',
            'salaries.gross_salary'
        )
        ->orderBy('users.id', 'asc')
        ->get();

        return response()->json($data);
    } catch (\Exception $e) {
        \Log::error('Error fetching salary data: ' . $e->getMessage());
        return response()->json(['error' => 'Something went wrong'], 500);
    }
  
}
    public function NewMessage()
    {
        $employess = User::pluck('name')->toArray();
        return response()->json($employess);
    }







}