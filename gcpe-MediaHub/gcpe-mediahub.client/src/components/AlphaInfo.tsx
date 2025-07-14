
import { Button } from "@fluentui/react-components";
import { Info24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import styles from './MediaHeader.module.css';
import { useState } from "react";


const AlphaInfo = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    const handleFeedbackClick = () => {
        console.log("feedback button");
        window.open('https://teams.microsoft.com/l/channel/19%3A97e62e1a8b9947479036fba8727207f6%40thread.tacv2/Media%20Hub%202.0%20UX?groupId=58c5efde-591f-4653-823a-c26fd95123df&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc&ngc=true');
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.alphaDisclaimerBackground }>
        <div className={styles.alphaDisclaimer}>

                <div className={styles.alphaInfoIcon}>
                    <Info24Regular />
                </div>
                <div className={styles.alphaInfoContent}>
                    <h3>Alpha release notice</h3>
                    <p className={styles.disclaimerText}>This version is to test user satisfaction and collect feedback. Features may change, and updates will come frequently during this phase.
                        If you experience any issues or have feedback, please share them in the <a className={styles.alphaReportLink} href='https://teams.microsoft.com/l/channel/19%3A97e62e1a8b9947479036fba8727207f6%40thread.tacv2/Media%20Hub%202.0%20UX?groupId=58c5efde-591f-4653-823a-c26fd95123df&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc&ngc=true'>Media Hub 2.0 Channel</a>.
                    </p>

                </div>
                <div className={styles.alphaDisclaimerDismiss}>
                    {/*<Button*/}
                    {/*    icon={<Dismiss24Regular color={"ivory"} />}*/}
                    {/*    appearance="subtle"*/}
                    {/*    onClick={handleDismiss}*/}
                    {/*    title="this button is not enabled in alpha."*/}

                    {/*    />*/}
                    <Button className={styles.alphaFeedbackButton}

                        onClick={() => handleFeedbackClick()}
                    >
                        Share feedback
                    </Button>
                </div>
          
            </div>
        </div>
    );
}


export default AlphaInfo;