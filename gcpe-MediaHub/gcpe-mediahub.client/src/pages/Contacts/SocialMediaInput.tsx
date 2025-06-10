import {
    Button,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { Dismiss16Regular} from "@fluentui/react-icons";

const useStyles = makeStyles({
    socialMediaInput: {
        display: "flex",
        alignItems: "flex-end",
        gap: "Global.Size.80",
        alignSelf: "stretch",
    },
    platformSelector: {
        width: "128px",
    },
    linkInput: {
        width: "100%",
        '& span': {
            width: "95%",
        },
    },
    subtractButton: {
     
    },
});

interface SocialMediaInputProps {
    onRemove: () => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ onRemove }) => {
    const styles = useStyles();

    return (

        <div id="socialMedia" className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select>
                    <option></option>
                    <option>Instagram</option>
                    <option>Social Media Option 3</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input placeholder="https://" />
            </div>
            <div>
                <Button
                    icon={<Dismiss16Regular />}
                    className={styles.subtractButton}
                  
                    onClick={onRemove}
                    title="Remove this social media input"
                />
            </div>
        </div>
    );
}

export default SocialMediaInput;
