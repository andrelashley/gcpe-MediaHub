
import {
    Select,
    Input,
    Button,
    makeStyles
} from "@fluentui/react-components";
import { Dismiss16Regular } from "@fluentui/react-icons";


interface PrimaryContactInputProps {
    onRemove: () => void;
}

const useStyles = makeStyles({
    socialMediaInput: {
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
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
});

const PrimaryContactInfoInput: React.FC<PrimaryContactInputProps> = ({ onRemove }) => {
    const styles = useStyles();

    return  (
        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select>
                    <option>Phone</option>
                    <option>Mobile</option>
                    <option>Email</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input />
            </div>
            <div>
                <Button
                    icon={<Dismiss16Regular />}
                    onClick={onRemove}
                    title="Remove this social media input"
                />
            </div>
        </div>
    );
}

export default PrimaryContactInfoInput;