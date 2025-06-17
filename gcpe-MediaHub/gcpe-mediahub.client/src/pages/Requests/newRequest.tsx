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
import { RequestStatus, RequestType } from './types';
import { ministryService } from '../../services/ministryService';
import { Ministry, MediaRequest } from '../../api/generated-client/model';
import { createRequest } from '../../services/requestService';
import { CalendarEmpty24Regular, Dismiss24Regular } from '@fluentui/react-icons';
import styles from './newRequest.module.css';

interface NewRequestPageProps {
    onClose?: () => void;
}

const NewRequestPage: React.FC<NewRequestPageProps> = ({ onClose }) => {
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

    const [status, setStatus] = React.useState<RequestStatus | null>(null);
    const [requestType, setRequestType] = React.useState<RequestType | null>(null);
    const [ministries, setMinistries] = React.useState<Ministry[]>([]);
    const [leadMinistry, setLeadMinistry] = React.useState<number | null>(null);
    const [additionalMinistries, setAdditionalMinistries] = React.useState<number[]>([]);
    const [assignedTo, setAssignedTo] = React.useState('');
    const [notifiedRecipients, setNotifiedRecipients] = React.useState('');
    const [requestDetails, setRequestDetails] = React.useState('');
    const [requestTitle, setRequestTitle] = React.useState('');
    const [requestedBy, setRequestedBy] = React.useState('');
    const [deadline, setDeadline] = React.useState('');
    const [receivedOn, setReceivedOn] = React.useState('');
    const [showValidation, setShowValidation] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const statusOptions = Object.entries(RequestStatus)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => ({
            text: key,
            value: RequestStatus[key as keyof typeof RequestStatus].toString()
        }));

    const requestTypeOptions = Object.entries(RequestType)
        .filter(([key]) => isNaN(Number(key)))
        .map(([key]) => {
            // Format the display text (e.g., "ScrumHalls" -> "Scrum/Halls")
            const text = key === 'ScrumHalls' ? 'Scrum/Halls' : key;
            return {
                text,
                value: RequestType[key as keyof typeof RequestType].toString()
            };
        });

    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const receivedOnInputRef = React.useRef<HTMLInputElement>(null);

    // Example submit handler using createRequest
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowValidation(true);
        setError(null);

        // Map form state to the correct MediaRequest shape for your API
        const newRequest: MediaRequest = {
            requestTitle,
            requestDetails,
            deadline,
            receivedOn,
            leadMinistryId: leadMinistry || 0,
            additionalMinistries: additionalMinistries.map(id => ({
                id,
                name: ministries.find(m => m.id === id)?.name || '',
                acronym: ''
            })),
            requestStatusId: 1, // We'll update this when we integrate with the API
            requestTypeId: 1, // We'll update this when we integrate with the API
            requestorContactId: '00000000-0000-0000-0000-000000000000', // Default UUID for now
            assignedUserId: '00000000-0000-0000-0000-000000000000', // Default UUID for now
            requestorOutletId: '00000000-0000-0000-0000-000000000000', // Default UUID for now
            requestResolutionId: 1, // Default value
            response: ''
        };

        setIsSubmitting(true);
        try {
            await createRequest(newRequest);
            setIsSubmitting(false);
            if (onClose) onClose();
        } catch (err: any) {
            setIsSubmitting(false);
            setError(err?.message || "Failed to create request");
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
                    validationMessage={showValidation && !status ? "Status is required" : undefined}
                    validationState={showValidation && !status ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a status"
                        selectedOptions={status ? [status.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setStatus(data.optionValue as RequestStatus);
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
                            }
                        }}
                    >
                        {statusOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.text}
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
                        placeholder="Enter name of requester"
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
                    validationMessage={showValidation && !requestType ? "Request type is required" : undefined}
                    validationState={showValidation && !requestType ? "error" : "none"}
                >
                    <Dropdown
                        placeholder="Select a request type"
                        selectedOptions={requestType ? [requestType.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setRequestType(data.optionValue as RequestType);
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
                            }
                        }}
                    >
                        {requestTypeOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.text}
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
                        selectedOptions={leadMinistry ? [leadMinistry.toString()] : []}
                        onOptionSelect={(_, data) => {
                            if (data.optionValue) {
                                setLeadMinistry(Number(data.optionValue));
                                setShowValidation(false);
                            }
                        }}
                        onOpenChange={(_, data) => {
                            if (!data.open) {
                                setShowValidation(true);
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
                        selectedOptions={additionalMinistries.map(id => id.toString())}
                        size="medium"
                        multiselect
                        onOptionSelect={(_, data) => {
                            const selectedIds = data.selectedOptions.map(Number);
                            // Filter out the lead ministry if it's selected
                            const filteredIds = leadMinistry
                                ? selectedIds.filter(id => id !== leadMinistry)
                                : selectedIds;
                            setAdditionalMinistries(filteredIds);
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
                    label="Notified Recipient(s)"
                >
                    <Input
                        placeholder="Enter recipient names"
                        value={notifiedRecipients}
                        onChange={(_, data) => {
                            setNotifiedRecipients(data.value);
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
                        onClick={() => {
                            // TODO: Handle save
                            setShowValidation(true);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewRequestPage;