import { Contact } from "../contacts/model/Contact";

export const sortTableColumn = (col: any, sortColumn: string, order: string, rows: any[]): any => {
    let inverseOrder: string = order === "ASC" ? "DSC" : "ASC";
    if (col !== sortColumn) {
        order = "ASC";
        inverseOrder = "DSC";
    }

    let sortedRows: Contact[] = [];

    if (order === "ASC") {
        sortedRows = [...rows].sort((a, b) => 
            b[col] === null || a[col] > b[col] ? 1 : -1
        );
    } else {
        sortedRows = [...rows].sort((a, b) => 
            a[col] === null || a[col] < b[col] ? 1 : -1
        );    
    }

    return {
        sortedRows: sortedRows, 
        inverseOrder: inverseOrder
    };
};


export const getSortArrow = (col: any, sortColumn: string, order: string) => {
    return sortColumn !== col ? '' : order === "ASC" ? '↓' : '↑';
};


export const formattedDate = (date: Date | null): string => {
    if (date === null)
        return "";

    const dte = new Date(date);

    const day = dte.getUTCDate();
    const dd = day + "";
    const month = dte.getUTCMonth() + 1; // Return Value is 0 indexed
    const mm = month + "";
    const year = dte.getUTCFullYear();
    const yyyy = year + "";

    return pad(mm,2,"R","0") + "/" + pad(dd,2,"R","0") + "/" + pad(yyyy,4,"R","0");
};

export const pad = (field: string, length: number, justify: string, withThis: string): string => {
    let i = 1;
    let workField = "";
        
    field = (field + ' ').trim();
    
    if (!field.length)
        field = "";

    let numOfSpaces = length - field.length;            
    
    switch (justify.toUpperCase()) {
    case "L" :
        workField = field;
        for (i = 1; i <= numOfSpaces; i++)
            workField += withThis;
        break;
    case "R" :
        workField = "";
        for (i = 1; i <= numOfSpaces; i++)
            workField += withThis;
            
        workField += field;
        break;
    default:
        workField = ""
    }
        
    return workField;
};