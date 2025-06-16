

import Layout from '../../components/Layout';
// import MediaContact from '../../models/MediaContact';
import ContactsTable from './ContactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
//import { contactService } from '../../services/contactService';
import MediaContact from '../../models/mediaContact';
//import { useQuery } from '@tanstack/react-query';
//import { AuthenticationContext } from '../../App';
//import React from 'react';
// import MediaContact from '../../models/mediaContact';


const MediaContacts = () => {
    //const { data: contacts = [] } = useQuery<any[], Error>({
    //    queryKey: ["contacts"],
    //    queryFn: contactService.getContacts,
    //});
    const [contacts, setContacts] = useState<MediaContact[]>([]);


    const fetchContacts = async () => {
         const response = await fetch('mediacontacts');
     //   const response = await fetch('../../data/mock-contacts.json');
        const data = await response.json();
        const contacts: MediaContact[] = data as MediaContact[];
        console.log(JSON.stringify(contacts[2]));
        setContacts(contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <Layout title={"Media Contacts"} selectedNavItem={"3"} headingButton={<CreateContactButton />} >
                <ContactsTable items={contacts} />
            </Layout>
        </div>
    );
}


export default MediaContacts;

