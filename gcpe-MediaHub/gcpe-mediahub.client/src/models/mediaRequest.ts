import MediaContact from "./mediaContact";
import Ministry from "./Ministry";

enum status {
    requested,
    inProgress,
    draft,
    done,
}

export class MediaRequest {
    id: number = 0;
    title: string;
    deadline: Date;
    statusId: string | undefined;
    statusName: string | undefined;
    requestedBy: MediaContact;
    requestNo: number | undefined;
    additionalMinistries: Ministry[] | undefined;
    leadMinistry: Ministry | undefined;

    constructor(title: string, deadline: Date, requestedBy: MediaContact) {
        this.title = title;
        this.deadline = deadline;
        this.requestedBy = requestedBy;
    }
}

export default MediaRequest;