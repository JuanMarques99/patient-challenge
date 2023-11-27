import React from 'react';

function ModalMessage({ message, type, onClose }) {
    return (
        <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white rounded-lg shadow p-4 max-w-sm w-full m-4 animate-fade-in-down">
                <div className='text-black align-center'>
                    {message}
                </div>
                <button onClick={onClose} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default ModalMessage;
