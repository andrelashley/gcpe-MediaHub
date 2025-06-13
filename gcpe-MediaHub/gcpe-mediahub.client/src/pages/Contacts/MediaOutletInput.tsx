import {
    Button,
    Field,
    Input,
    makeStyles,
    Select,
} from "@fluentui/react-components";
import { Add24Regular, Dismiss16Regular} from "@fluentui/react-icons";
import React, { useState } from "react";
import OrgPhoneNumber from "./OrgPhoneNumber";
import { MediaOutlet } from "../../models/MediaOutlet";



const useStyles = makeStyles({
    addButton: {
        float: "right",
    },
    outletsSection: {
        border: "1px solid #ccc!important",
        borderRadius: "4px",
        padding: "8px",
        marginBottom: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.80",
        alignSelf: "stretch",
        '& .fui-Field': {
            width: "100%",
        },
    },
});



interface MediaOutletInputProps {
    onRemove: () => void;
    outlets: MediaOutlet[];
}

const MediaOutletInput: React.FC<MediaOutletInputProps> = ({ onRemove, outlets }) => {
    const [phoneNumbers, setPhoneNumbers] = useState<number[]>([1])
    const [outletId, setOutletId] = useState<number>();
    const [contactEmail, setContactEmail] = useState<string>();
    const [phonePrimary, setPhonePrimary] = useState<number>();
    const [phoneMobile, setPhoneMobile] = useState<number>();
    const [phoneCallIn, setPhoneCallIn] = useState<number>();
    const [worksHere, setWorksHere] = useState<boolean>(true);


    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, phoneNumbers.length]);
    }
    const removePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    };

    const handlePhoneNumberChange = (key: number) => {
        console.log(`phone number changed from media outlet with index = ${key}`);
    }

    const styles = useStyles();

    return (
        <div id="outlets-section" className={styles.outletsSection}>
            <Field label="Media organization" required>
                <Select
                    onChange={(_, data) => {
                        setOutletId(parseInt(data.value))
                    }}
                >
                    <option/>
                    {outlets.map((outlet) => (
                        <option value={outlet.id.toString()}>{outlet.name}</option>
                    ))}
                </Select>
            </Field>
            <Field label="Job title" required>
                <Select>
                    {/*need to map this bit from actual data, not hard coded */}
                    <option>Reporter</option>
                    <option>Photographer</option>
                </Select>
            </Field>
            <Field label="Email" required>
                <Input
                    onChange={(_, data) => {
                        setContactEmail(data.value)
                    } }
                />
            </Field>

            <Field label="Phone" required>
                {phoneNumbers.map((_, index) => (
                    <OrgPhoneNumber key={index}
                        onRemove={() => removePhoneNumber(index)}
                        onInput={() => handlePhoneNumberChange(index)}
                    />
                ))}
                <p>
                <Button icon={<Add24Regular />}
                    className={styles.addButton}
                    title="Add another phone number"
                    onClick={addPhoneNumber}
                    appearance="subtle"
                >
                    Contact info
                    </Button>
                </p>
            </Field>
            <Button
                icon={<Dismiss16Regular />}
                className={styles.addButton}
                title="Remove this outlet"
                onClick={onRemove}
            />
        </div>
    );
}

export default MediaOutletInput;