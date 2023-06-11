<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Mail\SendMail;
class MailController extends Controller
{
    public function index(Request $request){

        $mailData =[
            'body' =>  $request-> Token
        ];
        Mail::to($request->Email)->send( new SendMail($mailData));
        dd('Emailsend Successfully.');
        // return $request->Email;

    }
}
