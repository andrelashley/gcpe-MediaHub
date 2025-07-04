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
import { useEffect, useRef, useState } from "react";
import MediaOutletInput from "./MediaOutletInput";
import MediaContact from "../../models/mediaContact";
import MediaOutlet from "../../models/mediaOutlet";
import { OutletAssociation } from "../../models/OutletAssociation";
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import OrgPhoneNumber from "./OrgPhoneNumber";
import { SocialMediaLink } from "../../models/SocialMediaLink";
import { PhoneNumber } from "../../models/PhoneNumber";


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
    const [contactPhones, setContactPhones] = useState<PhoneNumber[]>([]);

    const addPrimaryContactInfoInput = () => {
        setPrimaryContactInfoInputs([...primaryContactInfoInputs, primaryContactInfoInputs.length + 1]);
        setContactPhones([...contactPhones, undefined]); // Add new slot
    };

    const removePrimaryContactInfoInput = (index: number) => {
        setPrimaryContactInfoInputs(primaryContactInfoInputs.filter((_, i) => i !== index));
    };

    // TODO: see if we can do away with this. Using proper type may make this redundant
    const getPersonalPhoneNumbers = () => {
        let pn: PhoneNumber[] = [];
        primaryContactInfoInputs.forEach((_, index) => {
            if (contactPhones && contactPhones.length > 0) {
                let phoneNumber: PhoneNumber = new PhoneNumber();
                phoneNumber.PhoneType = contactPhones[index].PhoneType;
                phoneNumber.PhoneLineNumber = contactPhones[index].PhoneLineNumber;
                pn.push(phoneNumber);
            }
        });

        return pn;
    };

    const handlePhoneNumberChange = (index: number, data: any) => { //TODO: use PhoneNumber model. Not 'any'
        const updatedPhones = [...contactPhones];
        updatedPhones[index] = data;
        setContactPhones(updatedPhones);
    };


    const [error, setError] = React.useState<string | null>(null);
    const [showValidation, setShowValidation] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        firstName: '',
        lastName: '',
        email: '', //TODO: more sophisticated. check for '@', etc.
        atLeastOnePhoneNumber: '', // at least one personal phone number (not on Outlet association)
        atLeastOneWorkplace: '',      
    });

    // for tracking social media link inputs
    const [socials, setSocials] = useState<SocialMediaCompany[]>([]);
    const fetchSocialMediaCompanies = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediacontacts/GetSocialMedias`);
        const data = await response.json();
        const companies: SocialMediaCompany[] = data as SocialMediaCompany[];
        setSocials(companies);
    };

    const [socialMediaInputs, setSocialMediaInputs] = useState<number[]>([1]);
    const [socialMedias, setSocialMedias] = useState<any[]>([]); //Todo: actual model, not 'any'
    const addSocialMediaInput = () => {
        setSocialMediaInputs([...socialMediaInputs, socialMediaInputs.length]);
    };
    const removeSocialMediaInput = (index: number) => {
        setSocialMediaInputs(socialMediaInputs.filter((_, i) => i !== index));
    };
    const handleSocialMediaDataChange = (index: number, data: any) => {
        const newSocialMedia = [...socialMedias];
        newSocialMedia[index] = data; // Update the specific index
        setSocialMedias(newSocialMedia);
    };
    // end of social media link tracking
    const [website, setWebsite] = useState<string>('');
    // for tracking outlet inputs
    const [outletInputs, setOutletInputs] = useState<number[]>([1]);
    const [outletAssociations, setOutletAssociations] = useState<OutletAssociation[]>([]);

   /* const outletInputRefs = useRef<React.RefObject<MediaOutletInputRef>[]>([]);*/
    const addOutletInput = () => {
        setOutletInputs([...outletInputs, outletInputs.length]);
     /*   outletInputRefs.current.push(React.createRef<MediaOutletInputRef>());*/
    };
    const removeOutletInput = (index: number) => {
        setOutletInputs(outletInputs.filter((_, i) => i !== index));
        setOutletAssociations(outletAssociations.filter((_, i) => i !== index)); 
    };
    // end of outlet tracking

   

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



    const handleAssociationDataChange = (index: number, data: OutletAssociation) => {
        const newAssociations = [...outletAssociations];
        newAssociations[index] = data; // Update the specific index
        setOutletAssociations(newAssociations);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        handleValidation();

        const contact: MediaContact = new MediaContact()
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.isPressGallery = isPressGallery;
        contact.email = email;
        contact.jobTitleId = 0;
        contact.phoneNumbers = getPersonalPhoneNumbers();
        contact.personalWebsite = website;
        outletInputs.forEach((_, index) => {
            const outletAssociation: OutletAssociation = {
                id: undefined,
                contactId: undefined, // This can be set after the contact is created
                lastRequestDate: undefined,
                mediaContact: undefined,
                mediaOutlet: undefined,
                outletName: undefined,
                outletId: outletAssociations[index]?.outletId,
                contactEmail: outletAssociations[index]?.contactEmail,
                contactPhones: outletAssociations[index]?.contactPhones,
                noLongerWorksHere: outletAssociations[index]?.noLongerWorksHere,
            };
            contact.mediaOutletContactRelationships.push(outletAssociation);
        });

        socialMediaInputs.forEach((_, index) => {
            const socialMedia: SocialMediaLink = {
                //set all these TBD IDs on server...
                id: undefined,
                mediaContactId: undefined,
                mediaOutletId: undefined, // won't set this
                mediaOutlet: undefined, // won't be set
                socialProfileUrl: socialMedias[index]?.socialProfileUrl, 
                socialMediaCompanyId: socialMedias[index]?.socialMediaCompanyId,
                mediaContact: undefined,
            };
            contact.socialMedias.push(socialMedia);
        });
        console.log(JSON.stringify(contact));
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}MediaContacts`, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(contact)
            })
            .then((response) => {
                alert(JSON.stringify(response.text));
            });
        //give a little toast saying how the transaction went, 
        // if it was successful, close drawer after brief delay
        //  setIsOpen(false)
    };

    const handleValidation = () => {
        setShowValidation(true);
        setError(null);
        const errors: any = {};
        if (!firstName.trim()) errors.firstName = 'A first name is required';
        if (!lastName.trim()) errors.lastName = 'A last name is required';
        if (!email.trim()) errors.email = 'An email address is required';
    }

    const [outlets, setOutlets] = useState<MediaOutlet[]>([]);
    const fetchOutlets = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediaoutlets`);
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
                    <Field label="First name"
                        required
                        validationMessage={showValidation ? "First name is required" : undefined}
                        validationState={showValidation ? "error" : "none"}
                    >
                        <Input
                            value={firstName}
                            onChange={(_, data) => {
                                setFirstName(data.value);
                            }}
                        />
                    </Field>
                    <Field label="Last name"
                        required
                        validationMessage={showValidation ? "Last name is required" : undefined}
                        validationState={showValidation ? "error" : "none"}
                    >
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
                    {/*<Field label="Primary Contact Info"*/}
                    {/*    required*/}
                    {/*    validationMessage={showValidation ? "An email address is required" : undefined}*/}
                    {/*    validationState={showValidation ? "error" : "none"}*/}
                    {/*>*/}
                    {/*    <Field label="Email" required>*/}
                    {/*        <Input*/}
                    {/*            onChange={(_, data) => {*/}
                    {/*                setEmail(data.value);*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </Field>*/}
                    {/*    {primaryContactInfoInputs.map((_, index) => (*/}
                    {/*        <OrgPhoneNumber*/}
                    {/*            key={index}*/}
                    {/*            onRemove={() => removePrimaryContactInfoInput(index)}*/}
                    {/*            onPhoneNumberChange={(data: PhoneNumber) => handlePhoneNumberChange(index, data)}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                  
                    {/*</Field>*/}
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
                    <label>Online presence</label>
                    <Field label="Website" className={styles.maxWidth}>
                        <div>
                            <Input
                                placeholder="https://"
                                onChange={(_, data) => {
                                    setWebsite(data.value);
                                }}
                            />
                        </div>
                    </Field>
                    <Field label="Online Presence" className={styles.maxWidth}>
                        <div >
                            {socialMediaInputs.map((_, index) => (
                                <SocialMediaInput
                                    key={index}
                                    onRemove={() => removeSocialMediaInput(index)}
                                    socials={socials}
                                    onSocialMediaDataChange={(data) => handleSocialMediaDataChange(index, data)}
                                />
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
                      //      ref={outletInputRefs.current[index]} // try as I might, I cannot get this to work
                            onRemove={() => removeOutletInput(index)}
                            outlets={outlets}
                            onAssociationDataChange={(data) => handleAssociationDataChange(index, data)}
                            showValidation={showValidation }
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
                            onClick={(e) => handleSubmit(e)}
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