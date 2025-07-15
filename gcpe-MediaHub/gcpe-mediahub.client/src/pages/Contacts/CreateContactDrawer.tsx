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
    Title3,
    Dropdown,
    Option,
    Card
} from "@fluentui/react-components";

import { Dismiss24Regular, Add24Regular, Add16Regular } from "@fluentui/react-icons";
import SocialMediaInput from "./SocialMediaInput";
import { useEffect, useRef, useState } from "react";
import MediaOutletInput from "./MediaOutletInput";
import MediaContact from "../../models/mediaContact";
import MediaOutlet from "../../models/mediaOutlet";
import { OutletAssociation } from "../../models/OutletAssociation";
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import { SocialMediaLink } from "../../models/SocialMediaLink";
import { PhoneNumber } from "../../models/PhoneNumber";
import { JobTitle } from "../../models/JobTitle";


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
    sectionHeader: {
        fontSize: '16px',
        fontWeight: '400',
    },
}
);


export const CreateContactDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    //for primary contact info input tracking
    //const [primaryContactInfoInputs, setPrimaryContactInfoInputs] = useState<number[]>([1]);
    //const [contactPhones, setContactPhones] = useState<PhoneNumber[]>([]);

    const [socialMediaLinks, setSocialMediaLinks] = useState([
        { typeName: '', url: '', companyId: '' }
    ]);

    const [workplaces, setWorkplaces] = useState([
        {
            errors: {
                email: '',
            },
            mediaOrg: '',
            jobTitle: '',
            email: '',
            phoneType: '',
            phoneNumber: ''
        }
    ]);

    const addWorkplace = () => {
        setWorkplaces(prev => [
            ...prev,
            { mediaOrg: '', jobTitle: '', email: '', phoneType: '', phoneNumber: '', errors: {email: ''} }
        ]);
    };

    //const addPrimaryContactInfoInput = () => {
    //    setPrimaryContactInfoInputs([...primaryContactInfoInputs, primaryContactInfoInputs.length + 1]);
    //    setContactPhones([...contactPhones, undefined]); // Add new slot
    //};

    //const removePrimaryContactInfoInput = (index: number) => {
    //    setPrimaryContactInfoInputs(primaryContactInfoInputs.filter((_, i) => i !== index));
    //};

    // TODO: see if we can do away with this. Using proper type may make this redundant
    //const getPersonalPhoneNumbers = () => {
    //    let pn: PhoneNumber[] = [];
    //    primaryContactInfoInputs.forEach((_, index) => {
    //        if (contactPhones && contactPhones.length > 0) {
    //            let phoneNumber: PhoneNumber = new PhoneNumber();
    //            phoneNumber.PhoneType = contactPhones[index].PhoneType;
    //            phoneNumber.PhoneLineNumber = contactPhones[index].PhoneLineNumber;
    //            pn.push(phoneNumber);
    //        }
    //    });

    //    return pn;
    //};

    //const handlePhoneNumberChange = (index: number, data: any) => { //TODO: use PhoneNumber model. Not 'any'
    //    const updatedPhones = [...contactPhones];
    //    updatedPhones[index] = data;
    //    setContactPhones(updatedPhones);
    //};


    const [error, setError] = React.useState<string | null>(null);
    const [showValidation, setShowValidation] = React.useState(false);
    const [formErrors, setFormErrors] = React.useState({
        firstName: '',
        lastName: '',
        email: '', //TODO: more sophisticated. check for '@', etc.
        atLeastOnePhoneNumber: '', // at least one personal phone number (not on Outlet association)
        atLeastOneWorkplace: '',
        workplaceEmail: '',
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
        console.log("submit");
        e.preventDefault();

        handleValidation();
        if (!error) {

            const contact: MediaContact = new MediaContact()
            contact.firstName = firstName;
            contact.lastName = lastName;
            contact.isPressGallery = isPressGallery;
            contact.email = email;
            contact.jobTitleId = 0;
         //   contact.phoneNumbers = getPersonalPhoneNumbers();
            contact.personalWebsite = website;

            outletAssociations.forEach((_, index) => {
                const outletAssociation: OutletAssociation = {
                    id: undefined,
                    contactId: undefined, // This can be set after the contact is created
                    lastRequestDate: undefined,
                    mediaContact: undefined,
                    mediaOutlet: undefined,
                    outletName: undefined,
                    outletId: outletAssociations[index]?.outletId,
                    contactEmail: outletAssociations[index]?.contactEmail,
                    phoneNumber: outletAssociations[index]?.phoneNumber,
                    jobTitle: outletAssociations[index]?.jobTitle,
                    contactPhones: undefined, //outletAssociations[index]?.contactPhones,
                    noLongerWorksHere: outletAssociations[index]?.noLongerWorksHere,
                };
                contact.mediaOutletContactRelationships.push(outletAssociation);
            });

            socialMediaLinks.forEach((link, index) => {
                const socialMedia: SocialMediaLink = {
                    //set all these TBD IDs on server...
                  //  id: undefined,
                    mediaContactId: undefined,
                    mediaOutletId: undefined, // won't set this
                    mediaOutlet: undefined, // won't be set
                    url: link.url,//socialMedias[index]?.socialProfileUrl,
                    companyId: parseInt(link.companyId), //socialMedias[index]?.socialMediaCompanyId,
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
        }
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

        workplaces.forEach((_, index) => {
            if (!workplaces[index].mediaOrg.trim()) errors.workplaceOrg = "An organization must be selected";
            if (!workplaces[index].jobTitle.trim()) errors.workplaceJobTitle = "A job title must be selected";
            if (!workplaces[index].email.trim()) errors.workplaceEmail = "An email address is required";

        })
/*        console.log(JSON.stringify(workplaces));*/
        setFormErrors(errors);
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

    const [jobTitles, setJobTitles] = useState<JobTitle[]>([
        {
            "id": 31,
            "name": "Assignment Editor",
        },
        {
            "id": 32,
            "name": "Camera Person",
        },
        {
            "id": 33,
            "name": "Editor",
        },
        {
            "id": 34,
            "name": "Freelancer",
        },
        {
            "id": 35,
            "name": "Host",
        },
        {
            "id": 36,
            "name": "News Director",
        },
        {
            "id": 37,
            "name": "Photographer",
        },
        {
            "id": 38,
            "name": "Producer",
        },
        {
            "id": 39,
            "name": "Reporter",
        },
        {
            "id": 40,
            "name": "Other",
        }
    ]
);
    const fetchJobTitles = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}mediaContacts/GetJobTitles`);
        const data = await response.json();
        console.log(JSON.stringify(data));
        const jobs: JobTitle[] = data as JobTitle[];
        setJobTitles(jobs);
    };

    useEffect(() => {
        fetchOutlets();
   //     fetchJobTitles();
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
                                onClick={() => {
                                    setError(null);
                                    setShowValidation(false);
                                    setOutletInputs([1]);


                                    //setWorkplaces([{
                                    //        errors: {
                                    //            email: '',
                                    //        },
                                    //        mediaOrg: '',
                                    //        jobTitle: '',
                                    //        email: '',
                                    //        phoneType: '',
                                    //        phoneNumber: ''
                                    //    }]);
                                    
                                    setIsOpen(false)
                                }}
                            />
                        }
                    >
                        <div className={styles.title}>New contact</div>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <Field label="First name"
                        required
                        validationMessage={showValidation && formErrors.firstName ? "First name is required" : undefined}
                        validationState={showValidation && formErrors.firstName ? "error" : "none"}
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
                        validationMessage={showValidation && formErrors.lastName ? "Last name is required" : undefined}
                        validationState={showValidation && formErrors.lastName ? "error" : "none"}
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

                    <Divider style={{ margin: '24px 0 16px 0' }} />

                    <Title3 className={styles.sectionHeader }>Workplace information</Title3>
                    {outletInputs.map((outlet, index) => (
                        <MediaOutletInput
                            key={index }
                            onRemove={() => removeOutletInput(index)}
                            onAssociationDataChange={(outlet) => handleAssociationDataChange(index, outlet)}
                            outlets={outlets}
                            jobTitles={jobTitles }
                            showValidation={showValidation}
                        />
                    ))}
                       
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                        <Button appearance="transparent" icon={<Add16Regular />} iconPosition="before" onClick={addOutletInput}>
                            Workplace
                        </Button>
                    </div>

                    <Divider style={{ margin: '24px 0 16px 0' }} />

                    <Title3 className={styles.sectionHeader}>Online presence</Title3>

                    <Field label="Website">
                        <Input placeholder="http://"
                            onChange={(_, data) => setWebsite(data.value)}
                        />
                    </Field>

                    {socialMediaLinks.map((entry, index) => (
                        <Field key={index} label={index === 0 ? "Social media" : ""}>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '0.75rem',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <Dropdown
                                    placeholder="Select"
                                    appearance="outline"
                                    style={{ flex: '0 0 120px', minWidth: 0, marginBottom: 0 }}
                                    value={entry.typeName}
                                    onOptionSelect={(_, data) => {
                                        const updated = [...socialMediaLinks];
                                        updated[index].typeName = data.optionText || '';
                                        updated[index].companyId = data.optionValue
                                        setSocialMediaLinks(updated);
                                    }}
                                >
                                    {socials.map((social, index) => (
                                        <Option key={index}
                                            value={social.id.toString()}
                                            text={social.company}
                                        >
                                            {social.company}
                                        </Option>
                                    ))}
                                    {/*<Option>LinkedIn</Option>*/}
                                </Dropdown>

                                <Input
                                    placeholder="http://"
                                    appearance="outline"
                                    value={entry.url}
                                    onChange={(_, data) => {
                                        const updated = [...socialMediaLinks];
                                        updated[index].url = data.value;
                                        setSocialMediaLinks(updated);
                                    }}
                                    style={{ flex: '1 1 auto', minWidth: 0 }}
                                />
                            </div>
                        </Field>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            appearance="transparent"
                            icon={<Add24Regular />}
                            onClick={() =>
                                setSocialMediaLinks([...socialMediaLinks, { typeName: '', url: '', companyId: ''}])
                            }
                        >
                            Social media
                        </Button>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: '0.75rem',
                            justifyContent: 'flex-start',
                            marginTop: '2rem',
                        }}>
                        <Button
                            aria-label="Create this contact"
                            appearance="primary"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Save
                        </Button>
                        <Button
                            aria-label="Cancel and close this dialog"
                            onClick={() => {
                                setIsOpen(false)
                                setOutletInputs([1]);
                                setWorkplaces([
                                    {
                                        errors: {
                                            email: '',
                                        },
                                        mediaOrg: '',
                                        jobTitle: '',
                                        email: '',
                                        phoneType: '',
                                        phoneNumber: ''
                                    }
                                ]);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>

                </DrawerBody>
            </OverlayDrawer>

            <Button
                {...restoreFocusTargetAttributes}
                icon={<Add24Regular />}
                appearance="primary"
                onClick={() => {
                    setError(null);
                    setShowValidation(false);
                    setWorkplaces
                    setIsOpen(true)
                }}
            >
                Add contact
            </Button>

        </div>
    );
};

export default CreateContactDrawer;