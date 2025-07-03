import MediaContact from "./mediaContact";
import MediaOutlet from "./mediaOutlet";

export class SocialMediaLink {
    id: string | undefined;
    socialProfileUrl: string | undefined;
    socialMediaCompanyId: number | undefined;
    mediaOutletId: string | undefined;
    mediaOutlet: MediaOutlet | undefined;
    mediaContactId: string | undefined;
    mediaContact: MediaContact | undefined;
}