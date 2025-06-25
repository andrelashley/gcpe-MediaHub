import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer,
    Button,
    useRestoreFocusSource,
    useRestoreFocusTarget,
    Field,
    Input,
    Checkbox,
    makeStyles,
    Divider,
} from "@fluentui/react-components";

import { Dismiss24Regular, Add24Regular } from "@fluentui/react-icons";
import SocialMediaInput from "./SocialMediaInput";
import { useEffect, useState } from "react";
import MediaOutletInput from "./MediaOutletInput";
import MediaContact from "../../models/mediaContact";
import MediaOutlet from "../../models/mediaOutlet";
import { OutletAssociation } from "../../models/OutletAssociation";
import PrimaryContactInfoInput from "./PrimaryContactInfoInput";
import { SocialMediaCompany } from "../../models/SocialMediaCompany";


const useStyles = makeStyles({
    drawer: {
        width: "650px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "16px",
        gap: "Global.Size.20",
        '& div': {
            marginBottom: "10px",
        },
    },
    title: {
        fontSize: "var(--Font - size - 500, 20px)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "var(--Line - height - 500, 28px)",
    },
    formGroup: {
        display: "inline-flex",
    },
    addButton: {
        float: "right",
    },
    outletsSection: {
        border: "1px solid #ccc!important",
        borderRadius: "4px",
        padding: "8px",
        marginBottom: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.80",
        alignSelf: "stretch",

    },
    maxWidth: {
        width: "100%",
    },
    saveCancelButtons: {
        marginTop: "20px",
        '& Button': {
            marginRight: "8px",
        },
    },
}
);


