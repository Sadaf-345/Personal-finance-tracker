<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;

class TransactionController extends Controller
{
    public function listTransaction(Request $req)
    {
        $user = $req->user(); 

        $transactions = Transactions::where('user_id', $user->id)
                    ->orderBy('tdate', 'desc')
                    ->get();

        return response()->json($transactions);
    }

}
