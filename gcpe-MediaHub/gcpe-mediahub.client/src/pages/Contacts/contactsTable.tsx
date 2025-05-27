

import {
    Button,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    //PresenceBadgeStatus,
    //Avatar,
    Tag,
    makeStyles,
    TagGroup,
    Tab,
    TabList,
    SearchBox,
    Text,
} from "@fluentui/react-components";


import MediaContact from "../../models/MediaContact";
import React, { useState } from "react";
import ContactDetailsDrawer from "./ContactDetailsDrawer";


const useStyles = makeStyles({
    table: {
        midWidth: "510px",
        tableLayout: "auto",

    },
    tableHeader: {
        fontWeight: "font-weight-bold",
    },
    searchELement: {
        display: "flex",
    },
    leftElements: {
        alignSelf: "flex-end"
    },
});

const columns = [
    { columnKey: "name", label: "Name" },

    { columnKey: "mediaOutlets", label: "Outlets" },
    { columnKey: "email", label: "Email" },
    { columnKey: "phone", label: "Phone" },
    { columnKey: "location", label: "Location" },
    { columnKey: "mediaRequests", label: "Requests" },
    { columnKey: "lastActive", label: "Last Active" },
];

interface TableProps {

    items: any[],
}

const ContactsTable: React.FC<TableProps> = ({ items }) => {
    const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState<any>(null);
    const closeContactDetails = () => {
        setContactDetailsOpen(false);
    }
    const styles = useStyles();
    {
        items === undefined &&
            console.log("UNDEFINED!");
    }

    const openDetails = (contact: any) => {
        setContactDetailsOpen(true);
        setCurrentContact(contact);
    }
    //const dateOptions: Intl.DateTimeFormatOptions = {
    //    day: "numeric", month: "numeric", year: "numeric",
    //    hour: "2-digit", minute: "2-digit"
    //};
    return (
        <div>
            {/*  This section could maybe be a separate component*/}
            <div className={styles.searchELement}>
                <Text>All</Text>
                <div className={styles.leftElements}>
                    <SearchBox contentBefore={<Text size={400}>Search:</Text>} title={"this doesn't do anything yet."} />
                    <Button title={"this doesn't do anything yet."}>Filter</Button>

                </div>
            </div>
            <Table arial-label="Default table" className={styles.table}>

                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHeaderCell key={column.columnKey} style={{ fontWeight: "900" }}>
                                {column.label}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items &&
                        items.map((item) => (
                            <TableRow key={item.id} onClick={() => openDetails(item)}>
                                <TableCell>
                                    <TableCellLayout>
                                        {item.firstName} {item.lastName}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    {/*    {item.outlets &&*/}
                                    {/*        item.outlets.map((outlet: any, index: number) => (*/}
                                    {/*    <TableCellLayout key={index}>*/}
                                    {/*        <TagGroup>*/}
                                    {/*            <Tag shape="circular" appearance="outline"> {outlet.contactEmail} </Tag>*/}
                                    {/*        </TagGroup>*/}
                                    {/*    </TableCellLayout>*/}
                                    {/*))}*/}
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline">{item.outletName}</Tag>
                                    </TagGroup>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        {item.email}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        {item.phone}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        <TagGroup>
                                            <Tag shape="circular" appearance="outline">{item.location}</Tag>
                                        </TagGroup>
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        {item.requests && item.requests.length > 0 &&
                                            <TagGroup>
                                                <Tag shape="circular" appearance="outline">{item.requests.length} active</Tag>
                                            </TagGroup>
                                        }
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    <TableCellLayout>
                                        {/* {item.lastActive}*/} Date goes here
                                    </TableCellLayout>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {currentContact &&
                <ContactDetailsDrawer contact={currentContact} isOpen={contactDetailsOpen} closeContactDetails={closeContactDetails} />
            }
        </div>
    );
}

export default ContactsTable;