export const CreateContactDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    //for primary contact info input tracking
    const [primaryContactInfoInputs, setPrimaryContactInfoInputs] = useState<number[]>([1]);

    const addPrimaryContactInfoInput = () => {
        setPrimaryContactInfoInputs([...primaryContactInfoInputs, primaryContactInfoInputs.length]);
    };
    const removePrimaryContactInfoInput = (index: number) => {
        setPrimaryContactInfoInputs(primaryContactInfoInputs.filter((_, i) => i !== index));
    };


    // for tracking social media link inputs
    const [socialMediaInputs, setSocialMediaInputs] = useState<number[]>([1]);
    const addSocialMediaInput = () => {
        setSocialMediaInputs([...socialMediaInputs, socialMediaInputs.length]);
    };
    const removeSocialMediaInput = (index: number) => {
        setSocialMediaInputs(socialMediaInputs.filter((_, i) => i !== index));
    };
    // end of social media link tracking
    // for tracking social media link inputs
    const [outletInputs, setOutletInputs] = useState<number[]>([1]);

    const addOutletInput = () => {
        setOutletInputs([...outletInputs, outletInputs.length]);
    };
    const removeOutletInput = (index: number) => {
        setOutletInputs(outletInputs.filter((_, i) => i !== index));
        setOutletAssociations(outletAssociations.filter((_, i) => i !== index)); 
    };
    // end of social media link tracking

    const [socials, setSocials] = useState<SocialMediaCompany[]>([]);

    const fetchSocialMediaCompanies = async () => {
        const response = await fetch('https://localhost:7145/api/MediaContacts/GetSocialMedias');
        const data = await response.json();
        const companies: SocialMediaCompany[] = data as SocialMediaCompany[];
        setSocials(companies);
    };

    const styles = useStyles();
    // all Drawers need manual focus restoration attributes
    // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
    const restoreFocusTargetAttributes = useRestoreFocusTarget();
    const restoreFocusSourceAttributes = useRestoreFocusSource();


    // contact fields
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isPressGallery, setIsPressGallery] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [primaryPhone, setPrimaryPhone] = React.useState('');
    const [mobilePhone, setMobilePhone] = React.useState('');

    const [outletAssociations, setOutletAssociations] = useState<OutletAssociation[]>([]);

    const handleAssociationDataChange = (index: number, data: OutletAssociation) => {
        const newAssociations = [...outletAssociations];
        newAssociations[index] = data; // Update the specific index
        setOutletAssociations(newAssociations);
     //   console.log(JSON.stringify(outletAssociations));
    };
    const createContact = async() => {
        const contact: MediaContact = new MediaContact()
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.isPressGallery = isPressGallery;
        contact.email = email;
       
        outletAssociations.map((association) => {
            contact.outlets.push(association);
        })
        
     //   console.log(JSON.stringify(contact));
        const response = await fetch('mediacontacts/CreateMediaContact',
            {
                method: "POST",
                body: JSON.stringify(contact)
            })
            .then((response) => {
                alert(JSON.stringify(response.text));
            });
        //give a little toast saying how the transaction went, 
        // if it was successful, close drawer after brief delay
        //  setIsOpen(false)
    };

    const [outlets, setOutlets] = useState<MediaOutlet[]>([]);
    const fetchOutlets = async () => {
        const response = await fetch('https://localhost:7145/api/mediaoutlets');
        const data = await response.json();
        console.log(JSON.stringify(data));
        const outlets: MediaOutlet[] = data as MediaOutlet[];
        setOutlets(outlets);
    };

    useEffect(() => {
        fetchOutlets();
        fetchSocialMediaCompanies();
    }, []);

    return (
        <div>
            <OverlayDrawer
                as="aside"
                {...restoreFocusSourceAttributes}
                open={isOpen}
                onOpenChange={(_, { open }) => setIsOpen(open)}
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
                                onClick={() => setIsOpen(false)}
                            />
                        }
                    >
                        <div className={styles.title}>New Contact</div>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <Field label="First name" required>
                        <Input
                            value={firstName}
                            onChange={(_, data) => {
                                setFirstName(data.value);
                                //if (data.value.trim()) {
                                //    setShowValidation(false);
                                //}
                            }}
                        />
                    </Field>
                    <Field label="Last name" required>
                        <Input
                            onChange={(_, data) => {
                                setLastName(data.value);
                            }}
                        />
                    </Field>
                    <Checkbox
                        checked={isPressGallery}
                        label="Press gallery"
                        onChange={(_, data) => setIsPressGallery(!!data.checked)}
                    />
                    <Field label="Primary Contact Info" required>
                        <Field label="Email" required>
                            <Input
                                onChange={(_, data) => {
                                    setEmail(data.value);
                                }}
                            />
                        </Field>
                        {primaryContactInfoInputs.map((_, index) => (
                            <PrimaryContactInfoInput
                                key={index}
                                onRemove={() => removePrimaryContactInfoInput(index)}
                              
                            />
                        ))}
                        {/*<Field label="Primary phone" required>*/}
                        {/*    <Input*/}
                        {/*        onChange={(_, data) => {*/}
                        {/*            setPrimaryPhone(data.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Field>*/}
                        {/*<Field label="Mobile phone">*/}
                        {/*    <Input*/}
                        {/*        onChange={(_, data) => {*/}
                        {/*            setMobilePhone(data.value);*/}
                        {/*        }}*/}
                        {/*    />*/}
                       {/* </Field>*/}
                    </Field>
                    <p>
                        <Button appearance="subtle"
                            className={styles.addButton}
                            icon={<Add24Regular />}
                            title="Add a new primary contact info input"
                            onClick={addPrimaryContactInfoInput}
                        >
                            Contact info
                        </Button>
                    </p> <br />
                    <Field label="Online Presence" className={styles.maxWidth}>
                        <div >
                            {socialMediaInputs.map((_, index) => (
                                <SocialMediaInput key={index} onRemove={() => removeSocialMediaInput(index)} socials={socials} />
                            ))}
                        </div>
                    </Field>
                    <p>
                        <Button appearance="subtle"
                            className={styles.addButton}
                            icon={<Add24Regular />}
                            title="Add a new social media input"
                            onClick={addSocialMediaInput}
                        >
                            Social Media
                        </Button>
                    </p>
                    <Divider />
                    <label htmlFor="outlets-section">Workplaces</label>


                    {outletInputs.map((_, index) => (
                        <MediaOutletInput
                            key={index}
                            onRemove={() => removeOutletInput(index)}
                            outlets={outlets}
                            onAssociationDataChange={(data) => handleAssociationDataChange(index, data)}
                            itemId={index}
                        />
                    ))}


                    <Button
                        icon={<Add24Regular />}
                        className={styles.addButton}
                        title="Add a media outlet"
                        appearance="subtle"
                        onClick={addOutletInput}
                    >
                        Workplace
                    </Button>

                    <div className={styles.saveCancelButtons}>
                        <Button
                            aria-label="Create this contact"
                            appearance="primary"
                            onClick={() => createContact()}
                        >
                            Save
                        </Button>
                        <Button
                            aria-label="Cancel and close this dialog"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DrawerBody>
            </OverlayDrawer>

            <Button
                {...restoreFocusTargetAttributes}
                appearance="primary"
                onClick={() => setIsOpen(true)}
            >
                Create
            </Button>

        </div>
    );
};

export default CreateContactDrawer;