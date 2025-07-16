import {
  Text,
  Tag,
  Button,
  Menu,
  MenuList,
  MenuTrigger,
  MenuPopover,
  MenuItem,
  Divider,
  Field,
  Input,
  TabList,
  Tab,
  Badge // <-- Add Badge import
} from "@fluentui/react-components";
import {
  Dismiss24Regular,
  Important16Regular,
  Globe24Regular,
  MoreHorizontal24Regular,
  Search24Regular,
  Filter24Regular,
  Add24Regular
} from "@fluentui/react-icons";
import React, { useState, useMemo, useEffect } from 'react';

import XIcon from '../../assets/icons/x.svg';
import YouTubeIcon from '../../assets/icons/youtube.svg';

import styles from './organizationDetailView.module.css';

import FieldRow from "./fieldRow";
import { Organization } from "./types";

interface OrganizationDetailViewProps {
    org: Organization
    onClose?: () => void;
}

const OrganizationDetailView: React.FC<OrganizationDetailViewProps> = ({ org, onClose }) => {
    const [selectedTab, setSelectedTab] = React.useState<"contacts" | "outlets">("contacts");

    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
            <div
                className={styles.dismissIcon}
                onClick={onClose}
                role="button"
                tabIndex={0}
                >
                <Dismiss24Regular />
            </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            gap: "1rem",
          }}>
            {/* Left side: Title + Tags */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <Text weight="semibold" size={600}>
                Global TV | BC
              </Text>
              {org.parentId == null && (
                <Badge
                  appearance="outline"
                  color="brand"
                  shape="circular"
                  size="medium"
                  style={{ fontWeight: 600, paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4 }}
                >
                  Network
                </Badge>
              )}
              {org.isMajorMedia && (
                <Badge
                  appearance="filled"
                  color="brand"
                  shape="circular"
                  size="medium"
                  icon={<Important16Regular />}
                  style={{ fontWeight: 600, paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4 }}
                >
                  Major
                </Badge>
              )}
            </div>

            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
        </div>

        <div style={{display: 'flex', flexDirection: 'column' }}>
          <Text size={300}>{org.mediaTypes.join(', ')}</Text>
          <Text size={300}>7850 Enterprise Street</Text>
        </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: '8px' }}>
  <Button
    appearance="secondary"
    icon={<Globe24Regular />}
    iconPosition="before"
    style={{ padding: "4px 16px", fontWeight: 600 }}
  >
    globaltvbc.com/
  </Button>

<Button
  appearance="secondary"
  icon={
    <div
      style={{
        backgroundColor: "#FF0000",
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 16,
        height: 16,
      }}
    >
      <img
        src={YouTubeIcon}
        alt="YouTube"
        style={{
          width: 10,
          height: 10,
          filter: "brightness(0) invert(1)",
        }}
      />
    </div>
  }
  iconPosition="before"
  style={{ padding: "4px 16px", fontWeight: 600 }}
>
  @GlobalTV
</Button>


  <Button
    appearance="secondary"
    icon={
      <img
        src={XIcon}
        alt="X"
        style={{
          width: 16,
          height: 16,
          objectFit: "contain",
          filter: "grayscale(1) brightness(0)",
          borderRadius: 4,
        }}
      />
    }
    iconPosition="before"
    style={{ padding: "4px 16px", fontWeight: 600 }}
  >
    @GlobalTV
  </Button>
