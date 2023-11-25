import React, { useState } from 'react';

function UserForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        documentPhoto: null,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4">Nuevo usuario</h2>
            <input
                type="text"
                name="name"
                className="border p-2 rounded"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                name="email"
                className="border p-2 rounded"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="tel"
                name="phoneNumber"
                className="border p-2 rounded"
                placeholder="Número de teléfono"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <input
                type="file"
                name="documentPhoto"
                className="border p-2 rounded"
                placeholder="Foto del documento"
                onChange={(e) => setFormData({ ...formData, documentPhoto: e.target.files[0] })}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
        </form>
    );
}

export default UserForm;
