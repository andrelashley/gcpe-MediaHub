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
} from "@fluentui/react-components";
import { Dismiss24Regular, Important24Regular, Important16Regular, CrownSubtract20Regular, Ribbon24Regular, Globe24Regular, Search24Regular, Add24Regular, MoreHorizontal24Regular, Important24Filled, Calendar16Regular } from "@fluentui/react-icons";
import XIcon from '../../assets/icons/x.svg';
import FieldRow from "../Organizations/fieldRow";

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
    const [selectedTab, setSelectedTab] = React.useState<"workplaces" | "requests">("workplaces");

    console.log(JSON.stringify(contact));
    const styles = useStyles();
    // all Drawers need manual focus restoration attributes
    // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
    const restoreFocusSourceAttributes = useRestoreFocusSource();

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
                                Keith Baldrey {/* {contact.firstName} {contact.lastName} */}
                            </Text>
                            <Badge
                                appearance="filled"
                                color="important"
                                shape="circular"
                                icon={<CrownSubtract20Regular />}
                                style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}
                                >
                                Press Gallery
                            </Badge>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column' }}>
                            <Text size={300}>Reporter</Text>
                            <Text size={300}>Victoria, British Columbia</Text>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: '8px' }}>
                            {/* <Button
                                appearance="secondary"
                                icon={<Globe24Regular />}
                                iconPosition="before"
                                style={{ padding: "4px 16px", fontWeight: 600 }}
                            >
                                keithbaldrey.ca
                            </Button> */}

                            <Button
                                appearance="secondary"
                                icon={<Globe24Regular />}
                                iconPosition="before"
                                style={{ padding: "4px 16px", fontWeight: 600 }}
                            >
                                @KeithBaldrey
                            </Button>


                            <Button
                                appearance="secondary"
                                icon={
                                <img
                                    src={XIcon}
                                    alt="X"
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
                                style={{ padding: "4px 16px", fontWeight: 600 }}
                            >
                                @KeithBaldrey
                            </Button>
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

                <div style={{marginBottom: '0.5rem'}}>
                    <Text size={300}>
                        Primary Contact info
                    </Text>
                </div>

                <FieldRow label="Email">
                    <Field>
                        <Input defaultValue="keith.baldrey@globalnews.ca" />
                    </Field>
                </FieldRow>

                <FieldRow label="Primary">
                    <Field>
                        <Input defaultValue="250-387-1572" />
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
                        <TabList 
                          selectedValue={selectedTab}
                          onTabSelect={(_, data) => setSelectedTab(data.value as "workplaces" | "requests")}>
                            <Tab value="workplaces">Workplaces</Tab>
                            <Tab value="requests">Requests</Tab>
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
                <>
                    <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                            }}>
                            <Text size={400} weight="semibold">Global News Calgary</Text>
                            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>
                                Commentator
                            </Text>
                            
                            <Badge
                                appearance="filled"
                                color="brand"
                                shape="circular"
                                icon={<Important16Regular />}
                                style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}
                                >
                                Major
                            </Badge>
                    </div>
                    <div>
                        {/* Right side: Menu */}
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
                    <Input defaultValue="keithbaldrey@globalnewscalgary.com" />
                </Field>
                </FieldRow>

                <FieldRow label="Primary">
                <Field>
                    <Input defaultValue="250-387-1572" />
                </Field>
                </FieldRow>

                <FieldRow label="Cell">
                <Field>
                    <Input defaultValue="250-360-7658" />
                </Field>
                </FieldRow>
            </div>

            <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                        }}>
                        <Text size={400} weight="semibold">Vancouver Sun</Text>
                        <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>
                            Reporter
                        </Text>
                        <Badge
                                appearance="filled"
                                color="brand"
                                shape="circular"
                                icon={<Important16Regular />}
                                style={{ paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px' }}
                                >
                                Major
                            </Badge>
                    </div>

                    <div>
                        {/* Right side: Menu */}
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
                    <Input defaultValue="keithbaldrey@vancouversun.com" />
                </Field>
                </FieldRow>

                <FieldRow label="Primary">
                <Field>
                    <Input defaultValue="250-387-1572" />
                </Field>
                </FieldRow>

                <FieldRow label="Cell">
                <Field>
                    <Input defaultValue="250-360-7658" />
                </Field>
                </FieldRow>

            </div>

            <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <Text size={400} weight="semibold">CKNW</Text>
                    <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Legislative Bureau Chief</Text>
                </div>

                <div>
                    {/* Right side: Menu */}
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
                    <Input defaultValue="keithbaldrey@cknw.com" />
                </Field>
                </FieldRow>

                <FieldRow label="Primary">
                <Field>
                    <Input defaultValue="250-387-1572" />
                </Field>
                </FieldRow>

                <FieldRow label="Cell">
                <Field>
                    <Input defaultValue="250-360-7658" />
                </Field>
                </FieldRow>
            </div>
        </>
      )}

        {selectedTab === "requests" && (
        <>
<div
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
          REQ-00153
        </Text>
        <Tag
  appearance="filled"
  shape="rounded"
  size="small"
  style={{
    backgroundColor: "#d6a200",
    color: "#fff",
    fontSize: "14px",
    padding: "4px 12px",
    borderRadius: "9999px",
  }}
>
  In Progress
</Tag>
      </div>

      <Text
        size={500}
        weight="semibold"
        style={{ display: "block", marginTop: "0.5rem" }}
      >
        Trade - China
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
        <Text size={300}>Tomorrow at 3:00PM</Text>
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
        {["JEDI", "PREM", "MIN"].map((label) => (
          <div
            key={label}
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
            {label}
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

    <div
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
          REQ-00153
        </Text>
        <Tag
            appearance="filled"
            shape="rounded"
            size="small"
            style={{
                backgroundColor: "#d6a200",
                color: "#fff",
                fontSize: "14px",
                padding: "4px 12px",
                borderRadius: "9999px",
        }}
>
  In Progress
</Tag>
      </div>

      <Text
        size={500}
        weight="semibold"
        style={{ display: "block", marginTop: "0.5rem" }}
      >
        Cowichan Valley Transit
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
        <Text size={300}>Tomorrow at 3:00PM</Text>
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
        {["LBR", "TT", "INF"].map((label) => (
          <div
            key={label}
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
            {label}
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



    <div
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
          REQ-00153
        </Text>
        <Tag
  appearance="filled"
  shape="rounded"
  size="small"
  style={{
    backgroundColor: "#d6a200",
    color: "#fff",
    fontSize: "14px",
    padding: "4px 12px",
    borderRadius: "9999px",
  }}
>
  In Progress
</Tag>
      </div>

      <Text
        size={500}
        weight="semibold"
        style={{ display: "block", marginTop: "0.5rem" }}
      >
        BC Wildfire Situation
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
        <Text size={300}>Tomorrow at 4:00PM</Text>
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
        {["BCWS", "TT", "INF"].map((label) => (
          <div
            key={label}
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
            {label}
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

        </>
    )}

        </DrawerBody>
    </OverlayDrawer>
        </div>
    );
};

export default ContactDetailsDrawer;