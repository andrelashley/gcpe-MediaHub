

import ContactsTable from './contactsTable';
import { useState, useEffect } from 'react';
import CreateContactButton from './CreateContactButton';
import MediaContact from '../../models/mediaContact';
import {
    Title1,
    makeStyles,
} from '@fluentui/react-components';



const useStyles = makeStyles({
    button: {
        verticalAlign: "top",
        fontWeight: "inherit",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: "600px",
        position: "relative",
        overflowX: "hidden",
        fontWeight: "400",
        padding: '24px Global.Size.280',
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
        console.log(JSON.stringify(contacts));
        setContacts(contacts);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title1>Media contacts</Title1>
                <CreateContactButton />
            </div>
                <ContactsTable items={contacts} />

        </div>
    );
}


export default MediaContacts;

