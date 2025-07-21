import * as React from "react";
import {
    Avatar,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer,
    Button,
    useRestoreFocusSource,
    Text,
    TagGroup,
    makeStyles,
    Tag,
    Badge,
    Divider,
    Field,
    Input,
    TabList,
    Tab,
    Menu,
    MenuPopover,
    MenuItem,
    MenuTrigger,
    MenuList,
    SelectTabData,
    SelectTabEvent,
    TabValue,
} from "@fluentui/react-components";

import {
    Dismiss24Regular,
    Important16Regular,
    CrownSubtract20Regular,
    Globe24Regular,
    Search24Regular,
    Add24Regular,
    MoreHorizontal24Regular,
    Calendar16Regular
} from "@fluentui/react-icons";

import XIcon from '../../assets/icons/x.svg';
import FaceBookIcon from '../../assets/icons/facebook.svg'
import LinkedInIcon from '../../assets/icons/linkedin.svg'
import InstagramIcon from '../../assets/icons/instagram.svg'
import FieldRow from "../Organizations/fieldRow";

//import OutletDetails from "./OutletDetails";
import ContactRelatedItemsList from "./ContactRelatedItemsList";
import { MediaContact } from "../../models/mediaContact";
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import RequestStatusBadge from "../../components/RequestStatusBadge";


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
    },
    socialLinkButton: {
        padding: '4px 16px',
        fontWeight: '600',
    },
}
);

interface ContactDetailsProps {
    contact: MediaContact;
    isOpen: boolean;
    closeContactDetails: any;
    socialMediaCompanies: SocialMediaCompany[];
}

