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
                                Patient Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Name: {patient.name}</TableCell>
                                        <TableCell>Email: {patient.email}</TableCell>
                                        <TableCell>Phone number: {patient.phone_number}</TableCell>
                                        {/* Agregue la ruta en donde se corre mi proyecto. Use storage para almacenar estas fotos en storage/documents*/}
                                        <TableCell>Document file: <img src={'http://localhost:8000/' + patient.document_photo} alt={`Documento de ${patient.name}`} style={{ maxWidth: '100%', height: 'auto' }} /></TableCell>
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

export default CollapsibleRow;
