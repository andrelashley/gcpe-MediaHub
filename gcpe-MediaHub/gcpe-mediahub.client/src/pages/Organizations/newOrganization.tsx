import {Title1, Title3, Field, Dropdown, Option, Input, Checkbox, Divider, Button} from '@fluentui/react-components';
import {Dismiss24Regular, Add24Regular} from '@fluentui/react-icons';
import {useToastController, Toaster, Toast, ToastTitle, ToastBody} from '@fluentui/react-components';
import styles from './newOrganization.module.css';
import React from 'react';
import {useState} from 'react';

interface NewOrganizationPageProps {
    onClose?: () => void;
}

const NewOrganizationPage: React.FC<NewOrganizationPageProps> = ({ onClose }) => {
    const { dispatchToast } = useToastController();

    const [name, setName] = useState("");
    const [orgType, setOrgType] = useState("");
    const [mediaType, setMediaType] = useState<string[]>([]);
    const [language, setLanguage] = useState("");
    const [isMajorMedia, setIsMajorMedia] = useState(false);
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([
      { type: '', number: '' }
    ]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([
      { type: '', url: '' } // Start with one blank input
    ]);
    const [hasNoPhysicalAddress, setHasNoPhysicalAddress] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const orgTypeOptions = [
      "Network",
      "Outlet",
    ];

    const mediaTypeOptions = [
      "Radio",
      "TV",
    ];

    const languageTypeOptions = [
      "English",
      "French",
      "Spanish"
    ];

    const phoneTypeOptions = [
      "News Desk",
      "General",
      "Fax",
      "After hours",
      "Other"
    ];

    const socialMediaTypeOptions = [
      "LinkedIn",
      "X",
      "Facebook"
    ];

    const provinceOptions = [
      "BC",
      "AB",
    ];

    const countryOptions = [
      "Canada",
    ];


const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Saving name:", name);
    console.log("Saving org type:", orgType);
    console.log("Saving media type:", mediaType.join(", "));
    console.log("Major media selected:", isMajorMedia);
    console.log("Language selected:", language);
    console.log("Email selected:", email);
    console.log("Phone Numbers selected:", phoneNumbers);
    console.log("Website selected:", website);
    console.log("Social Media links selected:", socialMediaLinks);
    console.log("No physical address selected:", hasNoPhysicalAddress);
    console.log("Street selected:", street);
    console.log("City selected:", city);
    console.log("Province selected:", province);
    console.log("Country selected:", country);
    console.log("Postal code selected:", postalCode);
  };

  
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
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.form}>
              <Field label="Media organization type" required>
                  <Dropdown placeholder='Select a media organization type'
                    value={orgType}
                    onOptionSelect={(_, data) => setOrgType(data.optionText || "")}>
                    {orgTypeOptions.map((option) => (
                    <Option key={option}>
                      {option}
                    </Option>
                  ))}
                  </Dropdown>
              </Field>

              <Field label="Media type" required>
                <Dropdown
                  multiselect
                  selectedOptions={mediaType}
                  onOptionSelect={(_, data) => {
                    if (!data.optionValue) return;

                    setMediaType((prev) =>
                      prev.includes(data.optionValue)
                        ? prev.filter((item) => item !== data.optionValue)
                        : [...prev, data.optionValue]
                    );
                  }}
                >
                  {mediaTypeOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Dropdown>
              </Field>

              <Field label="Name" required>        
                <Input placeholder="" value={name} onChange={(_, data) => setName(data.value)}  />
              </Field>

              <Checkbox
                label="Major Media"
                checked={isMajorMedia}
                onChange={(_, data) => setIsMajorMedia(data.checked === true)}
              />

              <Field label="Network">
                <Dropdown>
                </Dropdown>
              </Field>

              
              <Field label="Language">
                  <Dropdown
                    value={language}
                    onOptionSelect={(_, data) => setLanguage(data.optionText || "")}>
                    {languageTypeOptions.map((option) => (
                    <Option key={option}>
                      {option}
                    </Option>
                  ))}
                  </Dropdown>
              </Field>

              <Divider style={{ margin: '24px 0 16px 0' }} />
              <Title3>Contact Information</Title3>

              <Field label="Email">        
                  <Input value={email} onChange={(_, data) => setEmail(data.value)} placeholder=""  />
              </Field>

              {phoneNumbers.map((entry, index) => (
                <div
                  key={index}
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
                    value={entry.type}
                    onOptionSelect={(_, data) => {
                      const updated = [...phoneNumbers];
                      updated[index].type = data.optionValue || '';
                      setPhoneNumbers(updated);
                    }}
                  >
                    {phoneTypeOptions.map((option) => (
                      <Option key={option}>{option}</Option>
                    ))}
                  </Dropdown>

                  <Input
                    placeholder="+1"
                    appearance="outline"
                    value={entry.number}
                    onChange={(_, data) => {
                      const updated = [...phoneNumbers];
                      updated[index].number = data.value;
                      setPhoneNumbers(updated);
                    }}
                    style={{ flex: '1 1 auto', minWidth: 0 }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  appearance="transparent"
                  icon={<Add24Regular />}
                  onClick={() =>
                    setPhoneNumbers([...phoneNumbers, { type: '', number: '' }])
                  }>
                  Phone number
                </Button>
              </div>

              <Divider style={{ margin: '24px 0 16px 0' }} />
              <Title3>Online presence</Title3>

              <Field label="Website">        
                <Input placeholder="http://" value={website} onChange={(_, data) => setWebsite(data.value)} />
              </Field>

              {socialMediaLinks.map((entry, index) => (
                <Field key={index} label={index === 0 ? "Social Media" : ""}>
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
                      value={entry.type}
                      onOptionSelect={(_, data) => {
                        const updated = [...socialMediaLinks];
                        updated[index].type = data.optionValue || '';
                        setSocialMediaLinks(updated);
                      }}
                    >
                      {socialMediaTypeOptions.map((option) => (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      ))}
                    </Dropdown>

                    <Input
                      placeholder="http://"
                      appearance="outline"
                      value={entry.url}
                      onChange={(_, data) => {
                        const updated = [...socialMediaLinks];
                        updated[index].url = data.value;
                        setSocialMediaLinks(updated);
                      }}
                      style={{ flex: '1 1 auto', minWidth: 0 }}
                    />
                  </div>
                </Field>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  appearance="transparent"
                  icon={<Add24Regular />}
                  onClick={() =>
                    setSocialMediaLinks([...socialMediaLinks, { type: '', url: '' }])
                  }
                >
                  Social Media
                </Button>
              </div>

              <Divider style={{ margin: '24px 0 16px 0' }} />
              <Title3>Address</Title3>

              <Checkbox
                label="No Physical Address"
                checked={hasNoPhysicalAddress}
                onChange={(_, data) => setHasNoPhysicalAddress(data.checked === true)}/>

              {!hasNoPhysicalAddress && (
              <>
                <Field label="Street">        
                  <Input value={street} onChange={(_, data) => setStreet(data.value)} /> 
                </Field> 
                    
                    
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginTop: '1rem',
                  }}>
                    <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                      <Field label="City" required>
                        <Input value={city} onChange={(_, data) => setCity(data.value)} />
                      </Field>
                  </div>

                  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                    <Field label="Province">
                      <Dropdown 
                        placeholder="Select"
                        value={province}
                        onOptionSelect={(_, data) => setProvince(data.optionText || "")}>
                          {provinceOptions.map((option) => (
                            <Option key={option}>
                              {option}
                            </Option>
                          ))}
                      </Dropdown>
                    </Field>
                  </div>

                  <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                    <Field label="Country" required>
                      <Dropdown
                        defaultValue="Canada"
                        value={country}
                        onOptionSelect={(_, data) => setCountry(data.optionText || "")}>
                        {countryOptions.map((option) => (
                            <Option key={option}>
                              {option}
                            </Option>
                          ))}
                        </Dropdown>
                    </Field>
                  </div>

                <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                  <Field label="Postal code">
                    <Input value={postalCode} onChange={(_, data) => setPostalCode(data.value)} />
                  </Field>
                </div>
              </div>
              </>
            )}

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-start',
              marginTop: '2rem',
          }}>
            <Button appearance="primary" type="submit" onClick={handleSave}>Save</Button>
            <Button appearance="secondary">Cancel</Button>
          </div>

            </div>
          </form>
      </div>
    );
}

export default NewOrganizationPage;