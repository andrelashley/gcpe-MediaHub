
import { apiClient } from '../api/apiClient';
import axios from 'axios';
import MediaContact from '../models/mediaContact';
import MediaOutlet from '../models/mediaOutlet';


// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`,
        'Content-Type': 'application/json'
    }
});

export const OutletService = {

    async getOutlets(): Promise<MediaOutlet[]> {
        const response = await axiosInstance.get<MediaOutlet[]>('MediaOutlets');
        return response.data;
    },
};
