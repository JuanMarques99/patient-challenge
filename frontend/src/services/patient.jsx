import axios from 'axios';
import { useState, useEffect } from 'react';

const getAllPatients = () => {
    const [patients, setPatients] = useState([]);

    const fetchPatients = () => {
        axios.get(process.env.PATIENTS_ENDPOINT_API_URL)
            .then(response => {
                const updatedPatients = response.data['patients'].map(patient => ({
                    ...patient,
                }));
                setPatients(updatedPatients);
            })
            .catch(error => {
                console.error('There was an error fetching the patients', error);
            });
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return patients;
}

const createPatient = (patient) => {
    const formDataWithPhoto = new FormData();
    formDataWithPhoto.append('name', patient.name);
    formDataWithPhoto.append('email', patient.email);
    formDataWithPhoto.append('phone_number', patient.countryCode + '' + patient.phoneNumber);
    formDataWithPhoto.append('document_photo', patient.documentPhoto);

    return fetch('http://localhost/api/patients', {
        method: 'POST',
        body: formDataWithPhoto,
    })
    .then(response => response.json())
    .then(data => {
        if (data.patient !== undefined) {  
            return data.patient;
        } else {
            return (data.message || "Error desconocido");
        }
    })
    .catch((error) => {
        throw error;
    });
}


const PatientService = {
    getAllPatients,
    createPatient,
  };

export default PatientService;