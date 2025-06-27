import {
    Button,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import { useState } from "react";

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
    onPhoneNumberChange: (index: number, phoneNumber: string | undefined) => void;
}

const OrgPhoneNumber: React.FC<OrgPhoneProps> = ({ onRemove, onPhoneNumberChange }) => {
    const [type, setType] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>();

    const styles = useStyles();

    const handlePhoneNumberChange = (value: string) => {
        const number = value ? value : undefined;
        setPhoneNumber(number);
        onPhoneNumberChange(number); // Call the callback with the new phone number
    };
    return (
        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select
                    onChange={(_, data) => {
                        setType(data.value)
                    }}
                >
                    {/*need to map this bit from actual data, not hard coded */}
                    <option value='primary'>Primary</option>
                    <option value='mobile'>Mobile</option>
                    <option value='callIn'>Call-In</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input
                    onChange={(_, data) => {
                        handlePhoneNumberChange(data.value);
                    } }
                />
            </div>
            <div className={styles.dismissButton}>
                <Button
                    icon={<Dismiss12Regular />}
                    onClick={onRemove}
                    title="Remove phone number"
                    disabled={true}
                />
            </div>
        </div>
    );
}

export default OrgPhoneNumber;