export const ContactDetailsDrawer: React.FC<ContactDetailsProps> = ({ contact, isOpen, closeContactDetails, socialMediaCompanies }) => {
    const [selectedTab, setSelectedTab] = React.useState<TabValue>("workplaces");

    console.log(JSON.stringify(contact));
    const styles = useStyles();
    // all Drawers need manual focus restoration attributes
    // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
    const restoreFocusSourceAttributes = useRestoreFocusSource();
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedTab(data.value);
    }
    { (_, data) => { setSelectedTab(data.value as "workplaces" | "requests"); console.log(data.value) } }
    const getSocialMediaCompanyIcon = (companyId) => {
        const company: SocialMediaCompany = socialMediaCompanies.find(company => company.id == companyId);
        switch (company.company.toLowerCase()) {
            default: case 'bluesky': case 'google+': case 'other':
                return null;
            case 'facebook':
                return FaceBookIcon;
            case 'instagram':
                return InstagramIcon;
            case 'linkedin':
                return LinkedInIcon;
            case 'x':
                return XIcon;
        }

    }

    const getSocialMediaCompanyName = (companyId) => {
        const company: SocialMediaCompany = socialMediaCompanies.find(company => company.id == companyId);
        if (company) {
            return company.company;
        } else {
            return '';
        }
    }

    const Workplaces = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Workplaces">
            {contact.mediaOutletContactRelationships.map((outlet, index) =>
                <div key={index} style={
                    {
                        border: '1px solid #ccc',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingTop: '1rem',
                        borderRadius: '4px',
                        marginBottom: '1.25rem'
                    }}>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                        }}>
                            <Text size={400} weight="semibold">{outlet.outletName}</Text>
                            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>
                                {outlet.jobTitle}
                            </Text>

                            {outlet.isMajorMedia &&
                                <Badge
                                    appearance="filled"
                                    color="brand"
                                    shape="circular"
                                    icon={<Important16Regular />}
                                    style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}
                                >
                                    Major
                                </Badge>
                            }
                        </div>
                        <div>

                            <Menu>
                                <MenuTrigger disableButtonEnhancement>
                                    <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
                                </MenuTrigger>
                                <MenuPopover>
                                    <MenuList>
                                        <MenuItem>Edit</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                    </MenuList>
                                </MenuPopover>
                            </Menu>
                        </div>
                    </div>
                    <FieldRow label="Email">
                        <Field>
                            <Input defaultValue={outlet.contactEmail} />
                        </Field>
                    </FieldRow>

                    <FieldRow label="Primary">
                        <Field>
                            <Input defaultValue={outlet.phoneNumber} />
                        </Field>
                    </FieldRow>

                    <FieldRow label="Mobile">
                        <Field>
                            <Input defaultValue={'what are we going to do about this?'} />
                        </Field>
                    </FieldRow>
                </div>
            )}
        </div>
    ));

    //TODO: use this to get really cool formatting, like "Tomorrow at..."
    const getDeadlineString = (deadline: Date) =>
    {
        return deadline.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
    }

    const Requests = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Requests">
            {contact.requests.map((request, index) =>
                <div
                    key={request.id }
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        padding: "1.25rem",
                        marginBottom: "1rem",
                        backgroundColor: "#fff",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text size={300} weight="semibold" style={{ color: "#444" }}>
                            REQ-{request.requestNo}
                        </Text>
                     
                        <RequestStatusBadge status={request.statusName} />
                    </div>

                    <Text
                        size={500}
                        weight="semibold"
                        style={{ display: "block", marginTop: "0.5rem" }}
                    >
                        {request.title}
                    </Text>

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: "#f2f2f2",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            marginTop: "0.5rem",
                        }}
                    >
                        <Calendar16Regular style={{ marginRight: 6 }} />
                        <Text size={300}>{getDeadlineString(request.deadline)}</Text>
                    </div>

                    <Divider style={{ margin: '24px 0 16px 0' }} />

                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginTop: "0.75rem",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        {request.additionalMinistries.map((ministry, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "4px 10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "16px",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    backgroundColor: "#fff",
                                    color: "#333",
                                }}
                            >
                                {ministry.acronym}
                            </div>
                        ))}

                        <div style={{ marginLeft: "auto" }}>
                            <Avatar
                                initials="ST"
                                size={24}
                                color="neutral"
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    color: "#444",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    ));

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

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "0.5rem",
                                gap: "1rem",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                <Text weight="semibold" size={600}>
                                    {contact.firstName} {contact.lastName}
                                </Text>
                                {contact.isPressGallery &&
                                    <Badge
                                        appearance="filled"
                                        color="important"
                                        shape="circular"
                                        icon={<CrownSubtract20Regular />}
                                        style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}
                                    >
                                        Press Gallery
                                    </Badge>
                                }
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text size={300}>{contact.jobTitle}</Text>
                            <Text size={300}>{contact.location}</Text>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: '8px' }}>
                            {contact.personalWebsite &&
                                <Button
                                    className={styles.socialLinkButton}
                                    appearance="secondary"
                                    icon={<Globe24Regular />}
                                    iconPosition="before"
                                    onClick={() => { window.open(contact.personalWebsite) }}
                                >
                                    {contact.personalWebsite}
                                </Button>

                            }
                            {contact.socialMedias.map((social, index) => // maybe this should be a separate "if" for each possible social,
                                // not yet sure how different name formats, etc. are.
                                <Button
                                    key={index }
                                    className={styles.socialLinkButton}
                                    appearance="secondary"
                                    onClick={() => { window.open(social.url) }}
                                    icon={
                                        <img
                                            src={getSocialMediaCompanyIcon(social.companyId)}
                                            alt={getSocialMediaCompanyName(social.companyId)}
                                            style={{
                                                width: 16,
                                                height: 16,
                                                objectFit: "contain",
                                                filter: "grayscale(1) brightness(0)",
                                                borderRadius: 4,
                                            }}
                                        />
                                    }

                                    iconPosition="before"
                                >
                                    {social.url}
                                </Button>
                            )}
                        </div>
                    </DrawerHeaderTitle>
                    {/* <p>{contact.jobTitle}</p>
                    <p>{contact.location}</p>
                    <TagGroup>
                        <Tag>{contact.email}</Tag>
                        {contact.socialMedias && contact.socialMedias.map((social, index) => (
                            <Tag key={index}>{social.socialProfileUrl}</Tag> 
                        ))}
                    </TagGroup> */}



                </DrawerHeader>

                <DrawerBody>
                    {/* <ContactRelatedItemsList
                        outlets={contact.mediaOutletContactRelationships}
                        requests={contact.requests}
                    /> */}


                    <Divider style={{ margin: '24px 0 16px 0' }} />

                    <div style={{ marginBottom: '0.5rem' }}>
                        <Text size={300}>
                            Primary Contact info
                        </Text>
                    </div>

                    <FieldRow label="Email">
                        <Field>
                            <Input defaultValue={contact.email} />
                        </Field>
                    </FieldRow>

                    <FieldRow label="Primary">
                        <Field>
                            <Input defaultValue={'TODO: resolve non-workplace phone numbers with team'} />
                        </Field>
                    </FieldRow>

                    <Divider style={{ margin: '24px 0 16px 0' }} />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                            gap: "1rem",
                        }}
                    >
                        {/* Left: Tabs */}
                        <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
                            <Tab id="Workplaces" value="workplaces">
                                Workplaces
                            </Tab>
                            <Tab id="Requests" value="requests">Requests</Tab>
                        </TabList>
                        {/* Right: Search + Add grouped */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Input placeholder="Search" contentBefore={<Search24Regular />} disabled />
                            <Button appearance="primary" icon={<Add24Regular />} disabled>
                                Add
                            </Button>
                        </div>
                    </div>

                    {selectedTab === "workplaces" && (
                        <div>
                            <Workplaces />
                        </div>
                    )}

                    {selectedTab === "requests" && (
                        <>
                            <div>
                                <Requests />
                            </div>
                        </>
                    )}

                </DrawerBody>
            </OverlayDrawer>
        </div>
    );
};

export default ContactDetailsDrawer;