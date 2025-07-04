import {
    Button,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { PhoneNumber } from "../../models/PhoneNumber";

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
    onPhoneNumberChange: (data: any) => void;
}

const OrgPhoneNumber: React.FC<OrgPhoneProps> = ({ onRemove, onPhoneNumberChange }) => {
    const [type, setType] = useState<string>('primary');
    const [phoneNumber, setPhoneNumber] = useState<string>();

    useEffect(() => {
        // Call onDataChange whenever the input changes
        onPhoneNumberChange({
            PhoneType: type,
            PhoneLineNumber: phoneNumber,
        });
    }, [type, phoneNumber]);
    const styles = useStyles();

    return (
        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select
                    onChange={(_, data) => {
                        setType(data.value)
                    }}
                >
                    {/*need to map this bit from actual data, not hard coded 
                    or pass it as a prop, since we might not always want "call-in"    
                    */}
                    <option value='primary'>Primary</option>
                    <option value='mobile'>Mobile</option>
                    <option value='callIn'>Call-In</option>
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input
                    onChange={(_, data) => {
                        setPhoneNumber(data.value);
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
