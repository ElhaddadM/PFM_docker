<?php

namespace App\Http\Controllers;

use App\Models\Parametre;
use Illuminate\Http\Request;

class ParametreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() //SELECT * FROM `rdvs`
    {
        return response()->json([
            'Parametre' => Parametre::get()
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $Parametre = new Parametre;
        $Parametre->WorkStart = $request->WorkStart;
        $Parametre->WorkEnd = $request ->WorkEnd;
        $Parametre->Interval = $request ->Interval;
        $Parametre->WorkPause = $request ->WorkPause;
        $Parametre->WorkPauseEnd = $request ->WorkPauseEnd;
        $Parametre ->save();

        return response()->json([
            'message'=> 'Parametre Added Success',
            'status'=>'success',
            'data'=> $Parametre
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) // Request $request, Rdv $rdv,
    {
     //    return response()->json(['Rdv'=>$Rdv]);
     // $m =  DB::select("SELECT * FROM `rdvs` where id= ? or  Token = ? ",[$token,$token]  );
         $Parametre = Parametre::where('id',$id)->get();
        return response()->json(['Parametre'=>$Parametre]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Parametre $parametre)
    {


         $parametre->WorkStart = $request->WorkStart;
         $parametre->WorkEnd = $request ->WorkEnd;
         $parametre->Interval = $request ->Interval;
         $parametre->WorkPause = $request ->WorkPause;
         $parametre->WorkPauseEnd = $request ->WorkPauseEnd;
         $parametre ->save();

        return response()->json([
            'message'=> 'Employee updated',
            'status'=>'success',
            'data'=>$parametre
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parametre $parametre)
    {
        $parametre -> delete();
        return response()->json([
            'message'=>'parametre deleted',
            'status'=>'success'
        ]);
    }
}
