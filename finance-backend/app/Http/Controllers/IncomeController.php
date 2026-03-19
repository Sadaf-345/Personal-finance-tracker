<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Income;
use App\Models\Transactions;

class IncomeController extends Controller
{
    public function addIncome(Request $req)
    {
        $user = $req->user(); 

        $income = new Income();
        $income->user_id = $user->id;   
        $income->source = $req->source;
        $income->amount = $req->amount;
        $income->frequency = $req->frequency;
        $income->income_date = $req->income_date;
        $income->save();

        Transactions::create([
            'user_id' => $user->id,  
            'ttype' => 'income',
            'category' => $req->source,
            'amount' => $req->amount,
            'tdate' => $req->income_date,
            'ref_id' => $income->id
        ]);

        return response()->json([
            "message" => "Income added successfully"
        ]);
    }

    public function listIncome(Request $req)
    {
        $user = $req->user();

        return Income::where('user_id', $user->id)->get();
    }

    public function deleteIncome(Request $req, $id)
    {
        $user = $req->user();

        $income = Income::where('id', $id)
                        ->where('user_id', $user->id)
                        ->firstOrFail();

        $income->delete();

        Transactions::where('ref_id', $id)
            ->where('ttype', 'income')
            ->where('user_id', $user->id)
            ->delete();

        return response()->json(['message'=>'Deleted']);
    }

    public function updateIncome(Request $req, $id)
    {
        $user = $req->user();

        $income = Income::where('id', $id)
                        ->where('user_id', $user->id)
                        ->firstOrFail();

        $income->update([
            'source'=>$req->source,
            'amount'=>$req->amount,
            'income_date'=>$req->income_date,
            'frequency'=>$req->frequency
        ]);

        Transactions::where('ref_id',$id)
            ->where('ttype','income')
            ->where('user_id', $user->id)
            ->update([
                'category'=>$req->source,
                'amount'=>$req->amount,
                'tdate'=>$req->income_date
            ]);

        return response()->json(['message'=>'Updated']);
    }

}
