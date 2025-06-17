
import { Button } from "@fluentui/react-components";
import { Info24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import styles from './MediaHeader.module.css';
import { useState } from "react";

const AlphaInfo = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

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
                <p>If you experience any issues or have feedback, please share via the [Bug Report Form].</p>

            </div>
            <div className={styles.alphaDisclaimerDismiss}>
                <Button
                    icon={<Dismiss24Regular color={"ivory"} />}
                    appearance="subtle"
                    onClick={handleDismiss}
                    />
            </div>
        </div>
    );
}


export default AlphaInfo;