<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Mail\PatientRegistered;

class PatientController extends Controller
{
    public function store(Request $request)
    {
        // Valido los datos
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone_number' => 'required',
            'document_photo' => 'required'
        ]);
    
        // Guardo la imagen en el storage, y obtengo el path de forma de no guardar un base64 en la base de datos
        $documentPath = $request->file('document_photo')->store('public/documents');
    
        // Creo el paciente
        $patient = Patient::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'document_photo' => $documentPath
        ]);

        // Envío el mail
        $mail = Mail::to($patient->email)->queue(new PatientRegistered($patient));

        return response()->json([
            'message' => 'Patient created successfully',
            'patient' => $patient
        ], 201);
    }
    
}
