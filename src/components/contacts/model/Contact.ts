export class Contact {
    id: number = 0;
    lastName: string = '';
    middleName: string = '';
    firstName: string = '';
    dob: Date | null = null;
    addressLine1: string = '';
    stateId: number = 0;
    profilePic: File | undefined = undefined;
}