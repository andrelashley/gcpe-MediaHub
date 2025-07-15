import React, { useState } from "react";
import { Input, 
  Badge, 
  Tag, 
  Tab, 
  TabList, 
  Avatar, 
  TagGroup, 
  Button, 
  Title1, 
  Divider, 
  Drawer, 
  DrawerHeader, 
  DrawerHeaderTitle, 
  DrawerBody, 
  Body1Stronger, 
  Caption1,
  Body2 } from "@fluentui/react-components";
import { CalendarEmpty16Regular, Filter24Regular, Search16Regular, Dismiss24Regular, Add24Regular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MediaRequest } from "../../api/generated-client/model";
import { requestService } from "../../services/requestService";
import type { RequestDto } from "../../api/generated-client/model";
import styles from "./requestsCardView.module.css";
import NewRequestPage from './newRequest';
import RequestDetailView from './requestDetailView';
import RequestStatusBadge from "../../components/RequestStatusBadge";
import { useLocation, useNavigate, matchPath } from 'react-router-dom';

const RequestsCardView: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  // Detect if the new request drawer should be open
  const isNewDrawerOpen = location.pathname.endsWith('/new');
  // Detect if the detail drawer should be open and extract the requestNo
  const detailMatch = matchPath('/requests/:requestNo', location.pathname);
  const isDetailDrawerOpen = Boolean(detailMatch && detailMatch.params && detailMatch.params.requestNo);
  const detailRequestNo = detailMatch?.params?.requestNo || null;

  const { data: requests = [], isLoading, error, refetch } = useQuery<RequestDto[], Error>({
    queryKey: ["requests"],
    queryFn: async () => {
      return await requestService.getRequestDtos();
    },
  });

  // Debug: log the loaded requests to inspect requestStatus
  React.useEffect(() => {
    if (requests.length > 0) {
      console.log("Loaded requests:", requests);
    }
  }, [requests]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "requestTitle",
        header: "Request Title",
      },
      {
        accessorKey: "requestorContact",
        header: "Requested By",
        cell: (info: any) => {
          const row = info.row.original as RequestDto;
          return `${row.requestorContactFirstName} ${row.requestorContactLastName}`;
        }
      },
      {
        accessorKey: "deadline",
        header: "Deadline",
        cell: (info: any) => {
          const dateValue = info.getValue();
          if (!dateValue) return "Invalid Date";
          try {
            const parsedDate = new Date(dateValue);
            return isNaN(parsedDate.getTime()) 
              ? "Invalid Date" 
              : parsedDate.toLocaleDateString();
          } catch (error) {
            return "Invalid Date";
          }
        },
      },
      {
        accessorKey: "leadMinistry",
        header: "Lead Ministry",
        cell: (info: any) => {
          const row = info.row.original as RequestDto;
          return row.leadMinistryAbbr;
        }
      },
      {
        accessorKey: "additionalMinistriesAbbr",
        header: "Additional Ministry",
        cell: (info: any) => {
          const row = info.row.original as RequestDto;
          return row.additionalMinistriesAbbr?.join(", ");
        }
      },
      {
        accessorKey: "requestorOutlet",
        header: "Outlet",
        cell: (info: any) => info.getValue()?.outletName || 'Unknown'
      },
      {
        accessorKey: "requestStatus",
        header: "Status",
        cell: (info: any) => (
          <RequestStatusBadge status={info.row.original.requestStatus || 'Unknown'} />
        )
      },
    ],
    []
  );

  const filteredRequests = React.useMemo(() => {
    if (!globalFilter) return requests;
    const filterLower = globalFilter.toLowerCase();
    return requests.filter(request =>
      request.requestTitle?.toLowerCase().includes(filterLower) ||
      (`${request.requestorContactFirstName} ${request.requestorContactLastName}`.toLowerCase().includes(filterLower)) ||
      (request.leadMinistryAbbr?.toLowerCase().includes(filterLower)) ||
      (request.additionalMinistriesAbbr?.join(",").toLowerCase().includes(filterLower))
    );
  }, [requests, globalFilter]);

  const table = useReactTable({
    data: filteredRequests,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  // Handler for closing the new request drawer and refreshing the list
  const handleCloseNewRequest = () => {
    refetch();
  };

  const getAssignedUserInitials = (fullName?: string) => {
    if (!fullName || !fullName.trim()) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] || '') + (parts[1][0] || '');
    } else if (parts.length === 1 && parts[0].length > 0) {
      return parts[0][0];
    }
    return '';
  };

  //if (isLoading) return <div>Loading...</div>;
  //if (error) return <div>Error loading requests: {error.message}</div>;

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.mainContent} style={{ display: 'flex', height: 'calc(100vh - 200px)' }}>
        <div
          style={{
            width: !isNewDrawerOpen && isDetailDrawerOpen ? '50%' : '100%',
            overflowY: 'auto',
            maxHeight: '100%',
        /*    padding: '20px',*/
            transition: 'width 0.3s',
          }}
        >
          <div className={styles.headerContainer}>
            <Title1>Media requests</Title1>
            <Button appearance="primary" size="large" onClick={() => navigate('/requests/new')} icon={<Add24Regular />}><Body2>Add request</Body2></Button>
          </div>

          <div className={styles.controls}>
            <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
              <Tab value="all">All</Tab>
            </TabList>
            <div className={styles.searchAndFilterContainer}>
              <Input
                contentBefore={<Search16Regular />}
                placeholder="Search"
                value={globalFilter}
                onChange={(_, data) => setGlobalFilter(data.value || "")}
                className={styles.searchInput}
              />
              <Button
                icon={<Filter24Regular />}
                appearance="outline"
                className={styles.filterButton}
                disabled
              >
                Filter
              </Button>
            </div>
          </div>

          <div className={styles.container}>
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className={`${styles.card} ${detailRequestNo === String(row.original.requestNo) ? styles.selectedCard : ''}`}
                onClick={() => navigate(`/requests/${row.original.requestNo}`)}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Caption1>{`REQ-${row.original.requestNo}`}</Caption1>
                    <div className={styles.statusBadge}>
                      <RequestStatusBadge status={row.original.requestStatus || "Unknown"} />
                    </div>
                  </div>
                  <Body1Stronger>{row.original.requestTitle}</Body1Stronger>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag shape="circular" size="small" media={
                      <Avatar
                        name={`${row.original.requestorContactFirstName} ${row.original.requestorContactLastName}`}
                        size={24}
                      />
                    }>
                      {row.original.requestorContactFirstName} {row.original.requestorContactLastName}
                    </Tag>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag appearance="filled" size="small">
                      <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                        <CalendarEmpty16Regular style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      </span>
                      {row.original.deadline
                        ? new Date(row.original.deadline).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })
                        : "No deadline"
                      }
                    </Tag>
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TagGroup className={styles.ministryTags}>
                      {row.original.leadMinistryAbbr && (
                        <Tag shape="circular" appearance="filled" size="small" style={{ height: 24, display: 'flex', alignItems: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', height: '100%' }}>
                            {row.original.leadMinistryAbbr}
                          </span>
                        </Tag>
                      )}
                      {row.original.additionalMinistriesAbbr?.length > 0 && (
                        <Tag shape="circular" appearance="outline" size="small" style={{ height: 24, display: 'flex', alignItems: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', height: '100%' }}>
                            {row.original.additionalMinistriesAbbr[0]}
                          </span>
                        </Tag>
                      )}
                    </TagGroup>
                    {row.original.assignedToFullName && (
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '8px' }}>
                        <Avatar
                          name={row.original.assignedToFullName}
                          size={24}
                          initials={getAssignedUserInitials(row.original.assignedToFullName)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Drawer (route-driven, inline) */}
        {isDetailDrawerOpen && !isNewDrawerOpen && (
          <Drawer
            type="inline"
            separator
            position="end"
            open={isDetailDrawerOpen}
            onOpenChange={(_, { open }) => {
              if (!open) navigate('/requests');
            }}
            style={{ width: '50%', minWidth: 0, transition: 'width 0.3s' }}
          >
            <div className={styles.drawerContent}>
              <RequestDetailView
                requestNo={detailRequestNo ? Number(detailRequestNo) : undefined}
                onClose={() => navigate('/requests')}
              />
            </div>
          </Drawer>
        )}
      </div>

      {/* New Request Drawer (regular overlay, with header and close button) */}
      <Drawer
        type="overlay"
        separator
        position="end"
        open={isNewDrawerOpen}
        onOpenChange={(_, { open }) => {
          if (!open) navigate('/requests');
        }}
        style={{ width: '650px' }}
      >
        <DrawerBody>
          <NewRequestPage onClose={() => {
            navigate('/requests');
          }} />
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export default RequestsCardView;