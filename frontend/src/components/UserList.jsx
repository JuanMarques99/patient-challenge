import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UserForm from './UserForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography, TablePagination } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

function CollapsibleRow({ patient, onReload }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.phone_number}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalles del Paciente
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Nombre: {patient.name}</TableCell>
                                        <TableCell>Email: {patient.email}</TableCell>
                                        <TableCell>Teléfono: {patient.phone_number}</TableCell>
                                        <TableCell>Documento: <img src={'http://localhost:8000/' + patient.document_photo} alt={`Documento de ${patient.name}`} style={{ maxWidth: '100%', height: 'auto' }} /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [localPatients, setLocalPatients] = useState(localStorage.getItem('patients'));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [patients, setPatients] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (localPatients) {
            setPatients(JSON.parse(localPatients));
        } else {
            fetchPatients();
        }
    }, []);

    const fetchPatients = () => {
        axios.get('http://localhost/api/patients')
            .then(response => {
                const updatedPatients = response.data['patients'].map(patient => ({
                    ...patient,
                }));
                setPatients(updatedPatients);
                localStorage.setItem('patients', JSON.stringify(updatedPatients));
            })
            .catch(error => {
                console.error('There was an error fetching the patients', error);
            });
    };

    const handleAddPatientSuccess = (newPatient) => {
        const updatedPatients = [...patients, newPatient];
        setPatients(updatedPatients);
        localStorage.setItem('patients', JSON.stringify(updatedPatients));
        setIsFormVisible(false);
    };

    const handleAddPatient = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };


    return (
        <div className="mx-auto p-5 w-screen h-screen">
            <div className="flex justify-between items-center mb-6 mx-auto w-4/6">
                <h1 className="text-2xl font-bold text-black-900">Listado de Pacientes</h1>
                <button
                    onClick={handleAddPatient}
                    className="flex items-center px-4 py-2 border rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">
                    <FaPlus className="mr-2" /> Agregar Paciente
                </button>
            </div>
            <div className='w-4/6 bg-white place-content-center mx-auto'>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer >
                        <Table aria-label="collapsible table ">
                            <TableHead className='bg-slate-200' >
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
                                    <CollapsibleRow key={patient.id} patient={patient} onReload={fetchPatients} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={patients.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                {isFormVisible && <UserForm onClose={handleCloseForm} onAddPatientSuccess={handleAddPatientSuccess} />}
            </div>
        </div>

    );
}

export default UserList;
