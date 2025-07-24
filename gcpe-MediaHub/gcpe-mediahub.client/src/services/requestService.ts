import { MediaRequest, RequestType, RequestStatus, RequestResolution, RequestDto } from '../api/generated-client/model';
import axios from 'axios';

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

        const response = await axiosInstance.get<MediaRequest>(`MediaRequests/${id}`);
        return response.data;
    },

    async getRequestByRequestNo(requestNo: number): Promise<MediaRequest> {
        
        const response = await axiosInstance.get<MediaRequest>(`MediaRequests/byRequestNo/${requestNo}`);
        return response.data;
    },

    async getRequestorOutletId(contactId: string): Promise<string | null> {
        const response = await axiosInstance.get(`MediaContacts/${contactId}`);
        const contact = response.data;
        return contact.mediaOutletContactRelationships?.[0]?.mediaOutletId ?? null;
    }
};
