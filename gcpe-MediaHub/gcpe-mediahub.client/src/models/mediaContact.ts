
import ContactPhone from './ContactPhone';
import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';
import { OutletAssociation } from './OutletAssociation';

export class MediaContact {
    id: number = 0;
    firstName: string | undefined;
    lastName: string | undefined;
    jobTitle: string | undefined;
    socialMediaXURL: string | undefined; 
    socialMediaInstagramURL: string | undefined;
    email: string | undefined;
    contactPhones: string[] | undefined;
    outlets: OutletAssociation[] = [];
    requests: MediaRequest[] = [];
    location: string | undefined;
    lastActive: Date | undefined;
    isPressGallery: boolean | undefined;

    //constructor(firstName: string,
    //    lastName: string,
    //    email: string,
    //    phone: string,
    //    location: string,
    //    lastActive: Date,
    //    mediaRequests: MediaRequest[] = [],
    //    jobTitle: string,
    //    socialMediaXURL: string,
    //    socialMediaInstagramURL: string
    //) {
    //    this.lastName = lastName;
    //    this.firstName = firstName;
    //    this.email = email;
    //    this.phone = phone;
    //    this.location = location;
    //    this.lastActive = lastActive;
    //    this.requests = mediaRequests;
    //    this.jobTitle = jobTitle;
    //    this.socialMediaInstagramURL = socialMediaInstagramURL;
    //    this.socialMediaXURL = socialMediaXURL;
    //}
}

export default MediaContact;