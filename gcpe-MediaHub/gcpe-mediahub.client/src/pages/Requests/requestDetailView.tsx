import React from 'react';
import { Text, Divider, Badge, Avatar, Tag } from '@fluentui/react-components';
import { Dismiss24Regular, CalendarEmptyRegular } from '@fluentui/react-icons';
import { MediaRequest } from "../../api/generated-client/model";
import { requestService } from "../../services/requestService";
import { useQuery } from '@tanstack/react-query';
import styles from './requestsCardView.module.css';

interface RequestDetailViewProps {
    requestNo: number;
    onClose: () => void;
}

const RequestDetailView: React.FC<RequestDetailViewProps> = ({ requestNo, onClose }) => {
    // Fetch request details using getRequestByRequestNo (React Query v5+ object form)
    const { data: request, isLoading, error } = useQuery<MediaRequest>({
        queryKey: ['requestDetail', requestNo],
        queryFn: async () => await requestService.getRequestByRequestNo(requestNo),
        enabled: !!requestNo,
    });

    // Debug logging for troubleshooting
    React.useEffect(() => {
        if (!isLoading) {
            // Only log if not loading
            console.log('RequestDetailView:', { requestNo, error, request });
        }
    }, [requestNo, error, request, isLoading]);

    // Helper to display assigned user full name (never ID/idir if name is present)
    const getAssignedUserDisplay = () => {
        if (request?.assignedUser) {
            if (request.assignedUser.fullName && request.assignedUser.fullName.trim()) {
                return request.assignedUser.fullName;
            }
            if (request.assignedUser.idir && request.assignedUser.idir.trim()) {
                return request.assignedUser.idir;
            }
            if (request.assignedUser.id && request.assignedUser.id.trim()) {
                return request.assignedUser.id;
            }
        }
        if (request?.assignedUserId) {
            return 'Unassigned'; // Only show 'Unassigned' if no assignedUser object
        }
        return 'Unassigned';
    };

    // Helper to get initials for Avatar (prefer fullName, then idir, then id)
    const getAssignedUserInitials = () => {
        if (request?.assignedUser) {
            const name = request.assignedUser.fullName && request.assignedUser.fullName.trim()
                ? request.assignedUser.fullName
                : request.assignedUser.idir && request.assignedUser.idir.trim()
                    ? request.assignedUser.idir
                    : request.assignedUser.id && request.assignedUser.id.trim()
                        ? request.assignedUser.id
                        : '';
            const parts = name.split(' ');
            if (parts.length >= 2) {
                return (parts[0][0] || '') + (parts[1][0] || '');
            } else if (parts.length === 1 && parts[0].length > 0) {
                return parts[0][0];
            }
        }
        return '';
    };

    // Helper to display FYI contact user full name (never ID/idir if name is present)
    const getFyiContactUserDisplay = () => {
        if (request?.fyiContactUser) {
            if (request.fyiContactUser.fullName && request.fyiContactUser.fullName.trim()) {
                return request.fyiContactUser.fullName;
            }
            if (request.fyiContactUser.idir && request.fyiContactUser.idir.trim()) {
                return request.fyiContactUser.idir;
            }
            if (request.fyiContactUser.id && request.fyiContactUser.id.trim()) {
                return request.fyiContactUser.id;
            }
        }
        if (request?.fyiContactUserId) {
            return 'Unassigned';
        }
        return 'Unassigned';
    };

    // Helper to get initials for FYI Contact Avatar
    const getFyiContactUserInitials = () => {
        if (request?.fyiContactUser) {
            const name = request.fyiContactUser.fullName && request.fyiContactUser.fullName.trim()
                ? request.fyiContactUser.fullName
                : request.fyiContactUser.idir && request.fyiContactUser.idir.trim()
                    ? request.fyiContactUser.idir
                    : request.fyiContactUser.id && request.fyiContactUser.id.trim()
                        ? request.fyiContactUser.id
                        : '';
            const parts = name.split(' ');
            if (parts.length >= 2) {
                return (parts[0][0] || '') + (parts[1][0] || '');
            } else if (parts.length === 1 && parts[0].length > 0) {
                return parts[0][0];
            }
        }
        return '';
    };

    if (isLoading) return <div>Loading...</div>;
    if (error || !request) return <div>Failed to load request details.</div>;

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
                        <Avatar 
                            name={getAssignedUserDisplay()}
                            size={24}
                            initials={getAssignedUserInitials()}
                        />
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
                                    initials={getFyiContactUserInitials()}
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