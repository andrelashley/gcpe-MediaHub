import React from 'react';
import type { User } from '../../api/generated-client/model';
import {
    Title1,
    Body2,
    Dropdown,
    Option,
    Field,
    Divider,
    Input,
    Textarea,
    Button,
    Subtitle1,
    Text,
} from '@fluentui/react-components';
// Remove duplicate import of Fluent UI toast components
import { useToastController, Toaster, Toast, ToastTitle, ToastBody, ToastFooter, Link } from '@fluentui/react-components';
import { useQueryClient } from '@tanstack/react-query';
import { ministryService } from '../../services/ministryService';
import { userService } from '../../services/userService';
import { requestService } from '../../services/requestService';
import { Ministry, MediaRequest, RequestStatus, RequestType, MediaContact } from '../../api/generated-client/model';
import { CalendarEmpty24Regular, Dismiss24Regular } from '@fluentui/react-icons';
import {
  TimePicker,
  TimePickerProps,
  formatDateToTimeString,
} from "@fluentui/react-timepicker-compat";
import { makeStyles } from "@fluentui/react-components";
import styles from './newRequest.module.css';

interface NewRequestPageProps {
    onClose?: () => void;
}

const useTimePickerStyles = makeStyles({
  root: {
    display: "flex",
    columnGap: "8px",
    alignItems: "center",
    maxWidth: "600px",
  },
  dateInput: {
    flex: 1,
    minWidth: "200px",
  },
  timePicker: {
    flex: 1,
    minWidth: "200px",
  },
});

