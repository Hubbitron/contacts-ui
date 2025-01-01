import React, { useEffect, useState } from 'react'
import { Contact } from './model/Contact'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { callFetch, callFetchFile } from '../helper/Global';
import { Link, NavigateFunction, useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { formattedDate } from '../helper/Utilities';

const ContactList = () => {

    const [rows, setRows] = useState<Contact[]>([]);
    let navigate: NavigateFunction = useNavigate();
    
    const onAdd = () => {
        navigate('/contactedit/0');
    };

    const onDelete = async (contact: Contact): Promise<void> => {
        const result: boolean = window.confirm("Are you sure about this? You really want to delete " + contact.firstName + " " + contact.lastName + " " + "?");
        if (!result) {
            return;
        }

        const response = await callFetch("/delete/" + contact.id, "DELETE", "");

        const updatedRows = rows.filter((item: Contact) => 
            contact.id !== item.id
        );

        setRows (updatedRows);

    };

    useEffect(() => {

        const getRows = async(): Promise<void> => {
            const response = await callFetch("/getAll", "GET", "");
            const rowsFromServer: Contact[] = await response.json();
            setRows(rowsFromServer);
        };
    
        getRows();

    },[]);

    const downloadProfilePic = async(id: number): Promise<void> => {
        
        const endpoint: string = "/getProfilePic/" + id;
        const response = await callFetchFile(endpoint, "GET", "");
        if (response.status !== 200) {
            alert("Error downloading file, error code 200");
            return;
        }

        const profilePic = await response.blob();
        const url = window.URL.createObjectURL(profilePic);
        const fileName = response.headers.get("Content-Disposition")?.split("filename=")[1];
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName ?? "");
        document.body.appendChild(link);
        link.click();
        if(link.parentNode) {
            link.parentNode.removeChild(link);
        }
        setTimeout(() => window.URL.revokeObjectURL(url), 500);
    };

  return(
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
                                <div className='mat-header-cell-left'>
                                    ID
                                </div>
                            </TableCell>
                            <TableCell>
                                Last Name
                            </TableCell>
                            <TableCell>
                                Middle Name
                            </TableCell>
                            <TableCell>
                                First Name
                            </TableCell>
                            <TableCell>
                                <div className='mat-header-cell-left'>
                                DOB
                                </div>
                            </TableCell>
                            <TableCell>
                                Address Line 1
                            </TableCell>
                            <TableCell>
                                Profile Pic
                            </TableCell>
                            <TableCell>
                                <div>
                                    Remove
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: Contact) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell className='mat-cell-left'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        <Link to = {"/contactedit/" + row.id} className="hyperlink">
                                            {row.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.middleName}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {formattedDate(row.dob)}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.addressLine1}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant = "secondary" type = "button" onClick={() => downloadProfilePic(row.id)}>
                                            Download
                                        </Button>
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        <Button variant = "secondary" type = "button" onClick={() => onDelete(row)}>
                                            X
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </div>
  );
}

export default ContactList