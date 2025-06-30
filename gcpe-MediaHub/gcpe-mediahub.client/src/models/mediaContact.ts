
import ContactPhone from './ContactPhone';
import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';
import { OutletAssociation } from './OutletAssociation';
import { SocialMediaLink } from './SocialMediaLink';

export class MediaContact {
    id: number = 0;
    firstName: string | undefined;
    lastName: string | undefined;
    jobTitle: string | undefined;
    socialMediaLinks: SocialMediaLink[] = [];
    email: string | undefined;
    contactPhones: string[] | undefined;
    outlets: OutletAssociation[] = [];
    requests: MediaRequest[] = [];
    location: string | undefined;
    lastActive: Date | undefined;
    isPressGallery: boolean | undefined;
}

export default MediaContact;