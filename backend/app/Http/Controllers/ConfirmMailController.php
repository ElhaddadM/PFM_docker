<?php

namespace App\Http\Controllers;
use Mail;
use App\Mail\ConfirmMail;
use Illuminate\Http\Request;

class ConfirmMailController extends Controller
{
    public function index(Request $request){

        $mailData =[
            'Name' => $request-> Name,
            'Date' => $request-> Date,
            'Heure' => $request-> Heure,
            'Token' =>  $request-> Token,
        ];
        // $request-> Heure
        Mail::to($request->Email)->send( new ConfirmMail($mailData));
        dd('Emailsend Successfully.');
        // return $request->Email;

    }
}
