import { 
    Title1,
    Title2,
    Title3,
    Field, 
    Dropdown, 
    Input, 
    Checkbox,
    Divider, 
    Button } from '@fluentui/react-components';
import { Dismiss24Regular, Add24Regular } from '@fluentui/react-icons';

import styles from './newOrganization.module.css';

interface NewOrganizationPageProps {
    onClose?: () => void;
}

const NewOrganizationPage: React.FC<NewOrganizationPageProps> = ({ onClose }) => {
    return(
        <div className={styles.container}>
        
        <div className={styles.titleContainer}>
            <Title1>New organization</Title1>
            <div
                className={styles.dismissIcon}
                onClick={onClose}
                role="button"
                tabIndex={0}
                >
                <Dismiss24Regular />
            </div>
        </div>
        <div className={styles.form}>
            <Field
                label="Media organization type"
                required
                >
                <Dropdown
                placeholder='Select a media organization type'
                >
                </Dropdown>
            </Field>

             <Field
                label="Media type"
                required
                >
                <Dropdown
                >
                </Dropdown>
            </Field>

            <Field
                label="Name"
                required>        
            <Input
                placeholder=""  
            />
            </Field>

            <Checkbox
                label="Major Media"
            />

            <Field
                label="Network"
            >
                <Dropdown>
                </Dropdown>
            </Field>

            
            <Field
                label="Language"
            >
                <Dropdown>
                </Dropdown>
            </Field>

            <Divider style={{ margin: '24px 0 16px 0' }} />
            <Title3>Contact Information</Title3>

             <Field
                label="Email">        
                <Input
                    placeholder=""  
                />
            </Field>

<Field label="Phone number">
  <div
    style={{
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'nowrap',
      alignItems: 'center',
      marginBottom: '0.5rem',
    }}
  >
    <Dropdown
      placeholder="Select"
      appearance="outline"
      style={{ flex: '0 0 120px', minWidth: 0 }}
    />
    <Input
      placeholder="+1"
      appearance="outline"
      style={{ flex: '1 1 auto', minWidth: 0 }}
    />
  </div>
</Field>

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    appearance="transparent"
    icon={<Add24Regular />}
    onClick={() => {
      // Add logic
    }}
  >
    Phone number
  </Button>
</div>
            <Divider style={{ margin: '24px 0 16px 0' }} />
            <Title3>Online presence</Title3>


<Field
                label="Website">        
                <Input
                    placeholder="http://"  
                />
            </Field>

            <Field label="Social Media">
  <div
    style={{
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'nowrap',
      alignItems: 'center',
      marginBottom: '0.5rem',
    }}
  >
    <Dropdown
      placeholder="Select"
      appearance="outline"
      style={{ flex: '0 0 120px', minWidth: 0 }}
    />
    <Input
      placeholder="http://"
      appearance="outline"
      style={{ flex: '1 1 auto', minWidth: 0 }}
    />
  </div>
</Field>

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    appearance="transparent"
    icon={<Add24Regular />}
    onClick={() => {
      // Add logic
    }}
  >
    Social Media
  </Button>
</div>


            <Divider style={{ margin: '24px 0 16px 0' }} />
            <Title3>Address</Title3>

                <Checkbox
                    label="No Physical Address"
                />


                <Field
                    label="Street">        
                    <Input
                        placeholder=""  
                    />
                </Field>

                <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '1rem',
  }}
>
  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
    <Field label="City" required>
      <Input />
    </Field>
  </div>

  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
    <Field label="Province">
      <Dropdown placeholder="Select" />
    </Field>
  </div>

  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
    <Field label="Country" required>
      <Dropdown defaultValue="Canada" />
    </Field>
  </div>

  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
    <Field label="Postal code">
      <Input />
    </Field>
  </div>
</div>


          <div
  style={{
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-start', // or 'flex-end' if you want right-aligned
    marginTop: '2rem',
  }}
>
  <Button appearance="primary" type="submit">
    Save
  </Button>
  <Button appearance="secondary">
    Cancel
  </Button>
</div>

            </div>
        </div>
    );
}

export default NewOrganizationPage;