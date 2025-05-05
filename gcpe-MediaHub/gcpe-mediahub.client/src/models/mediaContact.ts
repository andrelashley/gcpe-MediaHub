import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';

export class MediaContact {
    id: Number = 0;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    mediaOutlets: MediaOutlet[] = [];
    mediaRequests: MediaRequest[] = [];

    constructor(firstName: string, lastName: string, email: string, phone: string) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
    }
}

export default MediaContact;