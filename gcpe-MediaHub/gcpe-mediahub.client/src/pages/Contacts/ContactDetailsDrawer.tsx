import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer,
    Button,
    useRestoreFocusSource,

    TagGroup,
    makeStyles,
    Tag,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";

//import OutletDetails from "./OutletDetails";
import ContactRelatedItemsList from "./ContactRelatedItemsList";
import { MediaContact } from "../../models/mediaContact";


const useStyles = makeStyles({
    drawer: {
        width: "650px",
    },
    formGroup: {
        display: "inline-flex",

    },
    buttonRight: {
        float: "right",
    },

    outletsSection: {
        border: "1px solid #ccc!important",
    }
}
);

interface ContactDetailsProps {
    contact: MediaContact;
    isOpen: boolean;
    closeContactDetails: any;
}

export const ContactDetailsDrawer: React.FC<ContactDetailsProps> = ({ contact, isOpen, closeContactDetails }) => {
    const styles = useStyles();
    // all Drawers need manual focus restoration attributes
    // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
    const restoreFocusSourceAttributes = useRestoreFocusSource();

    console.log(JSON.stringify(contact.outletAssociations));

    return (
        /*we can probably break some of this out into separate components*/
        <div>
            <OverlayDrawer
                as="aside"
                {...restoreFocusSourceAttributes}
                open={isOpen}
                onOpenChange={(_, { open }) => isOpen = open}
                className={styles.drawer}
                position="end"
            >
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular />}
                                onClick={() => closeContactDetails()}
                            />
                        }
                    >
                        {contact.firstName} {contact.lastName}
                    </DrawerHeaderTitle>
                    <p>{contact.jobTitle}</p>
                    <p>{contact.location}</p>
                    <TagGroup>
                        <Tag>{contact.email}</Tag>
                        {contact.socialMediaXURL &&
                            <Tag>{contact.socialMediaXURL}</Tag>
                        }
                        {contact.socialMediaInstagramURL &&
                            <Tag>{contact.socialMediaInstagramURL}</Tag>
                        }
                    </TagGroup>
                </DrawerHeader>

                <DrawerBody>
                    <ContactRelatedItemsList
                        outlets={contact.outletAssociations}
                        requests={contact.requests}
                    />
                 
                </DrawerBody>
            </OverlayDrawer>
        </div>
    );
};

export default ContactDetailsDrawer;