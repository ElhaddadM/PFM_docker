<?php

namespace App\Http\Controllers;

use App\Models\Vacance;
use Illuminate\Http\Request;

class VacanceController extends Controller
{
    public function index() //SELECT * FROM `rdvs`
   {
       return response()->json([
           'Vacances' => Vacance::get()
       ]);

   }
   public function show($service) // Request $request, Rdv $rdv,
   {

        $vacance = Vacance::where('Service',$service)->get();
        return response()->json([
            'Vacances' =>  $vacance
        ]);
   }

   public function store(Request $request)
   {
       $Vacance = new Vacance;
       $Vacance->Jour = $request->Jour;
       $Vacance->Mois = $request ->Mois;
       $Vacance->Annee = $request ->Annee;
       $Vacance->All_Mois = $request ->All_Mois;
       $Vacance->Service = $request ->Service;
       $Vacance ->save();

       return response()->json([
           'message'=> 'Vacance Added Success',
           'status'=>'success',
           'data'=> $Vacance
       ]);
   }

   public function destroy(Vacance $vacance)
   {
       $vacance -> delete();
       return response()->json([
           'message'=>'vacance deleted',
           'status'=>'success'
       ]);
   }

}
