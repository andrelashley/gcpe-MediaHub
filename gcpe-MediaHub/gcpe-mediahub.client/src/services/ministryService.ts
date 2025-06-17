import axios from 'axios';
import { Ministry } from '../api/generated-client/model';

// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: '/',
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`
    }
});

export const ministryService = {
    async getMinistries(): Promise<Ministry[]> {
        const response = await axiosInstance.get<Ministry[]>('/api/Ministries');
        return response.data;
    }
};