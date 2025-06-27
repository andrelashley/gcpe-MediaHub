import React from 'react';
import type { User } from '../../api/generated-client/model';
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
// Remove duplicate import of Fluent UI toast components
import { useToastController, Toaster, Toast, ToastTitle, ToastBody } from '@fluentui/react-components';
import { ministryService } from '../../services/ministryService';
import { userService } from '../../services/userService';
import { requestService } from '../../services/requestService';
import { Ministry, MediaRequest, RequestStatus, RequestType, MediaContact } from '../../api/generated-client/model';
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
    const [requestedById, setRequestedById] = React.useState<string>('');
    const [deadline, setDeadline] = React.useState('');
    const [receivedOn, setReceivedOn] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [assignedUserId, setAssignedUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [fyiContactUserId, setfyiContactUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [requestorContactId, setRequestorContactId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [formErrors, setFormErrors] = React.useState({
        requestTitle: '',
        requestedBy: '',
        deadline: '',
        receivedOn: '',
        requestType: '',
        requestDetails: '',
        leadMinistry: '',
        assignedTo: ''
    });
    const [touchedFields, setTouchedFields] = React.useState({
        requestTitle: false,
        requestedBy: false,
        deadline: false,
        receivedOn: false,
        requestType: false,
        requestDetails: false,
        leadMinistry: false,
        assignedTo: false
    });
    const [mediaContacts, setMediaContacts] = React.useState<MediaContact[]>([]);
    const [userIdirs, setUserIdirs] = React.useState<User[]>([]);

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

    React.useEffect(() => {
        const fetchMediaContacts = async () => {
            try {
                const contacts = await userService.getMediaContacts();
                console.log('Fetched media contacts:', contacts);
                setMediaContacts(contacts);
            } catch (error) {
                console.error('Failed to fetch media contacts:', error);
            }
        };
        fetchMediaContacts();
    }, []);

    React.useEffect(() => {
        const fetchUserIdirs = async () => {
            try {
                const users = await userService.getUsers();
                setUserIdirs(users);
            } catch (error) {
                console.error('Failed to fetch user IDIRs:', error);
            }
        };
        fetchUserIdirs();
    }, []);

    // Effect to update assignedUserId and fyiContactUserId when inputs change
    React.useEffect(() => {
        if (lookupTimeout.current) {
            clearTimeout(lookupTimeout.current);
        }

        // No longer needed: updateUser function

        lookupTimeout.current = setTimeout(async () => {
            setAssignedUserId(assignedTo.trim() || '00000000-0000-0000-0000-000000000000');
            setfyiContactUserId(fyiContactUser.trim() || '00000000-0000-0000-0000-000000000000');
        }, 500); // 500ms debounce

        return () => {
            if (lookupTimeout.current) {
                clearTimeout(lookupTimeout.current);
            }
        };
    }, [assignedTo, fyiContactUser]);

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

    const { dispatchToast } = useToastController();
    
    // Submit handler for creating new request
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setShowValidation(true);
        setError(null);
        const errors: any = {};
        if (!requestTitle.trim()) errors.requestTitle = 'Request title is required';
        if (!requestedById) errors.requestedBy = 'Requested by is required';
        if (!deadline.trim()) errors.deadline = 'Deadline is required';
        if (!receivedOn.trim()) errors.receivedOn = 'Received date is required';
        if (!selectedRequestType) errors.requestType = 'Request type is required';
        if (!requestDetails.trim()) errors.requestDetails = 'Request details are required';
        if (!leadMinistry) errors.leadMinistry = 'Lead ministry is required';
        if (!assignedTo.trim()) errors.assignedTo = 'Assigned to is required';
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            setTouchedFields({
                requestTitle: true,
                requestedBy: true,
                deadline: true,
                receivedOn: true,
                requestType: true,
                requestDetails: true,
                leadMinistry: true,
                assignedTo: true
            });
            return;
        }

        // Validate dates
        if (!deadline.trim() || !receivedOn.trim()) {
            setError("Deadline and Received On dates are required");
            return;
        }

        // Validate IDs
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

        // const outletId = await requestService.getRequestorOutletId(requestedById);
        const newRequest: MediaRequest = {
            requestTitle,
            requestDetails,
            deadline: deadlineDate.toISOString(),
            receivedOn: receivedOnDate.toISOString(),
            leadMinistryId: leadMinistry,
            additionalMinistries: additionalMinistries.map(id => ({ id })),
            requestStatusId: selectedStatus,
            requestTypeId: selectedRequestType,
            requestorContactId: requestedById,
            assignedUserId: assignedUserId !== '00000000-0000-0000-0000-000000000000' ? assignedUserId : null,
            fyiContactUserId: fyiContactUser.trim() && fyiContactUserId !== '00000000-0000-0000-0000-000000000000' ? fyiContactUserId : null,
            requestResolutionId: null, // Default value
            response: '',
            requestNo: 0 // This will be set by the API
        };
        // if (outletId !== null && outletId !== undefined) {
        //     (newRequest as any).requestorOutletId = outletId;
        // }

        console.log("newRequest:", newRequest);
        setIsSubmitting(true);
        try {
            const response = await requestService.createRequest(newRequest);
            if (response) {
                dispatchToast(
                    <Toast >
                        <ToastTitle>Request Created</ToastTitle>
                        <ToastBody>
                            Request #{response.requestNo}: <b>{response.requestTitle}</b> created successfully.
                        </ToastBody>
                    </Toast>,
                    { intent: 'success',
                        timeout: 5000
                     }
                );
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
                <h3>New Media Request</h3>
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
                    validationMessage={touchedFields.requestTitle && formErrors.requestTitle ? formErrors.requestTitle : undefined}
                    validationState={touchedFields.requestTitle && formErrors.requestTitle ? "error" : "none"}
                >
                    <Input
                        placeholder="Enter request title"
                        value={requestTitle}
                        onChange={(_, data) => {
                            setRequestTitle(data.value);
                            if (data.value.trim()) {
                                setFormErrors(prev => ({ ...prev, requestTitle: '' }));
                            }
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, requestTitle: true }))}
                    />
                </Field>
                <Field
                    label="Requested By"
                    required
                    validationMessage={touchedFields.requestedBy && formErrors.requestedBy ? formErrors.requestedBy : undefined}
                    validationState={touchedFields.requestedBy && formErrors.requestedBy ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a contact"
                        defaultSelectedOptions={requestedById ? [requestedById] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setRequestedById(data.optionValue);
                                setFormErrors(prev => ({ ...prev, requestedBy: '' }));
                            }
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, requestedBy: true }))}
                    >
                        {mediaContacts.map(contact => (
                            <Option key={contact.id} value={contact.id.toString()} text={`${contact.firstName} ${contact.lastName}`}>{contact.firstName} {contact.lastName}</Option>
                        ))}
                        
                    </Dropdown>
                </Field>
                <Field
                    label="Deadline"
                    required
                    validationMessage={touchedFields.deadline && formErrors.deadline ? formErrors.deadline : undefined}
                    validationState={touchedFields.deadline && formErrors.deadline ? "error" : "none"}
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
                            onBlur={() => setTouchedFields(prev => ({ ...prev, deadline: true }))}
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
                    validationMessage={touchedFields.receivedOn && formErrors.receivedOn ? formErrors.receivedOn : undefined}
                    validationState={touchedFields.receivedOn && formErrors.receivedOn ? "error" : "none"}
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
                            onBlur={() => setTouchedFields(prev => ({ ...prev, receivedOn: true }))}
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
                    validationMessage={touchedFields.requestType && formErrors.requestType ? formErrors.requestType : undefined}
                    validationState={touchedFields.requestType && formErrors.requestType ? "error" : "none"}
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
                    validationMessage={touchedFields.requestDetails && formErrors.requestDetails ? formErrors.requestDetails : undefined}
                    validationState={touchedFields.requestDetails && formErrors.requestDetails ? "error" : "none"}
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
                        onBlur={() => setTouchedFields(prev => ({ ...prev, requestDetails: true }))}
                    />
                </Field>
                <Divider className={styles.dividerSection} />
                <h3>Responsibility</h3>
                <Field
                    label="Lead Ministry"
                    required
                    validationMessage={touchedFields.leadMinistry && formErrors.leadMinistry ? formErrors.leadMinistry : undefined}
                    validationState={touchedFields.leadMinistry && formErrors.leadMinistry ? "error" : "none"}
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
                    label="Assigned To"
                    required
                    validationMessage={touchedFields.assignedTo && formErrors.assignedTo ? formErrors.assignedTo : undefined}
                    validationState={touchedFields.assignedTo && formErrors.assignedTo ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select assignee IDIR"
                        defaultSelectedOptions={assignedTo ? [assignedTo] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setAssignedTo(data.optionValue);
                                setFormErrors(prev => ({ ...prev, assignedTo: '' }));
                            }
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, assignedTo: true }))}
                    >
                        {userIdirs.map(user => (
                            <Option key={user.id} value={user.id} text={user.fullName}>{user.fullName}</Option>
                        ))}
                    </Dropdown>
                </Field>
                <Divider className={styles.dividerSection} />
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
                    label="FYI Contacts"
                >
                    <Dropdown
                        placeholder="Select FYI Contact IDIR"
                        defaultSelectedOptions={fyiContactUser ? [fyiContactUser] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setfyiContactUsers(data.optionValue);
                                // Optionally clear error if you add validation
                            }
                        }}
                    >
                        {userIdirs.map(user => (
                            <Option key={user.id} value={user.id} text={user.fullName}>{user.fullName}</Option>
                        ))}
                    </Dropdown>
                </Field>
                <div className={styles.buttonContainer}>
                    <Button
                        appearance="primary"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                        appearance="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>        
                </div>
            </div>
        </div>
    );
};

export default NewRequestPage;