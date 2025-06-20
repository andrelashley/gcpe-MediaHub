import React from 'react';
import {
    Title1,
    Title2,
    Dropdown,
    Option,
    Field,
    Divider,
    Input,
    Textarea,
    Button,
} from '@fluentui/react-components';
import { ministryService } from '../../services/ministryService';
import { userService } from '../../services/userService';
import { requestService } from '../../services/requestService';
import { Ministry, MediaRequest, RequestStatus, RequestType } from '../../api/generated-client/model';
import { CalendarEmpty24Regular, Dismiss24Regular } from '@fluentui/react-icons';
import styles from './newRequest.module.css';

interface NewRequestPageProps {
    onClose?: () => void;
}

const NewRequestPage = ({ onClose }: NewRequestPageProps): JSX.Element => {
    // State declarations
    const [statuses, setStatuses] = React.useState<RequestStatus[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<number | null>(null);
    const [requestTypes, setRequestTypes] = React.useState<RequestType[]>([]);
    const [selectedRequestType, setSelectedRequestType] = React.useState<number | null>(null);
    const [ministries, setMinistries] = React.useState<Ministry[]>([]);
    const [leadMinistry, setLeadMinistry] = React.useState<number | null>(null);
    const [additionalMinistries, setAdditionalMinistries] = React.useState<number[]>([]);
    const [assignedTo, setAssignedTo] = React.useState('');
    const [fyiContactUser, setfyiContactUsers] = React.useState('');
    const [requestDetails, setRequestDetails] = React.useState('');
    const [requestTitle, setRequestTitle] = React.useState('');
    const [requestedBy, setRequestedBy] = React.useState('');
    const [deadline, setDeadline] = React.useState('');
    const [receivedOn, setReceivedOn] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [assignedUserId, setAssignedUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [fyiContactUserId, setfyiContactUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [requestorContactId, setRequestorContactId] = React.useState<string>('00000000-0000-0000-0000-000000000000');

    // Refs
    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const receivedOnInputRef = React.useRef<HTMLInputElement>(null);
    const lookupTimeout = React.useRef<NodeJS.Timeout>();

    // Effects
    React.useEffect(() => {
        const fetchMinistries = async () => {
            try {
                const ministryList = await ministryService.getMinistries();
                setMinistries(ministryList);
            } catch (error) {
                console.error('Failed to fetch ministries:', error);
            }
        };
        fetchMinistries();
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusList, typeList] = await Promise.all([
                    requestService.getRequestStatuses(),
                    requestService.getRequestTypes()
                ]);
                setStatuses(statusList);
                setRequestTypes(typeList);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    // Effect to update assignedUserId and fyiContactUserId when inputs change
    React.useEffect(() => {
        if (lookupTimeout.current) {
            clearTimeout(lookupTimeout.current);
        }

        const updateUser = async (idir: string, setUserId: (id: string) => void, fieldName: string) => {
            if (idir.trim()) {
                try {
                    console.log(`Calling getUserByIdir for ${fieldName}:`, idir.trim());
                    const user = await userService.getUserByIdir(idir.trim());
                    console.log(`Retrieved ${fieldName} user:`, user);
                    if (user?.id) {
                        setUserId(user.id);
                    } else {
                        setUserId('00000000-0000-0000-0000-000000000000');
                    }
                } catch (error) {
                    console.error(`Failed to retrieve ${fieldName}:`, error);
                    setUserId('00000000-0000-0000-0000-000000000000');
                }
            }
        };

        lookupTimeout.current = setTimeout(async () => {
            if (assignedTo.trim()) {
                await updateUser(assignedTo, setAssignedUserId, 'Assigned To');
            }
            if (fyiContactUser.trim()) {
                await updateUser(fyiContactUser, setfyiContactUserId, 'FYI Contact');
            }
        }, 500); // 500ms debounce

        return () => {
            if (lookupTimeout.current) {
                clearTimeout(lookupTimeout.current);
            }
        };
    }, [assignedTo, fyiContactUser]);

    // Effect to update requestorContactId when requestedBy changes
    React.useEffect(() => {
        if (lookupTimeout.current) {
            clearTimeout(lookupTimeout.current);
        }

        lookupTimeout.current = setTimeout(async () => {
            if (requestedBy.trim()) {
                try {
                    console.log("Calling getMediaContactByFullName for requestedBy:", requestedBy.trim());
                    const contact = await userService.getMediaContactByFullName(requestedBy.trim());
                    console.log("Retrieved requestor contact:", contact);
                    if (contact?.id) {
                        setRequestorContactId(contact.id);
                    } else {
                        setRequestorContactId('00000000-0000-0000-0000-000000000000');
                    }
                } catch (error) {
                    console.error("Failed to retrieve requestorContactId:", error);
                    setRequestorContactId('00000000-0000-0000-0000-000000000000');
                }
            }
        }, 500); // 500ms debounce

        return () => {
            if (lookupTimeout.current) {
                clearTimeout(lookupTimeout.current);
            }
        };
    }, [requestedBy]);

    // Helper function to get ministry names string
    const getSelectedMinistriesDisplay = (selectedIds: number[]) => {
        return selectedIds
            .map(id => ministries.find(m => m.id === id)?.name)
            .filter(Boolean)
            .join(", ") || "Select additional ministries";
    };

    // Keep selected ministries display updated
    const [ministriesDisplay, setMinistriesDisplay] = React.useState("");
    React.useEffect(() => {
        setMinistriesDisplay(getSelectedMinistriesDisplay(additionalMinistries));
    }, [additionalMinistries, ministries]);

    // Submit handler for creating new request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setShowValidation(true);
        setError(null);
    
        // Validate all required fields
        if (!selectedStatus) {
            setError("Status is required");
            return;
        }

        if (!requestTitle.trim()) {
            setError("Request title is required");
            return;
        }

        if (!selectedRequestType) {
            setError("Request type is required");
            return;
        }

        if (!requestDetails.trim()) {
            setError("Request details are required");
            return;
        }

        if (!requestedBy.trim()) {
            setError("Requested By is required");
            return;
        }

        if (!leadMinistry) {
            setError("Lead ministry is required");
            return;
        }

        if (!assignedTo.trim()) {
            setError("Assigned To is required");
            return;
        }

        // Validate dates
        if (!deadline.trim() || !receivedOn.trim()) {
            setError("Deadline and Received On dates are required");
            return;
        }

        // Validate IDs
        if (requestorContactId === '00000000-0000-0000-0000-000000000000') {
            setError("Unable to find media contact with provided full name");
            return;
        }

        if (assignedUserId === '00000000-0000-0000-0000-000000000000') {
            setError("Unable to find user with provided Assigned To IDIR");
            return;
        }

        if (fyiContactUser.trim() && fyiContactUserId === '00000000-0000-0000-0000-000000000000') {
            setError("Unable to find user with provided FYI Contact IDIR");
            return;
        }
        
        // Map form state to the correct MediaRequest shape for your API
        // Convert date strings to DateTimeOffset format
        const deadlineDate = deadline ? new Date(deadline) : null;
        const receivedOnDate = receivedOn ? new Date(receivedOn) : null;

        if (!deadlineDate || !receivedOnDate) {
            setError("Deadline and Received On dates are required");
            return;
        }

        const newRequest: MediaRequest = {
            requestTitle,
            requestDetails,
            deadline: deadlineDate.toISOString(),
            receivedOn: receivedOnDate.toISOString(),
            leadMinistryId: leadMinistry,
            additionalMinistries: additionalMinistries.map(id => ({ id })),
            requestStatusId: selectedStatus,
            requestTypeId: selectedRequestType,
            requestorContactId: requestorContactId !== '00000000-0000-0000-0000-000000000000' ? requestorContactId : null,
            assignedUserId: assignedUserId !== '00000000-0000-0000-0000-000000000000' ? assignedUserId : null,
            fyiContactUserId: fyiContactUser.trim() && fyiContactUserId !== '00000000-0000-0000-0000-000000000000' ? fyiContactUserId : null,
            requestorOutletId: null, // Will be set when outlet is implemented
            requestResolutionId: null, // Default value
            response: '',
            requestNo: 0 // This will be set by the API
        };

        console.log("newRequest:", newRequest);
        setIsSubmitting(true);
        try {
            const response = await requestService.createRequest(newRequest);
            if (response) {
                if (onClose) onClose();
            }
        } catch (err: any) {
            console.error("Error creating request:", err);
            if (err.response?.data) {
                setError(err.response.data);
            } else if (err.message.includes("Foreign key constraint failed")) {
                setError("One or more referenced entities do not exist. Please check all fields.");
            } else {
                setError(err.message || "Failed to create request");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Title1>New Media Request</Title1>
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
                    label="Status"
                    required
                    validationMessage={showValidation && !selectedStatus ? "Status is required" : undefined}
                    validationState={showValidation && !selectedStatus ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a status"
                        defaultSelectedOptions={selectedStatus ? [selectedStatus.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                const value = Number(data.optionValue);
                                setSelectedStatus(value);
                                setShowValidation(false);
                            }
                        }}
                    >
                        {statuses.map(status => (
                            <Option key={status.id} value={status.id.toString()}>
                                {status.name}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Request Title"
                    required
                    validationMessage={showValidation && !requestTitle.trim() ? "Request title is required" : undefined}
                    validationState={showValidation && !requestTitle.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter request title"
                        value={requestTitle}
                        onChange={(_, data) => {
                            setRequestTitle(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="Requested By"
                    required
                    validationMessage={showValidation && !requestedBy.trim() ? "Requested by is required" : undefined}
                    validationState={showValidation && !requestedBy.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter full name (First Last)"
                        value={requestedBy}
                        onChange={(_, data) => {
                            setRequestedBy(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="Deadline"
                    required
                    validationMessage={showValidation && !deadline ? "Deadline is required" : undefined}
                    validationState={showValidation && !deadline ? "error" : "none"}
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                            type="text"
                            value={deadline}
                            placeholder="Select a date"
                            className={styles.dateInput}
                            readOnly
                            contentAfter={
                                <CalendarEmpty24Regular 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => dateInputRef.current?.showPicker()}
                                />
                            }
                            onBlur={() => setShowValidation(true)}
                        />
                        <input
                            ref={dateInputRef}
                            type="date"
                            className={styles.hiddenDateInput}
                            onChange={(e) => {
                                setDeadline(e.target.value);
                                setShowValidation(false);
                            }}
                        />
                    </div>
                </Field>
                <Field
                    label="Received On"
                    required
                    validationMessage={showValidation && !receivedOn ? "Received date is required" : undefined}
                    validationState={showValidation && !receivedOn ? "error" : "none"}
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                            type="text"
                            value={receivedOn}
                            placeholder="Select a date"
                            className={styles.dateInput}
                            readOnly
                            contentAfter={
                                <CalendarEmpty24Regular 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => receivedOnInputRef.current?.showPicker()}
                                />
                            }
                            onBlur={() => setShowValidation(true)}
                        />
                        <input
                            ref={receivedOnInputRef}
                            type="date"
                            className={styles.hiddenDateInput}
                            onChange={(e) => {
                                setReceivedOn(e.target.value);
                                setShowValidation(false);
                            }}
                        />
                    </div>
                </Field>
                <Field
                    label="Request Type"
                    required
                    validationMessage={showValidation && !selectedRequestType ? "Request type is required" : undefined}
                    validationState={showValidation && !selectedRequestType ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a request type"
                        defaultSelectedOptions={selectedRequestType ? [selectedRequestType.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                const value = Number(data.optionValue);
                                setSelectedRequestType(value);
                                setShowValidation(false);
                            }
                        }}
                    >
                        {requestTypes.map(type => (
                            <Option key={type.id} value={type.id.toString()}>
                                {type.name}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Request Details"
                    required
                    validationMessage={showValidation && !requestDetails.trim() ? "Request details are required" : undefined}
                    validationState={showValidation && !requestDetails.trim() ? "error" : "none"}
                >
                    <Textarea
                        placeholder="Enter request details"
                        value={requestDetails}
                        resize="vertical"
                        style={{ minHeight: '100px' }}
                        onChange={(_, data) => {
                            setRequestDetails(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Divider style={{ margin: '24px 0 16px 0' }} />
                <Title2>Ministry & Contact Information</Title2>
                <Field
                    label="Lead Ministry"
                    required
                    validationMessage={showValidation && !leadMinistry ? "Lead ministry is required" : undefined}
                    validationState={showValidation && !leadMinistry ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select lead ministry"
                        defaultSelectedOptions={leadMinistry ? [leadMinistry.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                const newLeadMinistry = Number(data.optionValue);
                                setLeadMinistry(newLeadMinistry);
                                
                                // Remove the new lead ministry from additional ministries if it's there
                                setAdditionalMinistries(prev =>
                                    prev.filter(id => id !== newLeadMinistry)
                                );
                                
                                setShowValidation(false);
                            }
                        }}
                    >
                        {ministries.map(ministry => (
                            <Option key={ministry.id} value={ministry.id.toString()}>
                                {ministry.name}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Additional Ministries"
                >
                    <Dropdown
                        placeholder="Select additional ministries"
                        defaultValue={ministriesDisplay}
                        value={ministriesDisplay}
                        selectedOptions={additionalMinistries.map(id => id.toString())}
                        size="medium"
                        multiselect
                        onOptionSelect={(_, data) => {
                            // Add newly selected IDs, excluding lead ministry
                            const selectedIds = data.selectedOptions.map(Number);
                            const newAdditionalMinistries = selectedIds.filter(id => id !== leadMinistry);
                            setAdditionalMinistries(newAdditionalMinistries);
                        }}
                    >
                        {ministries
                            .filter(ministry => ministry.id !== leadMinistry) // Filter out the lead ministry
                            .map(ministry => (
                                <Option key={ministry.id} value={ministry.id.toString()}>
                                    {ministry.name}
                                </Option>
                            ))
                        }
                    </Dropdown>
                </Field>
                <Field
                    label="Assigned To"
                    required
                    validationMessage={showValidation && !assignedTo.trim() ? "Assigned to is required" : undefined}
                    validationState={showValidation && !assignedTo.trim() ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter name of assignee"
                        value={assignedTo}
                        onChange={(_, data) => {
                            setAssignedTo(data.value);
                            if (data.value.trim()) {
                                setShowValidation(false);
                            }
                        }}
                        onBlur={() => setShowValidation(true)}
                    />
                </Field>
                <Field
                    label="FYI Contacts"
                >
                    <Input
                        placeholder="Enter IDIR for FYI Contact"
                        value={fyiContactUser}
                        onChange={(_, data) => {
                            setfyiContactUsers(data.value);
                            // Clear invalid user ID if input is empty
                            if (!data.value.trim()) {
                                setfyiContactUserId('00000000-0000-0000-0000-000000000000');
                            }
                        }}
                    />
                </Field>
                <div className={styles.buttonContainer}>
                    <Button
                        appearance="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        appearance="primary"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewRequestPage;