<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salary;

class SalaryGenerate extends Controller
{
  public function store(Request $request)
  {
      $validated = $request->validate([
          'salary_name' => 'required|date',
          'generate_date' => 'required|date',
          'salary_month' => 'required|date',
          'approved_date' => 'required|date',
          'gross_salary' => 'required|numeric',
          'net_salary' => 'required|numeric',
          'loans' => 'required|numeric',
      ]);

      $salary = Salary::create($validated);

      return response()->json(['message' => 'Salary created successfully', 'data' => $salary], 201);
  }
  public function index()
  {
      return Salary::orderBy('id', 'desc')->get();
  }
}
