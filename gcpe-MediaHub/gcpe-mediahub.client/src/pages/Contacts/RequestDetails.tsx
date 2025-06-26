import React from 'react';
import { Badge, Divider, makeStyles, Tag, TagGroup } from '@fluentui/react-components';

interface RequestDetailsProps {
    request: any; //Todo: use proper type
}

const useStyles = makeStyles({
    container: {
        border: "1px solid #ccc!important",
        padding: "4px",
        width: "100%",
        marginBottom: "6px",
        borderRadius: "6px",
    },
    inline: {
        display: "inline-flex",
        width: "100%",
        justifyContent: "space-between",
    },
    requestName: {
        fontWeight: "600",
    },
    warning: {
        color: "orange",
        display: "inline-flex",
    },
    floatRight: {
        
    }
});

const RequestDetails: React.FC<RequestDetailsProps> = ({ request }) => {
    const styles = useStyles();
  // console.log(JSON.stringify(request));
    return (
        <div className={styles.container}>
            <div className={styles.inline}>
                <div>REQ-{request.requestNo}</div>
                <div className={styles.floatRight}>
                    <Badge>
                    Created
                    </Badge>
                </div>
            </div>
            <div className={styles.requestName}>{request.requestTitle}</div>
            <div>{request.deadline? request.deadline : "deadline goes here"} </div>
            <Divider />
            <TagGroup>
                {request.leadMinistry ? 
                    <Tag shape="circular" appearance="outline">{request.leadMinistry}</Tag> :
                    <Tag shape="circular" appearance="outline">Ministry</Tag>
                    }
            </TagGroup>
        </div>
    );
}

export default RequestDetails