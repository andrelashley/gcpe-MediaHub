import React from 'react';
import { Title1, Text, Divider, Badge, Avatar, Tag } from '@fluentui/react-components';
import { Dismiss24Regular, CalendarEmptyRegular } from '@fluentui/react-icons';
import { MediaRequest } from '../../api/apiClient';
import styles from './requestsCardView.module.css';

interface RequestDetailViewProps {
    request: MediaRequest;
    onClose: () => void;
}

const RequestDetailView: React.FC<RequestDetailViewProps> = ({ request, onClose }) => {
    return (
        <div className={styles.detailView}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Text weight="semibold">REQ-0001</Text>
                <Badge shape="circular" appearance="filled">{request.status}</Badge>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <Title1>{request.requestTitle}</Title1>
                <Dismiss24Regular
                    style={{ cursor: 'pointer', color: 'var(--colorNeutralForeground1)' }}
                    onClick={onClose}
                />
            </div>
            
            <Divider style={{ margin: '16px 0' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Requested By</Text>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Tag shape="circular" media={<Avatar name={request.requestedBy} size={24} />}>
                            {request.requestedBy} - {request.outlet}
                        </Tag>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Deadline</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarEmptyRegular />
                        <Text>{request.deadline ? new Date(request.deadline).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }) : 'N/A'}</Text>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Lead Ministry</Text>
                    <Tag shape="circular" appearance="outline">{request.leadMinistry}</Tag>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Assigned To</Text>
                    <Tag shape="circular" media={<Avatar name={request.assignedTo} size={24} />}>{request.assignedTo}</Tag>
                </div>

                {request.additionalMinistry && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Text weight="semibold" style={{ width: '140px' }}>Additional Ministry</Text>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {request.additionalMinistry.split(',').map((ministry, index) => (
                                <Tag key={index} shape="circular" appearance="outline">{ministry.trim()}</Tag>
                            ))}
                        </div>
                    </div>
                )}

                {request.notifiedRecipients && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                        <Text weight="semibold" style={{ width: '140px' }}>FYI Contact</Text>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {request.notifiedRecipients.split(',').map((recipient, index) => (
                                <Tag key={index} shape="circular" media={<Avatar name={recipient.trim()} size={24} />}>{recipient.trim()}</Tag>
                            ))}
                        </div>
                    </div>
                )}
                <div style={{ marginTop: '8px' }}>
                    <Text block style={{ whiteSpace: 'pre-wrap' }}>{request.requestDetails}</Text>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailView;