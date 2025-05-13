
import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
} from "@fluentui/react-icons";

import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    PresenceBadgeStatus,
    Avatar,
    Tag,
    makeStyles,
    TagGroup,
} from "@fluentui/react-components";

import MediaContact from "../../models/mediaContact";
import React from "react";

const useStyles = makeStyles({
    tableHeader: {
        fontWeight: "font-weight-bold",
    }
    }
);

const columns = [
    { columnKey: "name", label: "Name" },

    { columnKey: "mediaOutlets", label: "Outlets" },
    { columnKey: "email", label: "Email" },
    { columnKey: "phone", label: "Phone" },
    { columnKey: "location", label: "Location" },
    { columnKey: "mediaRequests", label: "Requests" },
];

interface TableProps {

    items: MediaContact[],
}

const ContactsTable = ({ items }) => {
    const styles = useStyles();
    
    return (
        <Table arial-label="Default table" style={{ minWidth: "510px" }}>

            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey}>
                            {column.label}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <TableCellLayout>
                                {item.firstName} {item.lastName}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            {item.outlets.map((outlet, index) => (
                                <TableCellLayout key={index}>
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline"> {outlet} </Tag>
                                    </TagGroup>
                                </TableCellLayout>
                            ))}
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
                                {item.requests.length > 0 &&
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline">{item.requests.length} active</Tag> 
                                    </TagGroup>
                                }
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ContactsTable;