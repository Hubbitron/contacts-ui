export class Contact {
    id: number = 0;
    lastName: string = '';
    middleName: string = '';
    firstName: string = '';
    dob: Date | null = null;
    addressLine1: string = '';
    addressLine2: string = '';
    city: string = '';
    stateId: number = 0;
    zipCode: string = '';
    homePhone: string = '';
    workPhone: string = '';
    cellPhone: string = '';
    profilePic: File | undefined = undefined;
    profilePicFilename: string = '';
}