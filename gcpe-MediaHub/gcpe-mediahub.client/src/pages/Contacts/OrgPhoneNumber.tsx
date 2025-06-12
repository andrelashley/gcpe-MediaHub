import {
    Button,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    socialMediaInput: {
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        alignSelf: "stretch",
        minWidth: "81px",
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
    dismissButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "8px",
        '& Button': {
            maxWidth: "18px",
            minWidth: "18px",
            maxHeight: "18px",
        },
    },
});

interface OrgPhoneProps {
    onRemove: () => void;
}

const OrgPhoneNumber: React.FC<OrgPhoneProps> = ({ onRemove }) => {

    const styles = useStyles();
    return (
        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select>
                    {/*need to map this bit from actual data, not hard coded */}
                    <option value='primary'>Primary</option>
                    <option value='mobile'>Mobile</option>
                    <option value='callIn'>Call-In</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input placeholder="https://" />
            </div>
            <div className={styles.dismissButton}>
                <Button
                    icon={<Dismiss12Regular />}
                    onClick={onRemove}
                    title="Remove phone number"
                />
            </div>
        </div>
    );
}

export default OrgPhoneNumber;
