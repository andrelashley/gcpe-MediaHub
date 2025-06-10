
import MediaOutlet from './MediaOutlet';
import MediaRequest from './mediaRequest';

export class MediaContact {
    id: number = 0;
    firstName: string;
    lastName: string;
    jobTitle: string;
    socialMediaXURL: string; 
    socialMediaInstagramURL: string;
    email: string;
    phone: string;
    outlets: MediaOutlet[] = [];
    requests: MediaRequest[] = [];
    location: string;
    lastActive: Date;

    constructor(firstName: string,
        lastName: string,
        email: string,
        phone: string,
        location: string,
        lastActive: Date,
        mediaRequests: MediaRequest[] = [],
        jobTitle: string,
        socialMediaXURL: string,
        socialMediaInstagramURL: string
    ) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.lastActive = lastActive;
        this.mediaRequests = mediaRequests;
        this.jobTitle = jobTitle;
        this.socialMediaInstagramURL = socialMediaInstagramURL;
        this.socialMediaXURL = socialMediaXURL;
    }
}

export default MediaContact;