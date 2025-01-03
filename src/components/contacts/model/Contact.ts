export class Contact {
    id: number = 0;
    lastName: string = '';
    middleName: string = '';
    firstName: string = '';
    dob: Date | null = null;
    stateId: number = 0;
    profilePic: File | undefined = undefined;
    profilePicFilename: string = '';
}