import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import UserForm from './UserForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Collapse, Box, Typography, TablePagination } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import CollapsibleRow from './CollapsibleRow';
import PatientService from '../services/patient';


function UserList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [localPatients, setLocalPatients] = useState(localStorage.getItem('patients'));
    const [patients, setPatients] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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

    const fetchPatients = () => {
        if (localPatients) {
            setPatients(JSON.parse(localPatients));
        }else{
            PatientService.getAllPatients();
        }
    };

    useEffect(() => {
        if (localPatients) {
            setPatients(JSON.parse(localPatients));
        } else {
            fetchPatients();
        }
    }, []);

    return (
        <div className="mx-auto p-5 w-screen h-screen">
            <div className="flex justify-between items-center mb-6 mx-auto w-4/6">
                <h1 className="text-2xl font-bold text-black-900">Patients Table</h1>
                <button
                    onClick={handleAddPatient}
                    className="flex items-center px-4 py-2 border rounded text-teal-600 border-teal-600 hover:text-white hover:bg-teal-600">
                    <FaPlus className="mr-2" /> Add Patient
                </button>
            </div>
            <div className='w-4/6 bg-white place-content-center mx-auto'>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer >
                        <Table aria-label="collapsible table ">
                            <TableHead className='bg-slate-200' >
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
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
