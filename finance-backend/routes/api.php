<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // income
    Route::post('/income',[IncomeController::class,'addIncome']);
    Route::get('/income',[IncomeController::class,'listIncome']);
    Route::delete('/income/{id}',[IncomeController::class,'deleteIncome']);
    Route::put('/income/{id}',[IncomeController::class,'updateIncome']);

    // expense
    Route::post('/expense',[ExpenseController::class,'addExpense']);
    Route::get('/expense',[ExpenseController::class,'listExpense']);
    Route::delete('/expense/{id}',[ExpenseController::class,'deleteExpense']);
    Route::put('/expense/{id}',[ExpenseController::class,'updateExpense']);

    // transaction
    Route::get('/transactions',[TransactionController::class,'listTransaction']);
});





