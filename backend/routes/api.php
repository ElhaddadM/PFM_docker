<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RdvController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\VacanceController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ParametreController;
use App\Http\Controllers\ResetMailController;
use App\Http\Controllers\TanksMailController;
use App\Http\Controllers\ConfirmMailController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Table RDV

Route::get('rdv',[RdvController::class,'index']);
Route::post('rdv',[RdvController::class,'store']);
Route::get('rdv/count',[RdvController::class,'CountRdv']);
Route::get('rdv/count/Current',[RdvController::class,'CountRdvCurrent']);
Route::get('rdv/current/{rdv}',[RdvController::class,"showByService"]);
Route::get('rdv/{rdv}',[RdvController::class,"show"]);
Route::put('rdv/{rdv}',[RdvController::class,'update']);
Route::delete('rdv/{rdv}',[RdvController::class,'destroy']);
Route::post('rdv/cancel',[RdvController::class,'Cancel']);
Route::post('rdv/token',[RdvController::class,'token']);
Route::post('rdv/search',[RdvController::class,'Search']);
Route::post('rdv/date',[RdvController::class,'searchDate']);


//Table Employee

Route::get('employee',[EmployeeController::class,'index']);
Route::post('employee',[EmployeeController::class,'store']);
Route::post('employee/login',[EmployeeController::class,'login']);
Route::get('employee/{employee}',[EmployeeController::class,"show"]);
Route::put('employee/{employee}',[EmployeeController::class,'update']);
Route::delete('employee/{employee}',[EmployeeController::class,'destroy']);

//Table Parametre

Route::get('parametre',[ParametreController::class,'index']);
Route::post('parametre',[ParametreController::class,'store']);
Route::get('parametre/{parametre}',[ParametreController::class,"show"]);
Route::put('parametre/{parametre}',[ParametreController::class,'update']);
Route::delete('parametre/{parametre}',[ParametreController::class,'destroy']);

//Send Email

Route::post('/email/token', [MailController::class,'index']);
Route::post('/email/confirm',[ConfirmMailController::class,'index']);
Route::post('/email/reset',[ResetMailController::class,'index']);
Route::post('/email/tanks',[TanksMailController::class,'index']);

// Vacances Table
Route::get('vacance',[VacanceController::class,'index']);
Route::get('vacance/{service}',[VacanceController::class,"show"]);
Route::post('vacance',[VacanceController::class,'store']);
Route::delete('vacance/{vacance}',[VacanceController::class,'destroy']);




