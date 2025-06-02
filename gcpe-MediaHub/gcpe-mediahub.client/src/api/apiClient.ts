const BASE_URL = 'http://localhost:5020/api';

export type RequestStatus = 'New' | 'Pending' | 'Rejected' | 'Reviewed' | 'Scheduled' | 'Unavailable' | 'Approved' | 'Completed';
export type RequestType = 'Information' | 'Interview' | 'Scrum/Halls';
export type RequestResolution = 'DeclinedToComment' | 'ProvidedBackgrounder' | 'ProvidedScrumAudio' | 'ProvideStatement' | 
                              'ReferredToMediaAvail' | 'ReferredToThirdParty' | 'ReporterDropped' | 'ScheduledInterview' | 
                              'Unavailable' | 'Other';
export type Ministry = 'ENV' | 'FIN' | 'FOR' | 'HLTH' | 'HOUS';

export interface MediaRequest {
    requestNo: string;
    outlet?: string; // Added outlet field
    isPressGallery: boolean;
    requestId: string;
    status: RequestStatus;
    requestTitle: string;
    requestType: RequestType;
    requestedBy: string;
    receivedOn: string;
    deadline: string | null; // Allow null for invalid dates
    requestDetails: string;
    requestResolution: RequestResolution;
    leadMinistry: Ministry;
    additionalMinistry?: Ministry;
    assignedTo: string;
    notifiedRecipients: string;
}

export interface MediaContact {
    id: number,
    firstName: string,
    lastName: string,
    isPressGallery: boolean,
    jobTitle: string,
    email: string,
    phone: string,
    mobilePhone: string,
    callInPhone: string,
    socialMediaXURL: string,
    socialMediaInstagramURL: string,
    location: string,
    outletName: string,
    outlets: any[],
    requests: any[],
    lastActive: Date
}

export interface MediaOutlet {
    id: number,
    contactId: number,
    //   contact: null,
    outletId: number,
    outlet: {
        id: number,
        name: string,
        email: string,
        primaryPhone: string,
        newsDeskPhone: string,
        mediaTypes: string,
        language: string,
        languageShortName: string,
        isMajorMedia: boolean,
        websiteURL: string,
        socialMediaXURL: string,
        socialMediaInstagramURL: string,
        address: string,
        location: string
    }
}

export const apiClient = {
    async getRequests(): Promise<MediaRequest[]> {
        try {
            const response = await fetch(`${BASE_URL}/requests`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching requests:', error);
            throw error;
        }
    },

    async getContacts(): Promise<MediaContact[]> {
        try {
            console.log("apiClient.getContacts");
            const response = await fetch(`${BASE_URL}/contacts`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    }
};