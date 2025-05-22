import React, { useState } from "react";
import { Input, Badge, Tag, Tab, TabList, Avatar, TagGroup, Button, Title1, Divider, Drawer } from "@fluentui/react-components";
import { CalendarEmptyRegular, Filter24Regular, Search16Regular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MediaRequest } from "../../api/apiClient";
import { requestService } from "../../services/requestService";
import styles from "./requestsCardView.module.css";
import NewRequestPage from './newRequest';
import RequestDetailView from './requestDetailView';

const RequestsCardView: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MediaRequest | null>(null);

  const { data: requests = [], isLoading, error } = useQuery<MediaRequest[], Error>({
    queryKey: ["requests"],
    queryFn: requestService.getRequests,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "requestTitle",
        header: "Request Title",
      },
      {
        accessorKey: "requestedBy",
        header: "Requested By",
      },
      {
        accessorKey: "deadline",
        header: "Deadline",
        cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "leadMinistry",
        header: "Lead Ministry",
      },
      {
        accessorKey: "additionalMinistry",
        header: "Additional Ministry",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    []
  );

  const filteredRequests = React.useMemo(() => {
    if (!globalFilter) return requests;
    const filterLower = globalFilter.toLowerCase();
    return requests.filter(request =>
      request.requestTitle.toLowerCase().includes(filterLower) ||
      request.requestedBy.toLowerCase().includes(filterLower) ||
      request.leadMinistry.toLowerCase().includes(filterLower) ||
      (request.additionalMinistry && request.additionalMinistry.toLowerCase().includes(filterLower))
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading requests: {error.message}</div>;

  return (
    <div className={styles.layoutWrapper}>
      <div className={`${styles.mainContent} ${selectedRequest ? styles.mainContentWithDetail : ''}`}>
        <div className={styles.headerContainer}>
        <Title1>Media Request</Title1>
        <Button appearance="primary" onClick={() => setIsDrawerOpen(true)}>Create new</Button>
      </div>

      <div className={styles.controls}>
        <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
          <Tab value="all">All</Tab>
        </TabList>
        <div className={styles.searchAndFilterContainer}>
          <Input
            contentBefore={<Search16Regular />}
            placeholder="Search requests"
            value={globalFilter}
            onChange={(_, data) => setGlobalFilter(data.value || "")}
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
      </div>

      <div className={styles.container}>
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className={styles.card}
            onClick={() => setSelectedRequest(row.original as MediaRequest)}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>REQ-00001</span>
              <div className={styles.statusBadge}>
                <Badge shape="circular" appearance="filled">{row.getValue("status")}</Badge>
              </div>
            </div>
            <h3>{row.getValue("requestTitle")}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar name={row.getValue("requestedBy")} size={24} />
              <span>{row.getValue("requestedBy")}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarEmptyRegular />
              <span>{new Date(row.getValue("deadline")).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}</span>
            </div>
            <Divider />
            <TagGroup>
              <Tag shape="circular" appearance="outline">{row.getValue("leadMinistry")}</Tag>
              {typeof row.getValue("additionalMinistry") === "string" && (
                <Tag shape="circular" appearance="outline">{row.getValue("additionalMinistry") as string}</Tag>
              )}
            </TagGroup>
          </div>
        ))}
      </div>

      <Drawer
        type="overlay"
        separator
        position="end"
        open={isDrawerOpen}
        onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
        style={{ width: '650px' }}
      >
        <div className={styles.drawerContent}>
          <NewRequestPage onClose={() => setIsDrawerOpen(false)} />
        </div>
      </Drawer>
      </div>
      {selectedRequest && (
        <RequestDetailView
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default RequestsCardView;