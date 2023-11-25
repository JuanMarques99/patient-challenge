<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:patients',
            'phone_number' => 'required',
            'document_photo' => 'required',
            ]);
    
        $patient = Patient::create($validatedData);
        return response()->json($patient, 201);
    }
}
