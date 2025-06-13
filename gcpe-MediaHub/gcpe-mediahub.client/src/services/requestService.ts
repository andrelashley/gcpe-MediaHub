import { MediaRequest } from '../api/generated-client/model';
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
    baseURL: '/',
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`
    }
});

export const requestService = {
    async getRequests(): Promise<MediaRequest[]> {
        if (import.meta.env.VITE_MRM_API === '0') {
            const mockData = await loadMockData();
            return convertMockData(mockData);
        }
        
        const response = await axiosInstance.get<MediaRequest[]>('/api/MediaRequests');
        return response.data;
    }
};

export async function createRequest(request: MediaRequest): Promise<MediaRequest> {
    const response = await axiosInstance.post<MediaRequest>('/api/MediaRequests', request);
    return response.data;
}