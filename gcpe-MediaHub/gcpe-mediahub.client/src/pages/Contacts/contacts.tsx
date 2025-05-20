
import React from 'react';
import Layout from '../../components/Layout';
import MediaContact from '../../models/MediaContact';
import ContactsTable from './ContactsTable';
import { useState, useEffect } from 'react';
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
    const [contacts, setContacts] = useState<MediaContact[]>([]);


    const fetchContacts = async () => {
        const response = await fetch('mediacontacts');
        const data = await response.json();
        console.log(data);
        console.log(JSON.stringify(data));
        //const contacts: MediaContact[] = data as MediaContact[];
        //setContacts(contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <Layout title={"Media Contacts"} selectedNavItem={"3"}>
                <ContactsTable items={contacts} />
            </Layout>
        </div>
    );
}


export default MediaContacts;

