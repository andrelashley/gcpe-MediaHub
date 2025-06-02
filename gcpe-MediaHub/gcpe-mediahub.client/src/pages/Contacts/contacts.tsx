

import Layout from '../../components/Layout';
// import MediaContact from '../../models/MediaContact';
import ContactsTable from './contactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
//import { AuthenticationContext } from '../../App';
//import React from 'react';
// import MediaContact from '../../models/mediaContact';

//import {
//    FolderRegular,
//    EditRegular,
//    OpenRegular,
//    DocumentRegular,
//    PeopleRegular,
//    DocumentPdfRegular,
//    VideoRegular,
//} from "@fluentui/react-icons";


const MediaContacts = () => {
    const [contacts, setContacts] = useState<any[]>([]);


    const fetchContacts = async () => {
        const response = await fetch('mediacontacts');
        const data = await response.json();
        const contacts: any[] = data as any[];
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

