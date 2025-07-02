

// import MediaContact from '../../models/MediaContact';
import ContactsTable from './contactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
//import { contactService } from '../../services/contactService';
import MediaContact from '../../models/mediaContact';
import {
    Title1,
    makeStyles,
} from '@fluentui/react-components';
import Layout from '../../components/Layout';
//import { useQuery } from '@tanstack/react-query';
//import { AuthenticationContext } from '../../App';
//import React from 'react';
// import MediaContact from '../../models/mediaContact';

const useStyles = makeStyles({
    button: {
        verticalAlign: "top",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
});

const MediaContacts = () => {
    const styles = useStyles();
    //const { data: contacts = [] } = useQuery<any[], Error>({
    //    queryKey: ["contacts"],
    //    queryFn: contactService.getContacts,
    //});
    const [contacts, setContacts] = useState<MediaContact[]>([]);


    const fetchContacts = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediacontacts`);
        //   const response = await fetch('../../data/mock-contacts.json');
        const data = await response.json();
        const contacts: MediaContact[] = data as MediaContact[];
      // console.log(JSON.stringify(contacts));
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

