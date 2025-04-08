<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Loan;

class LoanController extends Controller
{
    public function submitLoan(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'employee_one' => 'required|string',
            'employee_two' => 'required|string',
            'loan_details' => 'required|string',
            'amount' => 'required|numeric',
            'approved_date' => 'required|date',
            'repayment_from' => 'required|string',
            'interest_percentage' => 'required|numeric',
            'installment_period' => 'required|integer',
            'repayment_amount' => 'required|numeric',
            'installment' => 'required|numeric',
            'status' => 'required|string',
        ]);

        try {
            // Create a new loan entry in the database
            $loan = Loan::create([
                'employee_one' => $request->employee_one,
                'employee_two' => $request->employee_two,
                'loan_details' => $request->loan_details,
                'amount' => $request->amount,
                'approved_date' => $request->approved_date,
                'repayment_from' => $request->repayment_from,
                'interest_percentage' => $request->interest_percentage,
                'installment_period' => $request->installment_period,
                'repayment_amount' => $request->repayment_amount,
                'installment' => $request->installment,
                'status' => $request->status,
            ]);

            // Return a response
            return response()->json(['message' => 'Loan details submitted successfully!'], 200);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json(['error' => 'Failed to submit loan details'], 500);
        }
    }
        // Get all loans
        public function getLoans()
        {
            // Retrieve all loans
            $loans = Loan::all();
    
            // Return loans as a JSON response
            return response()->json($loans);
        }
        public function update(Request $request, $id)
        {
            $loan = Loan::findOrFail($id);
            $loan->update($request->all());
            return response()->json(['message' => 'Loan updated successfully']);
        }
        public function destroy($id)
        {
            $loan = Loan::findOrFail($id);
            $loan->delete();
            return response()->json(['message' => 'Loan deleted successfully']);
        }
}
