
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
} from "@fluentui/react-components";
import MediaContact from "../../models/mediaContact";
import React from "react";


const columns = [
    { columnKey: "name", label: "Name" },

    { columnKey: "mediaOutlets", label: "Outlets" },
    { columnKey: "email", label: "Email" },
    { columnKey: "phone", label: "Phone" },
    { columnKey: "mediaRequests", label: "Requests" },
];

interface TableProps {

    items: MediaContact[],
}

const ContactsTable = ({ items }) => {

    console.log(items);
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
                            <TableCellLayout>
                                {item.mediaOutlets}
                            </TableCellLayout>
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
                                {item.mediaRequests}
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ContactsTable;