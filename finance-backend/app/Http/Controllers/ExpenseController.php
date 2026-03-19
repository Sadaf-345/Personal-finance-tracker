<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\Transactions;

class ExpenseController extends Controller
{
    public function addExpense(Request $req)
    {
        $user = $req->user();

        $expense = new Expense();
        $expense->user_id = $user->id;  
        $expense->category = $req->category;
        $expense->amount = $req->amount;
        $expense->description = $req->description;
        $expense->expense_date = $req->expense_date;
        $expense->save();

        Transactions::create([
            'user_id' => $user->id,  
            'ttype' => 'expense',
            'category' => $req->category,
            'amount' => $req->amount,
            'tdate' => $req->expense_date,
            'ref_id' => $expense->id
        ]);

        return response()->json([
            "message" => "Expense added successfully"
        ]);
    }

    public function listExpense(Request $req)
    {
        $user = $req->user();

        return Expense::where('user_id', $user->id)->get();
    }

    public function deleteExpense(Request $req, $id)
    {
        $user = $req->user();

        $expense = Expense::where('id', $id)
                        ->where('user_id', $user->id)
                        ->firstOrFail();

        $expense->delete();

        Transactions::where('ref_id', $id)
            ->where('ttype', 'expense')
            ->where('user_id', $user->id)
            ->delete();

        return response()->json(['message'=>'Deleted']);
    }

    public function updateExpense(Request $req, $id)
    {
        $user = $req->user();

        $expense = Expense::where('id', $id)
                        ->where('user_id', $user->id)
                        ->firstOrFail();

        $expense->update([
            'category'=>$req->category,
            'amount'=>$req->amount,
            'expense_date'=>$req->expense_date,
            'description'=>$req->description
        ]);

        Transactions::where('ref_id',$id)
            ->where('ttype','expense')
            ->where('user_id', $user->id)
            ->update([
                'category'=>$req->category,
                'amount'=>$req->amount,
                'tdate'=>$req->expense_date
            ]);

        return response()->json(['message'=>'Updated']);
    }
}
