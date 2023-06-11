<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RdvController;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/mail', [MailController::class,'index']);

Route::get('/{paramettre?}',function($paramettre = null){
    $url = action([RdvController::class, 'index']);
    return $url;
    // return view('welcome',['paramettre' => $paramettre ]);
});

Route::get('/test',function($paramettre = null){

    return 'test' ;
})->name('ana');


