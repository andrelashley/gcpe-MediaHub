
import {
    Select,
    Input,
    Button,
    makeStyles
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";


interface PrimaryContactInputProps {
    onRemove: () => void;
}

const useStyles = makeStyles({
    socialMediaInput: {
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        alignSelf: "stretch",
        justifyContent: "center",
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

const PrimaryContactInfoInput: React.FC<PrimaryContactInputProps> = ({ onRemove }) => {
    const styles = useStyles();

    return  (
        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select>
                    <option value="primary">Phone</option>
                    <option value="mobile">Mobile</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input />
            </div>
            <div className={styles.dismissButton }>
                <Button
                    icon={<Dismiss12Regular />}
                    onClick={onRemove}
                    title="Remove this contact info"
                />
            </div>
        </div>
    );
}

export default PrimaryContactInfoInput;