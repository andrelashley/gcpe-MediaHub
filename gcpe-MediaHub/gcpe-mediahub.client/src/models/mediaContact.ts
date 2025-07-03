
import MediaOutlet from './mediaOutlet';
import MediaRequest from './mediaRequest';
import { OutletAssociation } from './OutletAssociation';
import { SocialMediaLink } from './SocialMediaLink';
import { PhoneNumber } from './PhoneNumber';

export class MediaContact {
    id: number| undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    isPressGallery: boolean | undefined;
    isActive: boolean = true;
    email: string | undefined;
    jobTitle: string | undefined;
    jobTitleId: number = 0;
    mediaOutletContactRelationships: OutletAssociation[] = [];
    socialMedias: SocialMediaLink[] = [];
    personalWebsite: string | undefined;
    phoneNumbers: PhoneNumber[] = [];
    requests: MediaRequest[] = [];
    location: string | undefined;
    lastActive: Date | undefined;
}

export default MediaContact;