import { MediaContact } from '../api/apiClient';
import { apiClient } from '../api/apiClient';

async function loadMockData(): Promise<any[]> {

        console.log("contactService.loadMockData");
        const response = await fetch('/data/mock-contacts.json');
        console.log(response);
        console.log(JSON.stringify(response));
        return response.json();

}

// Type guard to validate the shape of mock data
function isValidMediaContact(contact: any): contact is MediaContact {
    return (
        typeof contact === 'object' &&
        typeof contact.Id === 'string' // && other validation concerns go below.
    );
}

// Validate and convert mock data to proper types
function validateMockData(data: any[]): MediaContact[] {
    console.log("validateMockData");
    console.log(JSON.stringify(data));
    return data.filter(isValidMediaContact).map(item => ({
        ...item,
        //status: item.status as RequestStatus,
        //requestType: item.requestType as RequestType,
        //requestResolution: item.requestResolution as RequestResolution,
        //leadMinistry: item.leadMinistry as Ministry,
        //additionalMinistry: item.additionalMinistry as Ministry | undefined,
        //isPressGallery: item.isPressGallery, // New field added
        //outlet: item.outlet || "Unknown Outlet", // Ensure outlet field is handled
        //deadline: item.deadline && !isNaN(Date.parse(item.deadline)) ? item.deadline : "Invalid Date" as string // Handle invalid dates
    }));
}

export const contactService = {
    async getContacts(): Promise<MediaContact[]> {
        console.log("contactService");
        const useMockData = import.meta.env.VITE_MRM_API === '0';

        if (useMockData) {
            console.log("load mock data");
            // Load and validate mock data
            const mockData = await loadMockData();

            return validateMockData(mockData);
        }

        try {
            // Return data from API
            return await apiClient.getContacts();
        } catch (error) {
            console.error('Error fetching contacts from API:', error);
            // Fallback to mock data if API fails
            console.log('Falling back to mock data');
            const mockData = await loadMockData();
            return validateMockData(mockData);
        }
    }
};