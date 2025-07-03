import { Button, TabList, Title1, Tab, Input, Tag, Drawer, DrawerBody, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';
import { Search24Regular, Filter24Regular, Add24Regular, Important24Filled } from '@fluentui/react-icons';

import React, { useState, useMemo, useEffect } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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
    header: () => <span>Media Type</span>,
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
    
    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}mediaOutlets`);
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
          }));

          setData(mapped);
        } catch (err) {
          console.error('Failed to load organizations:', err);
        }
      };

      fetchOrganizations();
  }, []);

      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return (
        <>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <Title1>Media Organizations</Title1>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="primary" icon={<Add24Regular />} iconPosition="before">
                  Organization
                </Button>
              </MenuTrigger>
              <MenuPopover>
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

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
          <TabList selectedValue="all">
            <Tab value="all">All</Tab>
          </TabList>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Input placeholder='Search'
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
          onOpenChange={(_, { open }) => setIsOrgDetailDrawerOpen(open)}
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
          onOpenChange={(_, { open }) => setIsNewOrganizationDrawerOpen(open)}
          style={{ width: '650px' }}
          >
            <DrawerBody>
              <NewOrganizationPage 
                onClose={() => setIsNewOrganizationDrawerOpen(false)} 
                context={newOrgContext} />
            </DrawerBody>
        </Drawer>

        </div>

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
        </>
    );
}


export default Organizations;