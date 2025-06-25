

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
import MediaContact from "../../models/mediaContact";
import { MediaRequest } from "../../models/mediaRequest";

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

    items: MediaContact[],
}

const ContactsTable: React.FC<TableProps> = ({ items }) => {
    const [contactDetailsOpen, setContactDetailsOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState<MediaContact | undefined>();

    // Tanstack pagination stuff
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const columnHelper = createColumnHelper<MediaContact>();

    const getRequestTag = (requests?: MediaRequest[]) => {
        if (requests != null && requests.length > 0) {
            return <Tag shape="circular" appearance="outline" > {requests.length} active</Tag>;
        } else {
            return null;
        }
    } 

    const columns = [
        columnHelper.accessor('firstName', {
            header: 'Name',
            cell: item => item.getValue(),
        }),
        columnHelper.accessor('outlets', {
            header: 'Media Outlets',
            cell: item => 
                (item.getValue() as any[]).map((outlet, index) =>
                    <Tag appearance="outline" shape="circular" key={index}>
                        {outlet.outletName}
                    </Tag>
                )    
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: item => item.getValue(),

        }),
        columnHelper.accessor('contactPhones', {
            header: 'Phone',
            cell: item => {
                const phones = item.getValue() as string[];
                return phones ? phones.map((phone, index) => (
                    { phone }
                )) : null; // or return an empty array or a placeholder if preferred
            }
        }),
        columnHelper.accessor('location', {
            header: 'Location',
            cell: item => {
                const location = item.getValue();
                return location ?
                    <Tag appearance="outline" shape="circular">
                        {location}
                    </Tag >
                    : null;
                }
            },
        ),
        columnHelper.accessor('requests', {
            header: 'Media Requests',
            cell: item => (
                getRequestTag(item.getValue())
            )
        }),
        columnHelper.accessor('lastActive', {
            header: 'Last Active',
            cell: item => {
                const dateValue = item.getValue();
                if (!dateValue || typeof dateValue !== "string") {
                    return "Invalid Date";
                }
                try {
                    const parsedDate = new Date(dateValue);
                    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleDateString('en-US', dateOptions);
                } catch (error) {
                    return "Invalid Date";
                }
            },
        }),
    ];
   
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: "numeric", month: "long", year: "numeric",
     /*   hour: "2-digit", minute: "2-digit"*/
    };

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

    const openDetails = (contact: MediaContact) => {
      //  console.log(JSON.stringify(contact));
        setContactDetailsOpen(true);
        setCurrentContact(contact);
    }
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
    );
}

export default ContactsTable;