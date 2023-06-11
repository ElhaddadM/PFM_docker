<?php

namespace App\Http\Controllers;

use Mail;

use App\Mail\TanksMail;
use Illuminate\Http\Request;

class TanksMailController extends Controller
{
    public function index(Request $request){
//$request-> Name
        $mailData =[
            'Name' => $request-> Name,
        ];
        // $request-> Heure
        Mail::to($request->Email)->send( new TanksMail($mailData));
        dd('Emailsend Successfully.');
        // return $request->Email;

    }
}