const NewRequestPage = ({ onClose }: NewRequestPageProps): JSX.Element => {
    // State declarations
    const queryClient = useQueryClient();
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
    const [deadlineTime, setDeadlineTime] = React.useState<Date | null>(null);
    const [timePickerValue, setTimePickerValue] = React.useState<string>('');
    const [receivedOn, setReceivedOn] = React.useState('');
    const [receivedOnTime, setReceivedOnTime] = React.useState<Date | null>(null);
    const [receivedOnTimePickerValue, setReceivedOnTimePickerValue] = React.useState<string>('');
    const [showValidation, setShowValidation] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [assignedUserId, setAssignedUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [fyiContactUserId, setfyiContactUserId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [requestorContactId, setRequestorContactId] = React.useState<string>('00000000-0000-0000-0000-000000000000');
    const [formErrors, setFormErrors] = React.useState({
        requestTitle: '',
        requestDetails: '',
        deadline: '',
        receivedOn: '',
        requestedBy: '',
        leadMinistry: '',
        assignedTo: '',
        requestType: '',
    });
    const [touchedFields, setTouchedFields] = React.useState({
        requestTitle: false,
        requestDetails: false,
        deadline: false,
        receivedOn: false,
        requestedBy: false,
        leadMinistry: false,
        assignedTo: false,
        requestType: false,
    });
    const [mediaContacts, setMediaContacts] = React.useState<MediaContact[]>([]);
    const [userIdirs, setUserIdirs] = React.useState<User[]>([]);

    // Refs
    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const receivedOnInputRef = React.useRef<HTMLInputElement>(null);
    const lookupTimeout = React.useRef<NodeJS.Timeout>();

    // Update timePickerValue when deadlineTime changes
    React.useEffect(() => {
        setTimePickerValue(deadlineTime ? formatDateToTimeString(deadlineTime) : '');
    }, [deadlineTime]);

    // Update receivedOnTimePickerValue when receivedOnTime changes
    React.useEffect(() => {
        setReceivedOnTimePickerValue(receivedOnTime ? formatDateToTimeString(receivedOnTime) : '');
    }, [receivedOnTime]);

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
            .join(", ") || "";
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
        if (!deadlineTime) errors.deadline = 'Deadline time is required';
        if (!receivedOn.trim()) errors.receivedOn = 'Received date is required';
        if (!receivedOnTime) errors.receivedOn = 'Received time is required';
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
        if (!deadline.trim() || !deadlineTime || !receivedOn.trim() || !receivedOnTime) {
            setError("Deadline date, time, and Received On date, time are required");
            return;
        }

        // Combine date and time for deadline
        let deadlineDate: Date | null = null;
        if (deadline && deadlineTime) {
            // Create a new date with the deadline date and time from TimePicker
            const deadlineDateTime = new Date(deadline);
            deadlineDate = new Date(
                deadlineDateTime.getFullYear(),
                deadlineDateTime.getMonth(),
                deadlineDateTime.getDate(),
                deadlineTime.getHours(),
                deadlineTime.getMinutes()
            );
        }
        
        // Combine date and time for received on
        let receivedOnDate: Date | null = null;
        if (receivedOn && receivedOnTime) {
            // Create a new date with the received on date and time from TimePicker
            const receivedOnDateTime = new Date(receivedOn);
            receivedOnDate = new Date(
                receivedOnDateTime.getFullYear(),
                receivedOnDateTime.getMonth(),
                receivedOnDateTime.getDate(),
                receivedOnTime.getHours(),
                receivedOnTime.getMinutes()
            );
        }

        if (!deadlineDate || !receivedOnDate) {
            setError("Deadline and Received On dates are required");
            return;
        }

        // const outletId = await requestService.getRequestorOutletId(requestedById);
        // Find the status with name 'In Progress' (case-insensitive)
        const inProgressStatus = statuses.find(s => s.name?.toLowerCase() === 'in progress');
        const newRequest: MediaRequest = {
            requestTitle,
            requestDetails,
            deadline: deadlineDate.toISOString(),
            receivedOn: receivedOnDate.toISOString(),
            leadMinistryId: leadMinistry,
            additionalMinistries: additionalMinistries.map(id => ({ id })),
            requestStatusId: inProgressStatus?.id ?? null,
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
                        <ToastFooter>
                            <Link href={`/requests/${response.requestNo}`} style={{ marginRight: 16 }}>View</Link>
                            <Link href="/requests/new">Add another</Link>
                        </ToastFooter>
                    </Toast>,
                    { intent: 'success', timeout: 5000 }
                );
                // Invalidate the requests query to refresh the list after toast
                queryClient.invalidateQueries({ queryKey: ['requests'] });
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
                <Subtitle1>New media request</Subtitle1>
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
                {/*
                <Field
                    label={{
                        children: (label) => (
                            <span style={{
                                fontSize: 'var(--fontSizeBase300)',
                                lineHeight: 'var(--lineHeightBase300)',
                                fontWeight: 'var(--fontWeightRegular)'
                            }}>{label}</span>
                        )
                    }}
                    label="Status"
                    required
                    validationMessage={showValidation && !selectedStatus ? "Status is required" : undefined}
                    validationState={showValidation && !selectedStatus ? "error" : "none"}
                >
                    <Dropdown
                        placeholder=""
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
                */}
                <Field
                    label="Request title"
                    required
                    validationMessage={touchedFields.requestTitle && formErrors.requestTitle ? formErrors.requestTitle : undefined}
                    validationState={touchedFields.requestTitle && formErrors.requestTitle ? "error" : "none"}
                >
                    <Input
                        placeholder=""
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
                    label="Requested by"
                    required
                    validationMessage={touchedFields.requestedBy && formErrors.requestedBy ? formErrors.requestedBy : undefined}
                    validationState={touchedFields.requestedBy && formErrors.requestedBy ? "error" : "none"}
                >
                    <Dropdown
                        placeholder=""
                        defaultSelectedOptions={requestedById ? [requestedById] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setRequestedById(data.optionValue);
                                setFormErrors(prev => ({ ...prev, requestedBy: '' }));
                            }
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, requestedBy: true }))}
                    >
                        {(Array.isArray(mediaContacts) ? mediaContacts : []).map(contact => (
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
                    <div className={useTimePickerStyles().root}>
                        <Input
                            type="text"
                            value={deadline}
                            placeholder=""
                            className={`${styles.dateInput} ${useTimePickerStyles().dateInput}`}
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
                        <TimePicker
                            placeholder=""
                            freeform
                            dateAnchor={deadline ? new Date(deadline) : undefined}
                            selectedTime={deadlineTime}
                            onTimeChange={(ev, data) => {
                                setDeadlineTime(data.selectedTime);
                                setTimePickerValue(data.selectedTimeText ?? '');
                                setShowValidation(false);
                            }}
                            value={timePickerValue}
                            onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                setTimePickerValue(ev.target.value);
                            }}
                            className={useTimePickerStyles().timePicker}
                        />
                    </div>
                </Field>
                <Field
                    label="Received on"
                    required
                    validationMessage={touchedFields.receivedOn && formErrors.receivedOn ? formErrors.receivedOn : undefined}
                    validationState={touchedFields.receivedOn && formErrors.receivedOn ? "error" : "none"}
                >
                    <div className={useTimePickerStyles().root}>
                        <Input
                            type="text"
                            value={receivedOn}
                            placeholder=""
                            className={`${styles.dateInput} ${useTimePickerStyles().dateInput}`}
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
                        <TimePicker
                            placeholder=""
                            freeform
                            dateAnchor={receivedOn ? new Date(receivedOn) : undefined}
                            selectedTime={receivedOnTime}
                            onTimeChange={(ev, data) => {
                                setReceivedOnTime(data.selectedTime);
                                setReceivedOnTimePickerValue(data.selectedTimeText ?? '');
                                setShowValidation(false);
                            }}
                            value={receivedOnTimePickerValue}
                            onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                setReceivedOnTimePickerValue(ev.target.value);
                            }}
                            className={useTimePickerStyles().timePicker}
                        />
                    </div>
                </Field>
                <Field
                    label="Request type"
                    required
                    validationMessage={touchedFields.requestType && formErrors.requestType ? formErrors.requestType : undefined}
                    validationState={touchedFields.requestType && formErrors.requestType ? "error" : "none"}
                >
                    <Dropdown
                        placeholder=""
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
                    label="Request details"
                    required
                    validationMessage={touchedFields.requestDetails && formErrors.requestDetails ? formErrors.requestDetails : undefined}
                    validationState={touchedFields.requestDetails && formErrors.requestDetails ? "error" : "none"}
                >
                    <Textarea
                        placeholder=""
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
                <Body2 as="span" style={{ display: 'block' }}>Responsibility</Body2>
                <Field
                    label="Lead ministry"
                    required
                    validationMessage={touchedFields.leadMinistry && formErrors.leadMinistry ? formErrors.leadMinistry : undefined}
                    validationState={touchedFields.leadMinistry && formErrors.leadMinistry ? "error" : "none"}
                >
                    <Dropdown
                        placeholder=""
                        defaultSelectedOptions={leadMinistry ? [leadMinistry.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                const newLeadMinistry = Number(data.optionValue);
                                setLeadMinistry(newLeadMinistry);
                                
                                // Remove the new lead ministry from additional ministries if it's there
                                setAdditionalMinistries(prev => prev.filter(id => id !== newLeadMinistry));
                                
                                setShowValidation(false);
                            }
                        }}
                    >
                        {(ministries || []).map(ministry => (
                            <Option key={ministry.id} value={ministry.id.toString()}>
                                {ministry.name}
                            </Option>
                        ))}
                    </Dropdown>
                </Field>
                <Field
                    label="Assigned to"
                    required
                    validationMessage={touchedFields.assignedTo && formErrors.assignedTo ? formErrors.assignedTo : undefined}
                    validationState={touchedFields.assignedTo && formErrors.assignedTo ? "error" : "none"}
                >
                    <Dropdown
                        placeholder=""
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
                <Body2 as="span" style={{ display: 'block' }}>Shared with</Body2>
                <Field
                    label="Additional ministries"
                >
                    <Dropdown
                        placeholder=""
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
                        {(ministries || [])
                            .filter(ministry => ministry.id !== leadMinistry)
                            .map(ministry => (
                                <Option key={ministry.id} value={ministry.id.toString()}>
                                    {ministry.name}
                                </Option>
                            ))
                        }
                    </Dropdown>
                </Field>     
                <Field
                    label="FYI contacts"
                >
                    <Dropdown
                        placeholder=""
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
                        size="large"
                        onClick={(e) => handleSubmit(e)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                        appearance="secondary"
                        size="large"
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