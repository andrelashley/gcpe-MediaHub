import {
    Button,
    Combobox,
    Field,
    Input,
    makeStyles,
} from "@fluentui/react-components";
import { AddCircle24Regular, SubtractCircle24Regular } from "@fluentui/react-icons";
import React from "react";
import OrgPhoneNumber from "./OrgPhoneNumber";


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
}

const MediaOutletInput: React.FC<MediaOutletInputProps> = ({ onRemove }) => {
    const [phoneNumbers, setPhoneNumbers] = React.useState<number[]>([1])

    const addPhoneNumber = () => {
    
        setPhoneNumbers([...phoneNumbers, phoneNumbers.length]);
    }
    const removePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    };
    const styles = useStyles();

    return (
        <div id="outlets-section" className={styles.outletsSection}>
            <Field label="Media organization" required>
                <Combobox>
                    {/*need to map this bit from actual data, not hard coded */}
                    <option>Media Outlet 1</option>
                    <option>Media Outlet 2</option>
                    <option>Media Outlet 3</option>
                </Combobox>
            </Field>
            <Field label="Job title" required>
                <Combobox>
                    {/*need to map this bit from actual data, not hard coded */}
                    <option>Reporter</option>
                    <option>Photographer</option>
                </Combobox>
            </Field>
            <Field label="Email" required>
                <Input />
            </Field>

            <Field label="Phone" required>
                {phoneNumbers.map((_, index) => (
                    <OrgPhoneNumber key={index} onRemove={() => removePhoneNumber(index)} />
                ))}
                <Button icon={<AddCircle24Regular />}
                    className={styles.addButton}
                    title="Add another phone number"
                    onClick={addPhoneNumber}
                >
                    Add phone
                </Button>
            </Field>
            <Button
                icon={<SubtractCircle24Regular />}
                className={styles.addButton}
                title="Remove this outlet"
                onClick={onRemove}
            >
                Remove this Outlet
            </Button>
        </div>
    );
}

export default MediaOutletInput;