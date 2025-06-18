import axios from 'axios';
import { User } from '../api/generated-client/model';

// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`,
        'Content-Type': 'application/json'
    }
});

export const userService = {
    async getUsers(): Promise<User[]> {
        const response = await axiosInstance.get<User[]>('/api/Users');
        return response.data;
    },

    async getUserByIdir(idir: string): Promise<User> {
        try {
            const response = await axiosInstance.get<User>(`/api/Users/${idir}`);
            console.log("getUserByIdir response:", response.data); // Debugging log
            return response.data;
        } catch (error) {
            console.error("Error in getUserByIdir:", error); // Debugging log
            throw error;
        }
    }
};