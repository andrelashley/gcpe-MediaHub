import { MediaRequest, RequestType, RequestStatus, RequestResolution, RequestDto } from '../api/generated-client/model';
import axios from 'axios';

async function loadMockData(): Promise<any[]> {
    const response = await fetch('/data/mock-requests.json');
    return response.json();
}

// Convert mock data to our MediaRequest type, will remove after API is stable
function convertMockData(data: any[]): MediaRequest[] {
    return data.map(item => ({
        id: item.requestId,
        requestNo: parseInt(item.requestNo) || 0,
        requestStatusId: 1,
        requestStatus: {
            id: 1,
            name: item.status || 'New'
        },
        requestTitle: item.requestTitle || '',
        requestTypeId: 1,
        requestType: {
            id: 1,
            name: item.requestType || 'Information'
        },
        requestDetails: item.requestDetails || '',
        requestorContactId: '00000000-0000-0000-0000-000000000000',
        requestorContact: {
            id: '00000000-0000-0000-0000-000000000000',
            firstName: (item.requestedBy || '').split(' ')[0] || '',
            lastName: (item.requestedBy || '').split(' ')[1] || '',
            isPressGallery: item.isPressGallery || false,
            email: '',
            jobTitleId: 1
        },
        requestResolutionId: 1,
        requestResolution: {
            id: 1,
            name: item.requestResolution || 'Other'
        },
        leadMinistryId: 1,
        leadMinistry: {
            id: 1,
            acronym: item.leadMinistry || 'Unknown',
            name: ''
        },
        additionalMinistries: item.additionalMinistry ? [{
            id: 2,
            acronym: item.additionalMinistry,
            name: ''
        }] : [],
        requestorOutletId: '00000000-0000-0000-0000-000000000000',
        requestorOutlet: {
            id: '00000000-0000-0000-0000-000000000000',
            outletName: item.outlet || "Unknown Outlet",
            isMajorMedia: false,
            email: ''
        },
        assignedUserId: '00000000-0000-0000-0000-000000000000',
        assignedUser: {
            id: '00000000-0000-0000-0000-000000000000',
            idir: item.assignedTo || ''
        },
        receivedOn: item.receivedOn || new Date().toISOString(),
        deadline: item.deadline || new Date().toISOString(),
        response: ''
    }));
}

// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`,
        'Content-Type': 'application/json'
    }
});

export const requestService = {
    async getRequests(): Promise<MediaRequest[]> {
        if (import.meta.env.VITE_MRM_API === '0') {
            const mockData = await loadMockData();
            return convertMockData(mockData);
        }
        
        const response = await axiosInstance.get<MediaRequest[]>('MediaRequests');
        return response.data;
    },

    async getRequestTypes(): Promise<RequestType[]> {
        const response = await axiosInstance.get<RequestType[]>('RequestTypes');
        return response.data;
    },

    async getRequestStatuses(): Promise<RequestStatus[]> {
        const response = await axiosInstance.get<RequestStatus[]>('RequestStatuses');
        return response.data;
    },

    async getRequestResolutions(): Promise<RequestResolution[]> {
        const response = await axiosInstance.get<RequestResolution[]>('RequestResolutions');
        return response.data;
    },


    async createRequest(request: MediaRequest): Promise<MediaRequest> {
        const response = await axiosInstance.post<MediaRequest>('MediaRequests', request);
        return response.data;
    },

    async getRequestDtos(): Promise<any[]> {
        const response = await axiosInstance.get('MediaRequests/dtos');
        return response.data;
    },

    async getRequestById(id: string): Promise<MediaRequest> {
        if (import.meta.env.VITE_MRM_API === '0') {
            const mockData = await loadMockData();
            // Return the first mock as a RequestDto, or undefined if not found
            const dtos = convertMockData(mockData);
            return dtos.length > 0 ? dtos[0] : undefined;
        }
        const response = await axiosInstance.get<MediaRequest>(`MediaRequests/${id}`);
        return response.data;
    },

    async getRequestByRequestNo(requestNo: number): Promise<MediaRequest> {
        if (import.meta.env.VITE_MRM_API === '0') {
            const mockData = await loadMockData();
            const dtos = convertMockData(mockData);
            return dtos.find(r => r.requestNo === requestNo);
        }
        const response = await axiosInstance.get<MediaRequest>(`MediaRequests/byRequestNo/${requestNo}`);
        return response.data;
    },

    async getRequestorOutletId(contactId: string): Promise<string | null> {
        const response = await axiosInstance.get(`MediaContacts/${contactId}`);
        const contact = response.data;
        return contact.mediaOutletContactRelationships?.[0]?.mediaOutletId ?? null;
    }
};
