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

    async get<T>(url: string): Promise<{ data: T }> {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { data };
    },

    async post<T>(url: string, body: any): Promise<{ data: T }> {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { data };
    },

    async put<T>(url: string, body: any): Promise<{ data: T }> {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { data };
    },

    async delete(url: string): Promise<void> {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
};