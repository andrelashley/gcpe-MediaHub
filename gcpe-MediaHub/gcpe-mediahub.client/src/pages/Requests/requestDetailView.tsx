import React from 'react';
import { Title1, Text, Divider, Badge, Avatar } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
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
                    <Text weight="semibold" style={{ width: '140px' }}>Requested By:</Text>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Avatar name={request.requestedBy} size={24} />
                        <Text>{request.requestedBy}</Text>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Deadline</Text>
                    <Text>{new Date(request.deadline).toLocaleDateString()}</Text>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Lead Ministry</Text>
                    <Text>{request.leadMinistry}</Text>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text weight="semibold" style={{ width: '140px' }}>Assigned To</Text>
                    <Text>{request.assignedTo}</Text>
                </div>

                {request.additionalMinistry && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Text weight="semibold" style={{ width: '140px' }}>Additional Ministry</Text>
                        <Text>{request.additionalMinistry}</Text>
                    </div>
                )}

                <div style={{ marginTop: '8px' }}>
                    <Text weight="semibold" as="h3" style={{ marginBottom: '8px' }}>Details</Text>
                    <Text block style={{ whiteSpace: 'pre-wrap' }}>{request.requestDetails}</Text>
                </div>

                {request.notifiedRecipients && (
                    <div style={{ marginTop: '8px' }}>
                        <Text weight="semibold" as="h3" style={{ marginBottom: '8px' }}>Notified Recipients</Text>
                        <Text block>{request.notifiedRecipients}</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestDetailView;