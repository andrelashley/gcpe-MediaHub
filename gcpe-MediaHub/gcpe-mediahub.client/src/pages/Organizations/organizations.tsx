import { Button, TabList, Title1, Tab, Input, Tag, Drawer, DrawerBody, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, Body2 } from '@fluentui/react-components';
import { Search24Regular, Filter24Regular, Add24Regular, Important24Filled, ChevronDown16Regular } from '@fluentui/react-icons';

import React, { useState, useMemo, useEffect } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import styles from './organizations.module.css';
import NewOrganizationPage from './newOrganization';
import OrganizationDetailView from './organizationDetailView';
import { Organization } from './types';



const columnHelper = createColumnHelper<Organization>()

const columns = [
  columnHelper.accessor('name', {
  header: () => 'Name',
  cell: info => {
    const org = info.row.original;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {org.name}
        {org.isMajorMedia && (
          <div
            style={{
              backgroundColor: '#1570EF',
              borderRadius: '9999px',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            <span style={{ lineHeight: 1 }}>!</span>
          </div>
        )}
      </div>
    );
  },
  }),
  columnHelper.accessor(row => row.email, {
    id: 'email',
    cell: info => info.renderValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor('phone', {
    header: () => 'Phone',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('mediaTypes', {
    header: () => <span>Media type</span>,
    cell: info => {
    const types = info.getValue();
    const visible = types.slice(0, 2);
    const extraCount = types.length - visible.length;

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
        {visible.map((type, i) => (
          <Tag key={i} shape="circular" appearance="outline">{type}</Tag>
        ))}
        {extraCount > 0 && (
          <Tag shape="circular" appearance="outline">+{extraCount}</Tag>
        )}
      </div>
    );
  },
}),
  columnHelper.accessor('city', {
    header: 'City',
    cell: info => {
      return <Tag shape="circular" appearance="outline">{info.getValue()}</Tag>;
    },
  }),
]


const Organizations = () => {
    const [data, setData] = useState<Organization[]>([]);
    const [isOrgDetailDrawerOpen, setIsOrgDetailDrawerOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [isNewOrganizationDrawerOpen, setIsNewOrganizationDrawerOpen] = useState(false);
    const [newOrgContext, setNewOrgContext] = useState<"network" | "outlet" | null>(null);
    // Add ref and state for button width
    const [buttonWidth, setButtonWidth] = useState<number>(0);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || '/api/';
          const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;

          const response = await fetch(`${normalizedApiUrl}mediaOutlets`);
          const apiData = await response.json();

          const mapped = apiData.map((org: any) => ({
            id: org.id,
            name: org.name,
            email: org.email,
            phone: org.phoneNumber,
            mediaTypes: org.mediaTypes,
            city: org.city,
            isMajorMedia: org.isMajorMedia,
            parentId: org.parentId,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // temp client-side sort

          setData(mapped);
        } catch (err) {
          console.error('Failed to load organizations:', err);
        }
      };

      fetchOrganizations();
  }, []);

    // Effect to measure button width after render
    useEffect(() => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    }, [data]);

      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
          sorting: [
            {
              id: 'name',
              desc: false
            }
          ]
        }
      })

    return (
        <>
        
        {/* Header with title and button */}
        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '8px'}}>
            <Title1>Media organizations</Title1>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button ref={buttonRef} size="large" appearance="primary" icon={<Add24Regular />} iconPosition="before">
                  <Body2>Add organization</Body2>
                  <ChevronDown16Regular style={{ marginLeft: '8px' }} />
                </Button>
              </MenuTrigger>
              <MenuPopover style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}>
                <MenuList>
                  <MenuItem onClick={() => {
                      setNewOrgContext("outlet");
                      setIsNewOrganizationDrawerOpen(true);
                    }}>
                    Outlet
                  </MenuItem>
                  <MenuItem onClick={() => {
                      setNewOrgContext("network");
                      setIsNewOrganizationDrawerOpen(true);
                    }}>
                    Network
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>

        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <TabList selectedValue="all">
            <Tab value="all">All</Tab>
          </TabList>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Input placeholder='Search'
                   style={{width: '300px'}}
                   disabled
                   contentBefore={<Search24Regular />}
            />
            <Button 
              appearance='outline'
              disabled
              icon={<Filter24Regular />}>Filter</Button>
          </div>
        
        <Drawer
          type="overlay"
          separator
          position="end"
          open={isOrgDetailDrawerOpen}
          onOpenChange={(_, { open }) => {
              if(open) setIsOrgDetailDrawerOpen(open)
            }
          }
          style={{ width: '650px' }}>
        {selectedOrganization && (
          <DrawerBody>
            <OrganizationDetailView 
              org={selectedOrganization}
              onClose={(): void => {
                setIsOrgDetailDrawerOpen(false);   
                setSelectedOrganization(null);    
              }} />
          </DrawerBody>
        )}
        </Drawer>

        <Drawer
          type="overlay"
          separator
          position="end"
          open={isNewOrganizationDrawerOpen}
          onOpenChange={(_, { open }) => {
              if(open) setIsNewOrganizationDrawerOpen(open);
            }
          }
          style={{ width: '650px' }}
          >
            <DrawerBody>
              <NewOrganizationPage 
                onClose={() => {
                  setIsNewOrganizationDrawerOpen(false);
                }} 
                context={newOrgContext} />
            </DrawerBody>
        </Drawer>

        </div>
        
        <div className={styles.tableScrollContainer}>
          <table className={styles.organizationTable}>
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
            <tr key={row.id}
              onClick={() => {
                setSelectedOrganization(row.original);
                setIsOrgDetailDrawerOpen(true);
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
    </>
    );
}


export default Organizations;