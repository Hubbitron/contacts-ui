import React, { useEffect, useState } from 'react'
import { Contact } from './model/Contact'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { callFetch } from '../helper/Global';
import { Link, NavigateFunction, useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

const ContactList = () => {
    
    const [rows, setRows] = useState<Contact[]>([]);
    let navigate: NavigateFunction = useNavigate();
    
    const onAdd = () => {
        navigate('/contactedit/0');
    };

    useEffect(() => {
        // const contactlist = [
        //     {'id': 1, lastName: 'Hubbard'},
        //     {'id': 2, lastName: 'Kim'},
        //     {'id': 3, lastName: 'Meth'}
        // ];

        const getRows = async(): Promise<void> => {
            const response = await callFetch("/getAll", "GET", "");
            const rowsFromServer: Contact[] = await response.json();
            setRows(rowsFromServer);
        };
    
        getRows();

    },[]);

  
    return (
    <div className='App'>
        <Button variant = "secondary" type = "button" onClick={onAdd}>
            Add
        </Button>
        <Paper className = "paper">
            <TableContainer className = "table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className='mat-header-cell-right'>
                                    ID
                                </div>
                            </TableCell>
                            <TableCell>
                                Last Name
                            </TableCell>
                            <TableCell>
                                First Name
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: Contact) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell className='mat-cell-right'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        <Link to = {"/contactedit/" + row.id} className="hyperlink">
                                            {row.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.firstName}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
  )
}

export default ContactList