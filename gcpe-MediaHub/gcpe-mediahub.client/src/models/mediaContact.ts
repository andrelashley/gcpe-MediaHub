import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';

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

    constructor(firstName: string, lastName: string, email: string, phone: string, location: string, lastActive: Date, mediaRequests: MediaRequest[] = []) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.lastActive = lastActive;
        this.mediaRequests = mediaRequests;
    }
}

export default MediaContact;