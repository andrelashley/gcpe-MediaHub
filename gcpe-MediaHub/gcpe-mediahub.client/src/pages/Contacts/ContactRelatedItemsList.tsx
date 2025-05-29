import * as React from "react";
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components";

import type {
    SelectTabData,
    SelectTabEvent,
    TabValue,
} from "@fluentui/react-components";
import OutletDetails from "./OutletDetails";

import RequestDetails from "./RequestDetails";

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

const ContactRelatedItemsList: React.FC<ContactItemsListProps> = ({outlets, requests }) => {
    const styles = useStyles();


  //  console.log(JSON.stringify(outlets));
    const [selectedValue, setSelectedValue] =
        React.useState<TabValue>("workplaces");
    
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        console.log(data.value);
        setSelectedValue(data.value);
        return event;
    };

   
    const Workplaces = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Workplaces">
            {outlets &&
                outlets.map((outlet) => (
                    <OutletDetails key={outlet.id} outlet={outlet}/>
                    ))
                }
        </div>
    )); 

    const Requests = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Requests">
            {requests && 
                requests.map((request) => (
                    <RequestDetails key={request.id} request={request } />
                ))
            }
        </div>
    )); 

    const MailingLists = React.memo(() => (
        <div role="tabpanel" aria-labelledby="Mailing Lists">
            mailing lists
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
                <Tab id="MailingLists" value="mailingLists">
                    Mailing lists
                </Tab>
            </TabList>
            <div className={styles.panels}>
                {selectedValue === "workplaces" && <Workplaces />}
                {selectedValue === "requests" && <Requests />}
                {selectedValue === "mailingLists" && <MailingLists />}
            </div>
        </div>
    );
};


export default ContactRelatedItemsList;
