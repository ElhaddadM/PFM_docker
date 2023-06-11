<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
   {
       return response()->json([
           'Employees' => Employee::get()
       ]);

   }

   /**
    * Store a newly created resource in storage.
    */

   public function store(Request $request)
   {
       $Employee = new Employee;
       $Employee->NomComplet = $request->NomComplet;
       $Employee->Tele = $request ->Tele;
       $Employee->Email = $request ->Email;
       $Employee->Password = $request ->Password;
       $Employee->Service = $request ->Service;


       $Employee ->save();

       return response()->json([
           'message'=> 'Employee Added Success',
           'status'=>'success',
           'data'=> $Employee
       ]);
   }

   /**
    * Display the specified resource.
    */
   public function show($id) // Request $request, Rdv $rdv,
   {
        $employee = Employee::where('id',$id)->get();
       return response()->json(['Employee'=>$employee]);
   }

   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, Employee $employee)
   {


        $employee->NomComplet = $request->NomComplet;
        $employee->Tele = $request ->Tele;
        $employee->Email = $request ->Email;
        $employee->Password = $request ->Password;
        $employee->Service = $request ->Service;
        $employee ->save();

       return response()->json([
           'message'=> 'Employee updated',
           'status'=>'success',
           'data'=>$employee
       ]);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(Employee $employee)
   {
       $employee -> delete();
       return response()->json([
           'message'=>'Employee deleted',
           'status'=>'success'
       ]);
   }
   public function login(Request $request){
    $m =  Employee::where($request->all())->get();
    return response()->json(["Employee"=> $m]);
   }
}
