import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Title1, Input, Button, TabList, Tab, Tag, Avatar, Link, Drawer } from '@fluentui/react-components';
import { PressGalleryBadge } from '../../components/PressGalleryBadge';
import { Search16Regular, Filter24Regular, Add24Regular } from '@fluentui/react-icons';
import { MediaRequest } from '../../api/generated-client/model';
import { RequestStatus, Ministry } from './types';
import { requestService } from '../../services/requestService';
import RequestDetailView from './requestDetailView';
import NewRequestPage from './newRequest';
import styles from './requests.module.css';

const columnHelper = createColumnHelper<MediaRequest>();

const columns = [
    columnHelper.accessor('requestTitle', {
        header: () => 'Request Title',
        cell: info => info.getValue(),
        size: 400,
        minSize: 300,
        maxSize: 600,
    }),
    columnHelper.accessor('deadline', {
        header: () => 'Deadline',
        cell: info => new Date(info.getValue() || "1970-01-01").toLocaleDateString(),
        size: 120,
    }),
    columnHelper.accessor('requestStatus', {
        header: () => 'Status',
        cell: info => (
            <Tag shape="circular" appearance="outline">
                {info.getValue()?.name || info.row.original.requestStatusId || "Unknown"}
            </Tag>
        ),
        size: 80,
    }),
    columnHelper.accessor('requestorContact', {
        header: () => 'Requested By',
        cell: info => {
            const contact = info.getValue();
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{contact?.firstName} {contact?.lastName}</span>
                </div>
            );
        },
        size: 150,
    }),
    columnHelper.accessor('leadMinistry', {
        header: () => 'Lead Ministry',
        cell: info => (
            <Tag shape="circular" appearance="outline">
                {info.getValue()?.acronym || 'Unknown'}
            </Tag>
        ),
        size: 100,
    }),
    columnHelper.accessor('additionalMinistries', {
        header: () => 'Additional Ministry',
        cell: info => (
            info.getValue()?.[0]?.acronym
                ? <Tag shape="circular" appearance="outline">{info.getValue()[0].acronym}</Tag>
                : null
        ),
        size: 100,
    }),
    columnHelper.accessor('requestorOutlet', {
        header: () => 'Outlet',
        cell: info => info.getValue()?.outletName || 'Unknown',
        size: 120,
    }),
];

const RequestsPage: React.FC = () => {
    // Removed unused navigate
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const [selectedRequest, setSelectedRequest] = useState<MediaRequest | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data: requests = [], isLoading, error } = useQuery<MediaRequest[], Error>({
        queryKey: ['requests'],
        queryFn: requestService.getRequests,
    });

    const filteredRequests = useMemo(() => {
        if (!searchQuery.trim()) {
            return requests;
        }
        const query = searchQuery.toLowerCase();
        return requests.filter((request) => {
            const searchableFields = [
                request.requestTitle,
                `${request.requestorContact?.firstName ?? ""} ${request.requestorContact?.lastName ?? ""}`,
                request.leadMinistry?.acronym ?? "",
                request.additionalMinistries?.[0]?.acronym ?? "",
                request.requestStatus?.name ?? request.requestStatusId ?? "",
                request.requestorOutlet?.outletName ?? "",
                new Date(request.deadline ?? "").toLocaleDateString()
            ];
            return searchableFields.some(field =>
                String(field).toLowerCase().includes(query)
            );
        });
    }, [requests, searchQuery]);

    const table = useReactTable({
        data: filteredRequests,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const [isNewRequestDrawerOpen, setIsNewRequestDrawerOpen] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading requests: {error.message}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title1>Requests</Title1>
                <Button
                    icon={<Add24Regular />}
                    appearance="primary"
                    onClick={() => setIsNewRequestDrawerOpen(true)}
                >
                    Create
                </Button>
            </div>

            <div className={styles.controls}>
                <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
                    <Tab value="all">All</Tab>
                </TabList>
                <div className={styles.searchAndFilterContainer}>
                    <Input
                        contentBefore={<Search16Regular />}
                        placeholder="Search requests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <Button
                        icon={<Filter24Regular />}
                        appearance="outline"
                        className={styles.filterButton}
                    >
                        Filter
                    </Button>
                </div>
    
                <Drawer
                    type="overlay"
                    separator
                    position="end"
                    open={isDrawerOpen}
                    onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
                    style={{ width: '650px' }}
                >
                    {selectedRequest && (
                        <RequestDetailView
                            request={selectedRequest}
                            onClose={() => {
                                setIsDrawerOpen(false);
                                setSelectedRequest(null);
                            }}
                        />
                    )}
                </Drawer>
    
                <Drawer
                    type="overlay"
                    separator
                    position="end"
                    open={isNewRequestDrawerOpen}
                    onOpenChange={(_, { open }) => setIsNewRequestDrawerOpen(open)}
                    style={{ width: '650px' }}
                >
                    <NewRequestPage onClose={() => setIsNewRequestDrawerOpen(false)} />
                </Drawer>
            </div>

            <div>
                <table className={styles.requestTable}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
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
                                onClick={() => {
                                    setSelectedRequest(row.original);
                                    setIsDrawerOpen(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.paginationControls}>
                {table.getCanPreviousPage() ? (
                    <Link onClick={() => table.previousPage()} className={styles.paginationLink}>
                        {"< Prev"}
                    </Link>
                ) : (
                    <span className={styles.paginationLinkDisabled}>{"< Prev"}</span>
                )}

                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(page => (
                    <Link
                        key={page}
                        onClick={() => table.setPageIndex(page - 1)}
                        className={table.getState().pagination.pageIndex === page - 1 ? styles.activePage : styles.pageLink}
                        style={{ padding: "0 4px", cursor: "pointer" }}
                    >
                        {page}
                    </Link>
                ))}

                {table.getCanNextPage() ? (
                    <Link onClick={() => table.nextPage()} className={styles.paginationLink}>
                        {"Next >"}
                    </Link>
                ) : (
                    <span className={styles.paginationLinkDisabled}>{"Next >"}</span>
                )}
            </div>
        </div>
    );
};

export default RequestsPage;