</div>


      <Divider style={{ margin: '24px 0 16px 0' }} />

      <Text size={300} style={{marginBottom: '0.5rem'}}>
        General Contact info
      </Text>

      <FieldRow label="Email">
        <Field>
          <Input defaultValue="tips@globaltvbc.com" />
        </Field>
      </FieldRow>

      <FieldRow label="News desk">
        <Field>
          <Input defaultValue="604-422-6416" />
        </Field>
      </FieldRow>

      <FieldRow label="After hours">
        <Field>
          <Input defaultValue="604-422-6494" />
        </Field>
      </FieldRow>

      <Divider style={{ margin: '24px 0 16px 0' }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "1rem",
        }}
      >
        {/* Left: Tabs */}
        <TabList 
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value as "contacts" | "outlets")}>
            <Tab value="contacts">Contacts</Tab>
            <Tab value="outlets">Outlets</Tab>
        </TabList>

        {/* Right: Search + Add grouped */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Input placeholder="Search" contentBefore={<Search24Regular />} disabled />
          <Button appearance="primary" icon={<Add24Regular />} disabled>
            Add
          </Button>
        </div>
      </div>

      {selectedTab === "contacts" && (
      <>
      <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Text size={400} weight="semibold">Richard Zussman</Text>
            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Reporter</Text>
          </div>

          <div>
            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <FieldRow label="Email">
          <Field>
            <Input defaultValue="richard.zussman@globalnews.ca" />
          </Field>
        </FieldRow>

        <FieldRow label="Mobile">
          <Field>
            <Input defaultValue="250-216-7328" />
          </Field>
        </FieldRow>

        <FieldRow label="After hours">
          <Field>
            <Input defaultValue="778-333-0567" />
          </Field>
        </FieldRow>
      </div>

      <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Text size={400} weight="semibold">Keith Baldrey</Text>
            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Reporter</Text>
          </div>

          <div>
            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <FieldRow label="Email">
          <Field>
            <Input defaultValue="keith.baldrey@globalnews.ca" />
          </Field>
        </FieldRow>

        <FieldRow label="Mobile">
          <Field>
            <Input defaultValue="250-360-7658" />
          </Field>
        </FieldRow>

        <FieldRow label="After hours">
          <Field>
            <Input defaultValue="250-387-1572" />
          </Field>
        </FieldRow>
      </div>
        
        </>
      )}

       {selectedTab === "outlets" && (
      <>
        <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Text size={400} weight="semibold">Global TV</Text>
            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Online</Text>
          </div>

          <div>
            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <FieldRow label="Email">
          <Field>
            <Input defaultValue="jane.smith@cbc.ca" />
          </Field>
        </FieldRow>

        <FieldRow label="Mobile">
          <Field>
            <Input defaultValue="604-555-5555" />
          </Field>
        </FieldRow>

        <FieldRow label="After hours">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>

        <FieldRow label="Fax">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>
      </div>

      <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Text size={400} weight="semibold">Global TV</Text>
            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Online</Text>
          </div>

          <div>
            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <FieldRow label="Email">
          <Field>
            <Input defaultValue="jane.smith@cbc.ca" />
          </Field>
        </FieldRow>

        <FieldRow label="Mobile">
          <Field>
            <Input defaultValue="604-555-5555" />
          </Field>
        </FieldRow>

        <FieldRow label="After hours">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>

        <FieldRow label="Fax">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>
      </div>

      <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Text size={400} weight="semibold">Global TV</Text>
            <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Online</Text>
          </div>

          <div>
            {/* Right side: Menu */}
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <FieldRow label="Email">
          <Field>
            <Input defaultValue="jane.smith@cbc.ca" />
          </Field>
        </FieldRow>

        <FieldRow label="Mobile">
          <Field>
            <Input defaultValue="604-555-5555" />
          </Field>
        </FieldRow>

        <FieldRow label="After hours">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>

        <FieldRow label="Fax">
          <Field>
            <Input defaultValue="604-555-5555 ext. 555" />
          </Field>
        </FieldRow>
      </div>
            
        <div style={{border: '1px solid #ccc', paddingLeft: '8px', paddingRight: '8px', paddingTop: '1rem',  borderRadius: '4px', marginBottom: '1.25rem'}}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.5rem'}}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <Text size={400} weight="semibold">Global TV</Text>
              <Text size={300} style={{ color: 'var(--colorNeutralForeground2)' }}>Online</Text>
            </div>

            <div>
              {/* Right side: Menu */}
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button appearance="transparent" icon={<MoreHorizontal24Regular />} />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
          </div>

          <FieldRow label="Email">
            <Field>
              <Input defaultValue="jane.smith@cbc.ca" />
            </Field>
          </FieldRow>

          <FieldRow label="Mobile">
            <Field>
              <Input defaultValue="604-555-5555" />
            </Field>
          </FieldRow>

          <FieldRow label="After hours">
            <Field>
              <Input defaultValue="604-555-5555 ext. 555" />
            </Field>
          </FieldRow>

          <FieldRow label="Fax">
            <Field>
              <Input defaultValue="604-555-5555 ext. 555" />
            </Field>
          </FieldRow>
        </div>
        </>
      )}

    </div>
    );
};

export default OrganizationDetailView;