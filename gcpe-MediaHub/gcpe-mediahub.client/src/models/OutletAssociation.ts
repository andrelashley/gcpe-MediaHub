import { MediaContact } from "./mediaContact";
import { MediaOutlet } from "./mediaOutlet";

export class OutletAssociation {
    id: string | undefined;
    contactId: number | undefined;
    mediaContact: MediaContact | undefined;
    outletId: number | undefined;
    outlet: MediaOutlet | undefined;
    contactEmail: string | undefined;
    contactPhones: string[] | undefined;
    noLongerWorksHere: boolean = false;
    lastRequestDate: Date | undefined;
}
