import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalMessage from './ModalMessage';
import PatientService from '../services/patient';


function UserForm({ onClose, onAddPatientSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+',
        phoneNumber: '',
        documentPhoto: null,
        documentPhotoPreview: '',
    });
    const [errors, setErrors] = useState({});
    const [messageInfo, setMessageInfo] = useState({});

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg',
        onDrop: acceptedFiles => {
            setFormData({
                ...formData,
                documentPhoto: acceptedFiles[0],
                documentPhotoPreview: URL.createObjectURL(acceptedFiles[0])
            });
        }
    });

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.match(/^[a-zA-Z\s]*$/)) {
            newErrors.name = "Name must only contain letters.";
        }
        if (!formData.email.endsWith("@gmail.com")) {
            newErrors.email = "Email must end with @gmail.com.";
        }
        if (formData.countryCode === '+' || !formData.phoneNumber.match(/^\d+$/)) {
            newErrors.phoneNumber = "Please, enter a valid country code and phone number.";
        }
        if (!formData.documentPhoto) {
            newErrors.documentPhoto = "Please upload a photo (.jpg).";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    }


    const onSubmit = async (formData) => {
         const patient = await PatientService.createPatient(formData);
       if (patient !== undefined) {
           onAddPatientSuccess(patient);
           setMessageInfo({
               isVisible: true,
               message: 'Patient created successfully.',
               type: 'success',
           });
       }else{
              setMessageInfo({
                isVisible: true,
                message: 'There was an error creating the patient.',
                type: 'error',
              });
         }
    }


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="user-form-bckg">
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white rounded-lg p-5 m-4 max-w-xl w-full shadow-xl">
                    <div className="mt-5">
                        <button onClick={onClose} type="button" className="inline-flex w-fit px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none float-rightX">
                            x
                        </button>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">Add Patient</h3>
                        <form className="p-4 text-black grid" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                className="border bg-slate-100 p-2 rounded m-1	"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                            <input
                                type="email"
                                name="email"
                                className="border bg-slate-100 p-2 rounded m-1	"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                            <div className='inline-flex w-full'>
                                <input
                                    type="text"
                                    name="countryCode"
                                    className="border p-2 bg-slate-100 rounded w-3/12 m-1	"
                                    placeholder="Country code"
                                    value={formData.countryCode}
                                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                />
                                {errors.countryCode && <p className="text-red-500">{errors.countryCode}</p>}
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="border p-2 bg-slate-100 rounded w-9/12 m-1	"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                            <div {...getRootProps({ className: 'dropzone border m-1	p-2 rounded' })}>
                                <input {...getInputProps()} />
                                <p>Drag and drop or upload a file here</p>
                                {formData.documentPhoto && (
                                    <div>
                                        <img src={formData.documentPhotoPreview} alt="Document photo" className="mt-2 w-24 h-24 object-cover" />
                                        <p className="text-sm text-gray-600">{formData.documentPhoto.name}</p>
                                    </div>
                                )}
                                {errors.documentPhoto && <p className="text-red-500">{errors.documentPhoto}</p>}
                            </div>
                            <div className="mt-5">
                                <button type="submit" className="inline-flex justify-center w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md focus:outline-none">
                                    Create Patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            {messageInfo.isVisible && (
                <ModalMessage
                    message={messageInfo.message}
                    type={messageInfo.type}
                    onClose={() => setMessageInfo({ ...messageInfo, isVisible: false })}
                />
            )}
        </div >

    );
}

export default UserForm;
