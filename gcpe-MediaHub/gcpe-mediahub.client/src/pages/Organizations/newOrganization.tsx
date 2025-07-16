import {Title1, Field, Dropdown, Option, Input, Checkbox, Divider, Button, Body2} from '@fluentui/react-components';
import {Dismiss24Regular, Add24Regular} from '@fluentui/react-icons';
import { useToastController, Toaster, Toast, ToastTitle, ToastBody } from '@fluentui/react-components';
import styles from './newOrganization.module.css';
import React, { useState, useMemo, useEffect } from 'react';

interface NewOrganizationPageProps {
    onClose?: () => void;
    context: "network" | "outlet";
}

type DropdownOption = { id: number; name: string };

const NewOrganizationPage: React.FC<NewOrganizationPageProps> = ({ onClose, context }) => {
    const { dispatchToast } = useToastController();

    const [name, setName] = useState("");
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const [orgType, setOrgType] = useState("");
    const [selectedMediaTypeNames, setSelectedMediaTypeNames] = useState<string[]>([]);
    const [selectedLanguageNames, setSelectedLanguageNames] = useState<string[]>([]);
    const [isMajorMedia, setIsMajorMedia] = useState(false);
    const [selectedNetworkName, setSelectedNetworkName] = useState('');
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [phoneNumbers, setPhoneNumbers] = useState([
      { typeName: '', number: '' } 
    ]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([
      { typeName: '', url: '' }
    ]);
    const [hasNoPhysicalAddress, setHasNoPhysicalAddress] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("Canada");
    const [postalCode, setPostalCode] = useState("");

       useEffect(() => {
        const fetchDropdowns = async() => {
          const apiUrl = import.meta.env.VITE_API_URL || '/api/';
          const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
          const response = await fetch(`${normalizedApiUrl}mediaoutlets/dropdowns`);
          const data = await response.json();
          setMediaTypeOptions(data.mediaTypes);
          setLanguageTypeOptions(data.writtenLanguages);
          // setMediaOutlets(data.mediaOutlets);
          setMediaOutlets(
            data.mediaOutlets.sort((a, b) =>
              a.outletName.localeCompare(b.outletName)
            )
          ); // temp client-side sort
          setPhoneTypeOptions(data.phoneTypes);
          setSocialMediaTypeOptions(data.socialMediaTypes);
        }

        fetchDropdowns();
      }, []);

      useEffect(() => {
        setOrgType(capitalize(context)); // context = "network" | "outlet"
      }, [context]);

    const orgTypeOptions = [
      "Network",
      "Outlet",
    ];

    const [mediaTypeOptions, setMediaTypeOptions] = useState<{ id: number; name: string }[]>([]);
    const [languageTypeOptions, setLanguageTypeOptions] = useState<{ id: number; name: string }[]>([]); 
    const [mediaOutlets, setMediaOutlets] = useState<{ id: string; outletName: string }[]>([]);
    const [phoneTypeOptions, setPhoneTypeOptions] = useState<{ id: number; name: string }[]>([]);
    const [socialMediaTypeOptions, setSocialMediaTypeOptions] = useState<{ id: number; name: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const provinceOptions = [
      "AB", // Alberta
      "BC", // British Columbia
      "MB", // Manitoba
      "NB", // New Brunswick
      "NL", // Newfoundland and Labrador
      "NS", // Nova Scotia
      "NT", // Northwest Territories
      "NU", // Nunavut
      "ON", // Ontario
      "PE", // Prince Edward Island
      "QC", // Quebec
      "SK", // Saskatchewan
      "YT", // Yukon
    ];

    const countryOptions = [
      "Canada",
    ];


const handleSave = (e: React.FormEvent) => {
  e.preventDefault();


  if(!name) {
    dispatchToast(
      <Toast>
        <ToastTitle>Something went wrong!</ToastTitle>
        <ToastBody>
          Name cannot be blank.
        </ToastBody>
      </Toast>,
      { intent: 'error' }
    );
  }

  setIsSubmitting(true);

  const selectedLanguageIds = languageTypeOptions
    .filter(lang => selectedLanguageNames.includes(lang.name))
    .map(lang => lang.id);
  
  const selectedMediaTypeIds = mediaTypeOptions
    .filter(type => selectedMediaTypeNames.includes(type.name))
    .map(type => type.id);

  const phoneNumberPayload = phoneNumbers.map(entry => {
    const type = phoneTypeOptions.find(t => t.name === entry.typeName);
      return {
        typeId: type?.id ?? null, // or handle missing type
        number: entry.number
      };
  });

  const socialMediaPayload = socialMediaLinks.map(link => {
    const match = socialMediaTypeOptions.find(opt => opt.name === link.typeName);
      return {
        typeId: match?.id ?? null,
        url: link.url
      };
    });

  const payload = {
    outletName: name,
    organizationType: orgType,
    isMajorMedia,
    parentOutletId: orgType === "Outlet"
      ? mediaOutlets.find(outlet => outlet.outletName === selectedNetworkName)?.id ?? null
      : null,
    email,
    website,
    mediaTypeIds: selectedMediaTypeIds,
    writtenLanguageIds: selectedLanguageIds,
    phoneNumbers: phoneNumberPayload,
    socialMediaLinks: socialMediaPayload,
    address: hasNoPhysicalAddress
      ? null
      : {
        street,
        city,
        province,
        country,
        postalCode,
      },
  };

    const apiUrl = import.meta.env.VITE_API_URL;
    const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
    fetch(`${normalizedApiUrl}mediaoutlets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

       dispatchToast(
        <Toast>
          <ToastTitle>Organization Created</ToastTitle>
          <ToastBody>
            New organization created successfully.
            </ToastBody>
        </Toast>,
         { intent: 'success', timeout: 5000 }
          );
        if (onClose) onClose();
    })
    .then((data) => {
      console.log("Organization saved successfully:", data);
      // maybe show a toast here too?
    })
    .catch((error) => {
      console.error("Error saving organization:", error);
      // toast or error UI
      
    })
    .finally(() => {
      setIsSubmitting(false);
      if (onClose) onClose();
    });
  };

  
    return(
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div>New organization</div>
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
                  <Dropdown placeholder=''
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
                  selectedOptions={selectedMediaTypeNames}
                  onOptionSelect={(_, data) => {
                    const name = data.optionText;
                    if (!name) return;

                    setSelectedMediaTypeNames(prev =>
                      prev.includes(name)
                        ? prev.filter(t => t !== name)
                        : [...prev, name]
                      );
                    }}>
                    {mediaTypeOptions.map(option => (
                      <Option key={option.id} value={option.name} text={option.name}>
                        {option.name}
                      </Option>
                    ))}
                  </Dropdown>
              </Field>

              <Field label="Name" required>        
                <Input placeholder="" value={name} onChange={(_, data) => setName(data.value)}  />
              </Field>

              <Checkbox
                label="Major media"
                checked={isMajorMedia}
                onChange={(_, data) => setIsMajorMedia(data.checked === true)}
              />

              {orgType === "Outlet" && (
              <Field label="Network">
                <Dropdown
                  placeholder=""
                  value={selectedNetworkName}
                  onOptionSelect={(_, data) =>
                    setSelectedNetworkName(data.optionText ?? "")
                  }
                >
                  {mediaOutlets.map((outlet) => (
                    <Option key={outlet.id} text={outlet.outletName}>
                      {outlet.outletName}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            )}
              
              <Field label="Language">
              <Dropdown
                multiselect
                selectedOptions={selectedLanguageNames}
                onOptionSelect={(_, data) => {
                  const name = data.optionText;
                  if (!name) return;

                  setSelectedLanguageNames(prev =>
                    prev.includes(name)
                      ? prev.filter(l => l !== name)
                      : [...prev, name]
                  );
                }}
              >
                {languageTypeOptions.map(option => (
                  <Option key={option.id} value={option.name} text={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Dropdown>
            </Field>

                    <Divider style={{ margin: '24px 0 16px 0' }} />
                    <div className={styles.sectionHeader }>Contact information</div>

              <Field label="Email">        
                  <Input value={email} onChange={(_, data) => setEmail(data.value)} placeholder=""  />
              </Field>

              {/* Phone section label */}
              <div style={{ fontWeight: 500, marginBottom: 4, marginTop: 12 }}>Phone</div>
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
                  style={{ flex: '0 0 120px', minWidth: 160 }}
                  value={entry.typeName}
                  onOptionSelect={(_, data) => {
                    const updated = [...phoneNumbers];
                    updated[index].typeName = data.optionText || '';
                    setPhoneNumbers(updated);
                  }}
                >
                  {phoneTypeOptions.map(option => (
                    <Option key={option.id} value={option.name} text={option.name}>
                      {option.name}
                    </Option>
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
                    setPhoneNumbers([...phoneNumbers, { typeName: '', number: '' }])
                  }>
                    Phone
                </Button>
              </div>

              <Divider style={{ margin: '24px 0 16px 0' }} />
                    <div className={styles.sectionHeader}>Online presence</div>

              <Field label="Website">        
                <Input placeholder="http://" value={website} onChange={(_, data) => setWebsite(data.value)} />
              </Field>

              {socialMediaLinks.map((entry, index) => (
                <Field key={index} label={index === 0 ? "Social media" : ""}>
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
                      value={entry.typeName}
                      onOptionSelect={(_, data) => {
                        const updated = [...socialMediaLinks];
                        updated[index].typeName = data.optionText || '';
                        setSocialMediaLinks(updated);
                      }}
                    >
                      {socialMediaTypeOptions.map(option => (
                        <Option key={option.id} value={option.name} text={option.name}>
                          {option.name}
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
                    setSocialMediaLinks([...socialMediaLinks, { typeName: '', url: '' }])
                  }
                >
                  Social media
                </Button>
              </div>

              <Divider style={{ margin: '24px 0 16px 0' }} />
                    <div className={styles.sectionHeader}>Address</div>

              <Checkbox
                label="No physical address"
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
            <Button 
              appearance="primary" 
              type="submit" 
              size="large"
              onClick={handleSave} 
              disabled={isSubmitting}>    
                <Body2>{isSubmitting ? 'Saving...' : 'Save'} </Body2>             
              </Button>
            <Button appearance="secondary" size="large"
                    onClick={onClose}>
                     <Body2>Cancel</Body2> 
            </Button>
          </div>

            </div>
          </form>
      </div>
    );
}

export default NewOrganizationPage;