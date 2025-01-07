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
    zipCode: number = 0;
    homePhone: number = 0;
    workPhone: number = 0;
    cellPhone: number = 0;
    profilePic: File | undefined = undefined;
    profilePicFilename: string = '';
}