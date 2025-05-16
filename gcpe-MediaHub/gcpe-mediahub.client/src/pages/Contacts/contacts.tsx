
import Layout from '../../components/Layout';
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
    const [contacts, setContacts] = useState([]);


    const fetchContacts = async () => {
        const response = await fetch('mediacontacts');
        const data = await response.json();
        setContacts(data);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    //const layoutCrap = {
    //    title: "Media Contacts",
    //    selectedNavItem: "3",
    //}
    return (
        <div>
            <ContactsTable items={contacts} />
            <Layout title={"Media Contacts"} selectedNavItem={"3"} />
        </div>
    );
}


export default MediaContacts;

