import { MediaContact } from "./mediaContact";
import { MediaOutlet } from "./mediaOutlet";
import { PhoneNumber } from "./PhoneNumber";

export class OutletAssociation {
    id: string | undefined;
    contactId: number | undefined;
    mediaContact: MediaContact | undefined;
    outletId: string | undefined;
    outletName: string | undefined;
    mediaOutlet: MediaOutlet | undefined;
    contactEmail: string | undefined;
    contactPhones: PhoneNumber[] | undefined;
    phoneNumber: string | undefined;
    jobTitle: string | undefined;
    noLongerWorksHere: boolean = false;
    lastRequestDate: Date | undefined;
    isMajorMedia: boolean | undefined;
}
