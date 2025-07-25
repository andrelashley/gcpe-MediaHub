
import ContactsTable from './contactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
import MediaContact from '../../models/mediaContact';
import {
    Title1,
} from '@fluentui/react-components';
import { SocialMediaCompany } from '../../models/SocialMediaCompany';
import { contactService } from '../../services/contactService';
import styles from './contacts.module.css';



// Detect if the new request drawer should be open  *CREDIT TO ALESSIA FOR THIS*
const isNewDrawerOpen = location.pathname.endsWith('/new');

const MediaContacts = () => {
    const [contacts, setContacts] = useState<MediaContact[]>([]);


    const fetchContacts = async () => {
        const contacts: MediaContact[]  = await contactService.getContacts();
        contacts.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
    //    console.log(JSON.stringify(contacts));
        setContacts(contacts);
    };
    const [socials, setSocials] = useState<SocialMediaCompany[]>([]);
    const fetchSocialMediaCompanies = async () => {
        const companies: SocialMediaCompany[] = await contactService.getSocialMedias();
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
                <CreateContactButton updateList={() => updateContactList()} socialMediaCompanies={socials} startOpen={isNewDrawerOpen} />
            </div>
            <ContactsTable items={contacts} socialMediaCompanies={socials} />
        </div>
    );
}


export default MediaContacts;

