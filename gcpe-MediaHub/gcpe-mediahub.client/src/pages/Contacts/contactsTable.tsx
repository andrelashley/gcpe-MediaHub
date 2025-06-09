

import { FilterRegular } from "@fluentui/react-icons";

// import MediaContact from "../../models/MediaContact";
import React, { useState } from "react";
import ContactDetailsDrawer from "./ContactDetailsDrawer";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    PaginationState,
} from '@tanstack/react-table';
import {
    Tag,
    makeStyles,
    Text,
    SearchBox,
    Button,
} from "@fluentui/react-components";

const useStyles = makeStyles({
    searchElement: {
        display: "flex",
    },
    marginLeftAuto: {
        marginLeft: "auto",
    },
    rightMargin: {
        marginRight: "10px",
    },
});

interface TableProps {

    items: any[],
}

const ContactsTable: React.FC<TableProps> = ({ items }) => {
    const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState<any>(null);

    // Tanstack pagination stuff
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columnHelper = createColumnHelper<any>();

    const getRequestTag = (requests?: any[]) => {
        if (requests != null && requests.length > 0) {
            return <Tag shape="circular" appearance="outline" > {requests.length} active</Tag>;
        } else {
            return null;
        }
    } 

    const columns = [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: item => item.getValue(),
        }),
        columnHelper.accessor('outlets', {
            header: 'Media Outlets',
            cell: item => (
                (item.getValue() as any[]).map(outlet =>
                    <Tag appearance="outline" shape="circular" key={outlet.outlet.id}>
                        {outlet.outlet.name}
                    </Tag>
                )
            )
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: item => item.getValue(),

        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: item => item.getValue(),
        }),
        columnHelper.accessor('location', {
            header: 'Location',
            cell: item => (
                <Tag appearance="outline" shape="circular">
                    {item.getValue()}
                </Tag>
            ),
        }),
        columnHelper.accessor('requests', {
            header: 'Media Requests',
            cell: item => (
                getRequestTag(item.getValue())
            )
        }),
        columnHelper.accessor('lastActive', {
            header: 'Last Active',
            cell: info => info.getValue(),
            //new Date(info.getValue()).toLocaleDateString(
            //<Tag appearance="outline" shape="circular">
            //    {info.getValue()}
            //</Tag>
            //),
        }),
    ];

    const table = useReactTable({
        data: items || [],
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const closeContactDetails = () => {
        setContactDetailsOpen(false);
    }
    const styles = useStyles();

    const openDetails = (contact: any) => {
        console.log(JSON.stringify(contact));
        setContactDetailsOpen(true);
        setCurrentContact(contact);
    }
    //const dateOptions: Intl.DateTimeFormatOptions = {
    //    day: "numeric", month: "numeric", year: "numeric",
    //    hour: "2-digit", minute: "2-digit"
    //};
    return (

        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div className={styles.searchElement}>
                <Text>All</Text>
                <div className={styles.marginLeftAuto}>
                    <SearchBox
                        contentBefore={<Text size={400}>Search:</Text>}
                        title={"this doesn't do anything yet."}
                        className={styles.rightMargin}
                    />
                    <Button title={"this doesn't do anything yet."} icon={<FilterRegular />}>Filter</Button>

                </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'left',
                                        borderBottom: '1px solid #e0e0e0',
                                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                                    }}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() && (
                                        <span>
                                            {header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            onClick={() => openDetails(row.original)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'transparent',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0' }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentContact &&
                <ContactDetailsDrawer contact={currentContact} isOpen={contactDetailsOpen} closeContactDetails={closeContactDetails} />
            }
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    {'<'} Prev
                </button>
                {Array.from({ length: table.getPageCount() }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => table.setPageIndex(index)}
                        style={{
                            background: index === table.getState().pagination.pageIndex ? '#e0e0e0' : 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 8px',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    Next {'>'}
                </button>
            </div>
        </div>



        //<div>
        //    {/*  This section could maybe be a separate component*/}
        //    <div className={styles.searchElement}>
        //        <Text>All</Text>
        //        <div className={styles.marginLeftAuto}>
        //            <SearchBox
        //                contentBefore={<Text size={400}>Search:</Text>}
        //                title={"this doesn't do anything yet."}
        //                className={styles.rightMargin}
        //            />
        //            <Button title={"this doesn't do anything yet."} icon={<FilterRegular /> }>Filter</Button>

        //        </div>
        //    </div>
        //    <Table arial-label="Default table" className={styles.table}>

        //        <TableHeader>
        //            <TableRow>
        //                {columns.map((column) => (
        //                    <TableHeaderCell key={column.columnKey} style={{ fontWeight: "900" }}>
        //                        {column.label}
        //                    </TableHeaderCell>
        //                ))}
        //            </TableRow>
        //        </TableHeader>
        //        <TableBody>
        //            {items &&
        //                items.map((item) => (
        //                    <TableRow key={item.id} onClick={() => openDetails(item)}>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                {item.firstName} {item.lastName}
        //                            </TableCellLayout>
        //                        </TableCell>
        //                        <TableCell>
        //                            {/*    {item.outlets &&*/}
        //                            {/*        item.outlets.map((outlet: any, index: number) => (*/}
        //                            {/*    <TableCellLayout key={index}>*/}
        //                            {/*        <TagGroup>*/}
        //                            {/*            <Tag shape="circular" appearance="outline"> {outlet.contactEmail} </Tag>*/}
        //                            {/*        </TagGroup>*/}
        //                            {/*    </TableCellLayout>*/}
        //                            {/*))}*/}
        //                            <TagGroup>
        //                                <Tag shape="circular" appearance="outline">{item.outletName}</Tag>
        //                            </TagGroup>
        //                        </TableCell>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                {item.email}
        //                            </TableCellLayout>
        //                        </TableCell>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                {item.phone ?
        //                                    (item.phone)
        //                                    : (item.mobilePhone)
        //                                }
        //                            </TableCellLayout>
        //                        </TableCell>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                <TagGroup>
        //                                    <Tag shape="circular" appearance="outline">{item.location}</Tag>
        //                                </TagGroup>
        //                            </TableCellLayout>
        //                        </TableCell>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                {item.requests && item.requests.length > 0 &&
        //                                    <TagGroup>
        //                                        <Tag shape="circular" appearance="outline">{item.requests.length} active</Tag>
        //                                    </TagGroup>
        //                                }
        //                            </TableCellLayout>
        //                        </TableCell>
        //                        <TableCell>
        //                            <TableCellLayout>
        //                                {item.lastActive}
        //                            </TableCellLayout>
        //                        </TableCell>
        //                    </TableRow>
        //                ))}
        //        </TableBody>
        //    </Table>
        //    {currentContact &&
        //        <ContactDetailsDrawer contact={currentContact} isOpen={contactDetailsOpen} closeContactDetails={closeContactDetails} />
        //    }
        //</div>
    );
}

export default ContactsTable;