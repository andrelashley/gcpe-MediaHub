
export class OutletAssociation {
    id: number | undefined;
    contactId: number | undefined;
    outletId: number | undefined;
    contactEmail: string | undefined;
    phonePrimary: number | undefined;
    phoneMobile: number | undefined;
    phoneCallIn: number | undefined;
    noLongerWorksHere: boolean = false;
    lastRequestDate: Date | undefined;
}
