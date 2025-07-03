import axios from 'axios';
import { Ministry } from '../api/generated-client/model';

// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`,
        'Content-Type': 'application/json'
    }
});

export const ministryService = {
    async getMinistries(): Promise<Ministry[]> {
        const response = await axiosInstance.get<Ministry[]>('Ministries');
        return response.data;
    }
};