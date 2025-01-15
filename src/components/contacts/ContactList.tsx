import React, { useContext, useEffect, useState } from 'react'
import { Contact } from './model/Contact'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { callFetch, callFetchFile } from '../helper/Global';
import { Link, NavigateFunction, useNavigate, useSearchParams } from 'react-router';
import { Button } from 'react-bootstrap';
import { formattedDate, getSortArrow, sortTableColumn } from '../helper/Utilities';
import { UserAccountContext } from '../../App';

const ContactList = () => {
    const userAccountContext = useContext(UserAccountContext);
    const [rows, setRows] = useState<Contact[]>([]);
    let navigate: NavigateFunction = useNavigate();

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const [order, setOrder] = useState<string>("ASC");
    const [sortColumn, setSortColumn] = useState<string>('');

    const [searchParams] = useSearchParams();
    const paramLastName = searchParams.get('lastName');
    const paramFirstName = searchParams.get('firstName');
    const paramStateId = searchParams.get('stateId');

    const handlePageChange = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const onAdd = () => {
        navigate('/contactedit/0');
        
    };

    const sortCol = (col: string) => {
        const result = sortTableColumn(col, sortColumn, order, rows);
        setRows(result.sortedRows);
        setOrder(result.inverseOrder);
        setSortColumn(col);
    };

    const onDelete = async (contact: Contact): Promise<void> => {
        const msg = "Are you sure about this? You really want to delete " + contact.firstName + " " + contact.lastName +  "?";
        const result: boolean = window.confirm(msg);
        if (!result) {
            return;
        }

        const response = await callFetch("/delete/" + contact.id, "DELETE", "");
        if (!response.ok) {
          alert(response.statusText);
          return;
        }

        const updatedRows = rows.filter((item: Contact) => 
            contact.id !== item.id
        );

        setRows (updatedRows);

    };

    useEffect(() => {

        const getRows = async(): Promise<void> => {
            let queryString: string = '';

            if (paramLastName) {
                queryString += '&lastName=' + paramLastName;
            }

            if (paramFirstName) {
                queryString += '&firstName=' + paramFirstName;
            }

            if (paramStateId) {
                queryString += '&stateId=' + paramStateId;
            }
                    
            queryString = queryString.length > 0 ? queryString.substring(1) : '';
            queryString = '?' + queryString;
            console.log("queryString" + '' + queryString);
        
            const response = await callFetch("/getSome" + queryString, "GET", "");
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
        {userAccountContext?.userAccount?.roleId && userAccountContext?.userAccount?.roleId === 1 &&
        <Button variant = "secondary" type = "button" onClick={onAdd} >
            Add
        </Button>
        }
        <Paper className = "paper">
            <TableContainer className = "table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("lastName")}>
                                    Last Name
                                    {getSortArrow("lastName", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("middleName")}>
                                    Middle Name
                                    {getSortArrow("middleName", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("firstName")}>
                                    First Name
                                    {getSortArrow("firstName", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("stateName")}>
                                    State
                                    {getSortArrow("stateName", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("email")}>
                                     Email
                                    {getSortArrow("email", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className = "mat-header-cell-left-sortable" onClick = {() => sortCol("dob")}>
                                    DOB
                                    {getSortArrow("dob", sortColumn, order)}
                                </div>
                            </TableCell>
                            <TableCell>
                                Profile Pic
                            </TableCell>
                            {userAccountContext?.userAccount?.roleId && userAccountContext?.userAccount?.roleId === 1 &&
                                <TableCell>
                                    <div>
                                        Remove
                                    </div>
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Contact, i: number) => {
                            return (
                                <TableRow key={row.id} className = {i % 2 === 0 ? 'even' : 'odd'} >
                                    <TableCell className='mat-cell-left'>
                                        {userAccountContext?.userAccount?.roleId && userAccountContext?.userAccount?.roleId === 1 ? 
                                            <Link to = {"/contactedit/" + row.id} className="hyperlink">
                                                {row.lastName}
                                            </Link>
                                        : 
                                            <div>
                                                {row.lastName}
                                            </div>
                                        }
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.middleName}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.stateName}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {row.email}
                                    </TableCell>
                                    <TableCell className='mat-cell-left'>
                                        {formattedDate(row.dob)}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant = "secondary" type = "button" onClick={() => downloadProfilePic(row.id)}
                                          disabled={!row.profilePicFilename ? true : false}>
                                            Download
                                        </Button>
                                    </TableCell>
                                    {userAccountContext?.userAccount?.roleId && userAccountContext?.userAccount?.roleId === 1 &&
                                        <TableCell className='mat-cell-left'>
                                            <Button variant = "secondary" type = "button" onClick={() => onDelete(row)}>
                                                X
                                            </Button>
                                        </TableCell>
                                     }   
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination className = "paginator"
                rowsPerPageOptions={[5,10,15,20,25,30,35,40]}
                rowsPerPage={rowsPerPage}
                page={page}
                count={rows.length}
                component="div"
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    </div>
  );
}

export default ContactList