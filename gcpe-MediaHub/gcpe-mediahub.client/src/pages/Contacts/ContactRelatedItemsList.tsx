import * as React from "react";
import {
    makeStyles,
    tokens,
    Tab,
    TabList,
    Badge,
    Button,
    Field,
    Input,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    SelectTabData,
    SelectTabEvent,
    TabValue,
    TagGroupProps,
    TagValue,
    Text,
    MenuTrigger,
} from "@fluentui/react-components";

import OutletDetails from "./OutletDetails";
import { Dismiss24Regular, Important24Regular, Important16Regular,  MoreHorizontal24Regular,  } from "@fluentui/react-icons";
import RequestDetails from "./RequestDetails";
import FieldRow from "../Organizations/fieldRow";

const useStyles = makeStyles({
    root: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "50px 20px",
        rowGap: "20px",
    },
    panels: {
        padding: "0 10px",
        width: '100%',
        "& th": {
            textAlign: "left",
            padding: "0 30px 0 0",
        },
    },
    propsTable: {
        "& td:first-child": {
            fontWeight: tokens.fontWeightSemibold,
        },
        "& td": {
            padding: "0 30px 0 0",
        },
    },
});

interface ContactItemsListProps {
    outlets?: any[];
    requests?: any[];
    mailingLists?: any[];
}

const ContactRelatedItemsList: React.FC<ContactItemsListProps> = ({ outlets, requests }) => {
    const styles = useStyles();


    //  console.log(JSON.stringify(outlets));
    const [selectedValue, setSelectedValue] =
        React.useState<TabValue>("workplaces");

    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
        return event;
    };


    const [selectedTag, setSelectedTag] = React.useState<TagValue>();

    const onWorkPlaceTagSelect: TagGroupProps["onTagSelect"] = (_e, { value }) => {
        setSelectedTag(value);
    };

    const Workplaces = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Workplaces">
            {outlets.map((outlet, index) =>
                <div key={index} style={{ border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem', borderRadius: '4px', marginBottom: '1.25rem' }}>

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
                            Right side: Menu
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

    const Requests = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Requests">
            {requests &&
                requests.map((request, index) => (
                    <RequestDetails key={index} request={request} />
                ))
            }
        </div>
    ));

    return (
        <div className={styles.root}>
            <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
                <Tab id="Workplaces" value="workplaces">
                    WorkPlaces
                </Tab>
                <Tab id="Requests" value="requests">
                    Requests
                </Tab>
            </TabList>
            <div className={styles.panels}>
                {selectedValue === "workplaces" && <Workplaces />}
                {selectedValue === "requests" && <Requests />}
            </div>
        </div>
    );
};


export default ContactRelatedItemsList;
