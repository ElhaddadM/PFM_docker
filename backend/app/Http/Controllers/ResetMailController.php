<?php

namespace App\Http\Controllers;

use Mail;
use App\Mail\ResetMail;

use Illuminate\Http\Request;

class ResetMailController extends Controller
{
    public function index(Request $request){

        $mailData =[
            'Name' => $request-> Name,
            'Token' =>  $request-> Token,
        ];
        // $request-> Heure
        Mail::to($request->Email)->send( new ResetMail($mailData));
        dd('Emailsend Successfully.');
        // return $request->Email;

    }
}
