<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConfirmMail extends Controller
{
    public function index(Request $request){

        $mailData =[
            "Name" => $request-> Name,
            'Date' =>  $request-> Date,
            'Heure' =>  $request-> Heure,
            'Token' =>  $request-> Token,
        ];
        Mail::to($request->Email)->send( new SendMail($mailData));
        dd('Emailsend Successfully.');
        // return $request->Email;

    }
}
