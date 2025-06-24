
import { Button } from "@fluentui/react-components";
import { Info24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import styles from './MediaHeader.module.css';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AlphaInfo = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    const handleFeedbackClick = () => {
        const navigate = useNavigate();
        navigate('https://teams.microsoft.com/l/channel/19%3A97e62e1a8b9947479036fba8727207f6%40thread.tacv2/Media%20Hub%202.0%20UX?groupId=58c5efde-591f-4653-823a-c26fd95123df&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc&ngc=true');
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.alphaDisclaimer}>
            <div className={styles.alphaInfoIcon}>
                <p>
                    <Info24Regular />
                </p>
            </div>
            <div>
                <p>Alpha Release Notice</p>
                <p className={styles.disclaimerText}>This version is to test user satisfaction and collect feedback. Features may change, and updates will come frequently during this phase.</p>
                <p>If you experience any issues or have feedback, please share them in the Teams channel.</p>

            </div>
            <div className={styles.alphaDisclaimerDismiss}>
                {/*<Button*/}
                {/*    icon={<Dismiss24Regular color={"ivory"} />}*/}
                {/*    appearance="subtle"*/}
                {/*    onClick={handleDismiss}*/}
                {/*    title="this button is not enabled in alpha."*/}
                  
                {/*    />*/}
                <Button
                    onClick={handleFeedbackClick}
                >
                Share Feedback
                </Button>
            </div>
        </div>
    );
}


export default AlphaInfo;