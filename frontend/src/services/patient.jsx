import axios from 'axios';
import { useState, useEffect } from 'react';


const getAllPatients = async () => {
    const response = await axios.get('http://localhost/api/patients');
    return response.data.patients;

}

const createPatient = async (patient) => {
    const formDataWithPhoto = new FormData();
    formDataWithPhoto.append('name', patient.name);
    formDataWithPhoto.append('email', patient.email);
    formDataWithPhoto.append('phone_number', patient.countryCode + '' + patient.phoneNumber);
    formDataWithPhoto.append('document_photo', patient.documentPhoto);

    try {
        const response = await axios.post('http://localhost/api/patients', formDataWithPhoto);
        return response.data.patient;
    }
    catch (error) {
        return error.response.data;
    
    }
}

const PatientService = {
    getAllPatients,
    createPatient,
  };

export default PatientService;