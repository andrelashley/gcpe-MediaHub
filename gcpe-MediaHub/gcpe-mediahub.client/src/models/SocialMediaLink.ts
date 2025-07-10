import MediaContact from "./mediaContact";
import MediaOutlet from "./mediaOutlet";

export class SocialMediaLink {
    companyId: number | undefined;
    url: string | undefined;
    mediaOutletId: string | undefined;
    mediaOutlet: MediaOutlet | undefined;
    mediaContactId: string | undefined;
    mediaContact: MediaContact | undefined;
}