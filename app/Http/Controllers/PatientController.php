<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Mail\PatientRegistered;
use App\Jobs\SendPatientRegisteredEmail;

class PatientController extends Controller
{

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:patients,email',
                'phone_number' => 'required',
                'document_photo' => 'required'
            ]);


            $documentPath = $request->file('document_photo')->store('public/documents');

            $patient = Patient::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'phone_number' => $validatedData['phone_number'],
                'document_photo' => $documentPath
            ]);

            SendPatientRegisteredEmail::dispatch($patient);

            return response()->json([
                'message' => 'Patient created successfully',
                'patient' => $patient
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Patient registration failed!',
                'error' => $e->getMessage()
            ], 409);
        }
    }


    public function index()
    {
        $patients = Patient::all();

        return response()->json([
            'patients' => $patients
        ], 200);
    }

    public function show(Patient $patient)
    {
        return response()->json([
            'patient' => $patient
        ], 200);
    }
}