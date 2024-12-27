import React, { useEffect, useState } from 'react'
import { Contact } from './model/Contact'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { callFetch } from '../helper/Global';
import { Link } from 'react-router';

const ContactList = () => {
    
    const [rows, setRows] = useState<Contact[]>([]);


    useEffect(() => {
        // const contactlist = [
        //     {'id': 1, lastName: 'Hubbard'},
        //     {'id': 2, lastName: 'Kim'},
        //     {'id': 3, lastName: 'Meth'}
        // ];

        const getRows = async(): Promise<void> => {
            const response = await callFetch("http://localhost:8080/ContactsApi/api/getAll", "GET", "");
            const rowsFromServer: Contact[] = await response.json();
            setRows(rowsFromServer);
        };
    
        getRows();

    },[]);

  
    return (
    <div>
        <Paper className = "paper">
            <TableContainer className = "table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Last Name
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