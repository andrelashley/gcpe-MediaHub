import axios from 'axios';
import { User, MediaContact } from '../api/generated-client';

// Create an axios instance with auth headers
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Basic ${btoa(import.meta.env.VITE_API_BASIC_AUTH ?? '')}`,
        'Content-Type': 'application/json'
    }
});

/**
 * Service for user-related operations
 */
export const userService = {
    /**
     * Get all users
     */
    async getUsers(): Promise<User[]> {
        const response = await axiosInstance.get<User[]>('/api/Users');
        return response.data;
    },

    /**
     * Get user by IDIR
     */
    async getUserByIdir(idir: string): Promise<User> {
        try {
            const response = await axiosInstance.get<User>(`/api/Users/${encodeURIComponent(idir)}`);
            return response.data;
        } catch (error) {
            console.error("Error in getUserByIdir:", error);
            throw error;
        }
    },

    /**
     * Get media contact by full name (FirstName LastName)
     */
    async getMediaContactByFullName(fullName: string): Promise<MediaContact> {
        try {
            const response = await axiosInstance.get<MediaContact>(
                `/api/MediaContacts/search/${encodeURIComponent(fullName)}`
            );
            return response.data;
        } catch (error) {
            console.error("Error in getMediaContactByFullName:", error);
            throw error;
        }
    },

    /**
     * Get all media contacts
     */
    async getMediaContacts(): Promise<MediaContact[]> {
        try {
            const response = await axiosInstance.get<MediaContact[]>('/api/MediaContacts');
            return response.data;
        } catch (error) {
            console.error("Error in getMediaContacts:", error);
            throw error;
        }
    }
};