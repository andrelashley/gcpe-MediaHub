import { Button, TabList, Title1, Tab, Input, Tag, Drawer, DrawerBody } from '@fluentui/react-components';
import { Search24Regular, Filter24Regular, Add24Regular } from '@fluentui/react-icons';

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
import { Outlet } from '../../models/Outlet';

type Organization = {
  name: string
  email: string
  phone: string
  mediaType: string
  city: string
}

const defaultData: Organization[] = [
  {
    name: 'Castanet',
    email: 'news@castanet.net',
    phone: '604-605-2000',
    mediaType: 'Online',
    city: 'Vancouver',
  },
  {
    name: 'Castlegar Source',
    email: 'info@castlegarsource.com',
    phone: '250-599-6962',
    mediaType: 'Online',
    city: 'Vancouver',
  },
  {
    name: 'CBC',
    email: 'news@cbc.ca',
    phone: '416-384-5000',
    mediaType: 'TV, Radio, +2',
    city: 'Toronto',
  },
  {
    name: 'CBC Kamloops',
    email: 'cbcnewskamloops@cbc.ca',
    phone: '236-605-2020',
    mediaType: 'TV, Radio',
    city: 'Kamloops',
  },
  {
    name: 'CBC Kelowna',
    email: 'cbcnewskelowna@cbc.ca',
    phone: '672-555-5678',
    mediaType: 'TV, Radio',
    city: 'Kelowna',
  },
  {
    name: 'CBC Toronto',
    email: 'cbcnewstoronto@cbc.ca',
    phone: '416-545-1234',
    mediaType: 'TV, Radio, Online',
    city: 'Toronto',
  },
  {
    name: 'CBC Vancouver',
    email: 'cbcnewsvancouver@cbc.ca',
    phone: '778-545-1234',
    mediaType: 'TV, Radio',
    city: 'Vancouver',
  },
  {
    name: 'CBS',
    email: 'news@cbs.com',
    phone: '+1-718-545-1234',
    mediaType: 'TV, Radio, +2',
    city: 'New York',
  },
  {
    name: 'CFAX 1070',
    email: 'cfax.news@bellmedia.ca',
    phone: '236-605-2020',
    mediaType: 'Radio',
    city: 'Victoria',
  },
  {
    name: 'CFB Esquimalt',
    email: '',
    phone: '250-555-5678',
    mediaType: 'Radio',
    city: 'Kelowna',
  }
];

const columnHelper = createColumnHelper<Organization>()

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.getValue(),
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
  columnHelper.accessor('mediaType', {
    header: () => <span>Media Type</span>,
    cell: info => {
      return <Tag shape="circular" appearance="outline">{info.getValue()}</Tag>;
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
    const [data, _setData] = React.useState(() => [...defaultData]);
    const [isOrgDetailDrawerOpen, setIsOrgDetailDrawerOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
    const [isNewOrganizationDrawerOpen, setIsNewOrganizationDrawerOpen] = useState(false);
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        const fetchOutlets = async () => {
        const response = await fetch(`${apiUrl}mediaOutlets`);
        const data = await response.json();
        console.log(data);
        setOutlets(data);
      }

      fetchOutlets();
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
            <Button
                icon={<Add24Regular />}
                appearance="primary"
                onClick={() => setIsNewOrganizationDrawerOpen(true)}>
                Organization
            </Button>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
          <TabList selectedValue="all">
            <Tab value="all">All</Tab>
          </TabList>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Input placeholder='Search'
                   contentBefore={<Search24Regular />}
            />
            <Button 
              appearance='outline' 
              icon={<Filter24Regular />}>Filter</Button>
          </div>
        

        <Drawer
        type="overlay"
        separator
        position="end"
        open={isOrgDetailDrawerOpen}
        onOpenChange={(_, { open }) => setIsOrgDetailDrawerOpen(open)}
        style={{ width: '650px' }}
        >
        {selectedOrganization && (
          <DrawerBody>
            <OrganizationDetailView onClose={(): void => {
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
              <NewOrganizationPage onClose={() => setIsNewOrganizationDrawerOpen(false)} />
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