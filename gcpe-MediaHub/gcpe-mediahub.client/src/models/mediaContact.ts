import MediaOutlet from './MediaOutlet';
import MediaRequest from './MediaRequest';

export class MediaContact {
    id: number = 0;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mediaOutlets: MediaOutlet[] = [];
    mediaRequests: MediaRequest[] = [];
    location: string;
    lastActive: Date;

    constructor(firstName: string, lastName: string, email: string, phone: string, location: string, lastActive: Date) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.lastActive = lastActive
    }
}

export default MediaContact;