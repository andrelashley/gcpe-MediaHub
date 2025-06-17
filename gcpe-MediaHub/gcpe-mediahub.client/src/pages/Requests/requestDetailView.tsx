import React from 'react';
import { Text, Divider, Badge, Avatar, Tag } from '@fluentui/react-components';
import { Dismiss24Regular, CalendarEmptyRegular } from '@fluentui/react-icons';
import { MediaRequest } from "../../api/generated-client/model";
import styles from './requestsCardView.module.css';

interface RequestDetailViewProps {
    request: MediaRequest;
    onClose: () => void;
}

const RequestDetailView: React.FC<RequestDetailViewProps> = ({ request, onClose }) => {
    // Helper to display assigned user idir
    const getAssignedUserDisplay = () => {
        if (request.assignedUser) {
            return request.assignedUser.idir || request.assignedUser.id || request.assignedUserId || 'Unassigned';
        }
        if (request.assignedUserId) {
            return request.assignedUserId;
        }
        return 'Unassigned';
    };

    // Helper to display FYI contact user idir
    const getFyiContactUserDisplay = () => {
        if (request.fyiContactUser) {
            return request.fyiContactUser.idir || request.fyiContactUser.id || request.fyiContactUserId || 'Unassigned';
        }
        if (request.fyiContactUserId) {
            return request.fyiContactUserId;
        }
        return 'Unassigned';
    };

    return (
        <div className={styles.detailView} style={{ position: 'relative', top: 0 }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 10,
                    padding: 0,
                    lineHeight: 0
                }}
                aria-label="Close"
            >
                <Dismiss24Regular style={{ color: 'var(--colorNeutralForeground1)' }} />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '30px' }}>
                <Text weight="semibold">REQ-{request.requestNo}</Text>
                <Badge shape="circular" appearance="filled">
                  {request.requestStatus?.name || request.requestStatusId || "Unknown"}
                </Badge>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3>{request.requestTitle}</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Requested By</Text>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Tag shape="circular" media={
                            <Avatar
                                name={`${request.requestorContact?.firstName} ${request.requestorContact?.lastName}`}
                                size={24}
                            />
                        }>
                            {`${request.requestorContact?.firstName} ${request.requestorContact?.lastName}`} - {request.requestorOutlet?.outletName || 'Unknown'}
                        </Tag>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Deadline</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarEmptyRegular />
                        <Text>{request.deadline ? new Date(request.deadline).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : 'N/A'}</Text>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Received On</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarEmptyRegular />
                        <Text>{request.receivedOn ? new Date(request.receivedOn).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : 'N/A'}</Text>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Request Type</Text>
                    {request.requestType?.name && (
                        <Tag shape="circular" appearance="outline">{request.requestType.name}</Tag>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Lead Ministry</Text>
                    {request.leadMinistry && (
                        <Tag shape="circular" appearance="outline">{request.leadMinistry.acronym || 'Unknown'}</Tag>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Resolution</Text>
                    <Text>{request.requestResolution?.name || 'Pending'}</Text>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Assigned To</Text>
                    <Tag shape="circular" media={
                        <Avatar name={getAssignedUserDisplay()} size={24} />
                    }>
                        {getAssignedUserDisplay()}
                    </Tag>
                </div>

                {/* Additional Ministries: always show label, blank if none */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>Additional Ministries</Text>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {Array.isArray(request.additionalMinistries) && request.additionalMinistries.length > 0
                            ? request.additionalMinistries.map((ministry, index) => (
                                <Tag key={index} shape="circular" appearance="outline">{ministry.acronym || 'Unknown'}</Tag>
                              ))
                            : null
                        }
                    </div>
                </div>

                {/* FYI Contact: always show label, blank if none */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '210px' }}>FYI Contact</Text>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {request.fyiContactUser ? (
                            <Tag shape="circular" media={
                                <Avatar
                                    name={getFyiContactUserDisplay()}
                                    size={24}
                                />
                            }>
                                {getFyiContactUserDisplay()}
                            </Tag>
                        ) : null}
                    </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                    <Text weight="semibold">Request Details</Text>
                    <Text block style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>{request.requestDetails}</Text>
                </div>

                {request.response && (
                    <div style={{ marginTop: '8px' }}>
                        <Text weight="semibold">Response</Text>
                        <Text block style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>{request.response}</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestDetailView;