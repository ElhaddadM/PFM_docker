<?php

namespace App\Http\Controllers;

use App\Models\Rdv;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RdvController extends Controller
{   /**
    * Display a listing of the resource.
    */
   public function index() //SELECT * FROM `rdvs`
   {
       return response()->json([
           'Rdv' => Rdv::get()
       ]);

   }

   /**
    * Store a newly created resource in storage.
    */

   public function store(Request $request)
   {
       $Rdv = new Rdv;
       $Rdv->NomComplet = $request->NomComplet;
       $Rdv->Email = $request ->Email;
       $Rdv->Tele = $request ->Tele;
       $Rdv->Date = $request ->Date;
       $Rdv->Heure = $request ->Heure;
       $Rdv->Service = $request ->Service;
       $Rdv->Token = $request ->Token;

       $Rdv ->save();

       return response()->json([
           'message'=> 'RDV Added Success',
           'status'=>'success',
           'data'=> $Rdv
       ]);
   }

   /**
    * Display the specified resource.
    */
   public function show($token) // Request $request, Rdv $rdv,
   {
    //    return response()->json(['Rdv'=>$Rdv]);
    // $m =  DB::select("SELECT * FROM `rdvs` where id= ? or  Token = ? ",[$token,$token]  ); Service
        $m = Rdv::where('id',$token)->orWhere('Token',$token)->orWhere('Date',$token)->orWhere('Service',$token)->orWhere('NomComplet',$token)->orWhere('Heure',$token) ->orWhere('Email',$token)  ->get();
       return response()->json(['Rdv'=>$m]);
   }
   public function showByService($token) // Request $request, Rdv $rdv,
   {
        $m = Rdv::where('Service',$token)
        ->where('Date',date("Y-m-d"))
        ->get();
       return response()->json(['Rdv'=>$m]);
   }
   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, Rdv $rdv)
   {


        $rdv->Email = $request ->Email;
        $rdv->Tele = $request ->Tele;
        $rdv->Date = $request ->Date;
        $rdv->Heure = $request ->Heure;
        $rdv->Service = $request ->Service;
        $rdv->Token = $request ->Token;
        $rdv->Status = $request ->Status;
        $rdv->NomComplet = $request->NomComplet;

       $rdv ->save();

       return response()->json([
           'message'=> 'Rdv updated',
           'status'=>'success',
           'data'=>$rdv
       ]);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(Rdv $rdv)
   {
       $rdv -> delete();
       return response()->json([
           'message'=>'rdv deleted',
           'status'=>'success'
       ]);
   }
   public function Cancel(Request $request){
    $m = Rdv::where($request->all())->get();
    return response()->json(["Data"=> $m]);

   }
   public function token(Request $request){
    $m = Rdv::where($request->all())->get();


    return response()->json(["Data"=> $m]);

   }
   public function Search(Request $request){
        $m = Rdv::where('Service',$request->Service )->orWhere('Token',$request->Token)->orWhere('Date',$request->Date)->orWhere('NomComplet',$request->NomComplet)->orWhere('Heure',$request->Heure) ->orWhere('Email',$request->Email) ->get();


        return response()->json(["Data"=> $m]);

   }
   public function searchDate(Request $request){
        $result = Rdv::where($request->all())->get();
        return response()->json(["results" => $result ]);
   }
   public function CountRdv(){
    $Inscription = Rdv::where('Service','Inscription')->get()->count();
    $Reinscription = Rdv::where('Service','Reinscription')->get()->count();
    $Certificat = Rdv::where('Service','Certificat')->get()->count();
    $rdvCount = [
            [
                "Service" => "Inscription",
                "Nbr" =>  $Inscription ,
            ],
             [
                "Service" => "Reinscription",
                "Nbr" =>  $Reinscription ,
            ],
            [
                "Service" => "Certificat",
                "Nbr" =>  $Certificat ,
            ]
    ];
    return response()->json(["CountRdv"=>  $rdvCount    ]);

   }

   public function CountRdvCurrent(){
    $Inscription = Rdv::where('Service','Inscription')
                    ->where('Date',date("Y-m-d"))
                    ->get()->count();
    $Reinscription = Rdv::where('Service','Reinscription')
                    ->where('Date',date("Y-m-d"))
                    ->get()->count();
    $Certificat = Rdv::where('Service','Certificat')
                    ->where('Date',date("Y-m-d"))
                    ->get()->count();
    $rdvCount = [
            [
                "Service" => "Inscription",
                "Nbr" =>  $Inscription ,
            ],
             [
                "Service" => "Reinscription",
                "Nbr" =>  $Reinscription ,
            ],
            [
                "Service" => "Certificat",
                "Nbr" =>  $Certificat ,
            ]
    ];
    return response()->json(["CountRdv"=> $rdvCount    ]);

   }






}
