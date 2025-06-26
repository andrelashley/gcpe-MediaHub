
export class OutletAssociation {
    id: string | undefined;
    contactId: number | undefined;
    outletId: number | undefined;
    contactEmail: string | undefined;
    contactPhones: string[] | undefined;
    noLongerWorksHere: boolean = false;
    lastRequestDate: Date | undefined;
    jobTitle: string | undefined;
}
