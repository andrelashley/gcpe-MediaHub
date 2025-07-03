import { MediaContact } from "./mediaContact";
import { MediaOutlet } from "./mediaOutlet";
import { PhoneNumber } from "./PhoneNumber";

export class OutletAssociation {
    id: string | undefined;
    contactId: number | undefined;
    mediaContact: MediaContact | undefined;
    outletId: number | undefined;
    outletName: string | undefined;
    mediaOutlet: MediaOutlet | undefined;
    contactEmail: string | undefined;
    contactPhones: PhoneNumber[] | undefined;
    noLongerWorksHere: boolean = false;
    lastRequestDate: Date | undefined;
}
