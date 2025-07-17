

import ContactsTable from './contactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
import MediaContact from '../../models/mediaContact';
import {
    Title1,
    makeStyles,
} from '@fluentui/react-components';
import { SocialMediaCompany } from '../../models/SocialMediaCompany';



const useStyles = makeStyles({
    button: {
        verticalAlign: "top",
        fontWeight: "inherit",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "8px",
    },
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "600px",
        position: "relative",
        overflowX: "hidden",
        fontWeight: "400",
        margin: '24px Global.Size.280',
    },
});

const MediaContacts = () => {
    const styles = useStyles();
    const [contacts, setContacts] = useState<MediaContact[]>([]);


    const fetchContacts = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediacontacts`);
        const data = await response.json();
        const contacts: MediaContact[] = data as MediaContact[];
        contacts.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
        console.log(JSON.stringify(contacts));
        setContacts(contacts);
    };
    const [socials, setSocials] = useState<SocialMediaCompany[]>([]);
    const fetchSocialMediaCompanies = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediacontacts/GetSocialMedias`);
        const data = await response.json();
        const companies: SocialMediaCompany[] = data as SocialMediaCompany[];
        setSocials(companies);
    };
    useEffect(() => {
        fetchContacts();
        fetchSocialMediaCompanies();
    }, []);

    const updateContactList = () => {
        fetchContacts();
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title1>Media contacts</Title1>
                <CreateContactButton updateList={() => updateContactList()} socialMediaCompanies={socials } />
            </div>
            <ContactsTable items={contacts} socialMediaCompanies={socials} />

        </div>
    );
}


export default MediaContacts;

