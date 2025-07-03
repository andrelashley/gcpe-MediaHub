import {
    Button,
    Field,
    Input,
    makeStyles,
    Select,
} from "@fluentui/react-components";
import { Add24Regular, Dismiss16Regular} from "@fluentui/react-icons";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import OrgPhoneNumber from "./OrgPhoneNumber";
import { MediaOutlet } from "../../models/mediaOutlet";
import { OutletAssociation } from "../../models/OutletAssociation";
import { useEffect } from "react";
import { PhoneNumber } from "../../models/PhoneNumber";

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
    onAssociationDataChange: (data: OutletAssociation) => void; 
    showValidation: boolean;
}

const MediaOutletInput: React.FC<MediaOutletInputProps> = ({ onRemove, outlets, onAssociationDataChange, showValidation }) => {
    const [phoneNumbers, setPhoneNumbers] = useState<number[]>([1])
    const [contactPhones, setContactPhones] = useState<(PhoneNumber)[]>([]);
   
    const [outletId, setOutletId] = useState<number>();
    const [contactEmail, setContactEmail] = useState<string>();
    const [jobTitle, setJobTitle] = useState<string>();

    const [doesNotWorkHere, setDoesNotWorksHere] = useState<boolean>(false); 

    const association = new OutletAssociation;

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, phoneNumbers.length + 1]); // Better index handling
        setContactPhones([...contactPhones, undefined]); // Add new slot
    }
    const removePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
        setContactPhones(contactPhones.filter((_, i) => i !== index));
    };
    const getContactPhones = () => {
        let pn: PhoneNumber[] = [];
        phoneNumbers.forEach((_, index) => {
            if (contactPhones && contactPhones.length > 0) {
                const phoneNumber: PhoneNumber = contactPhones[index];
                pn.push(phoneNumber);
            }
        });

        return pn;
    }
    const validate = () => {
        const errors: string[] = [];
        if (!outletId) {
            errors.push("Media organization is required.");
        }
        if (!contactEmail) {
            errors.push("Email is required.");
        }
        if (!jobTitle) {
            errors.push("Job title is required.");
        }
        // Add more validations as needed
        return errors;
    }

    useEffect(() => {
        // Call onDataChange whenever the input changes
        onAssociationDataChange({
            contactId: undefined,
            id: undefined, //done on server
            outletId: outletId,
            contactEmail: contactEmail,
            outletName: undefined,
            noLongerWorksHere: doesNotWorkHere,
            contactPhones: getContactPhones(),
            lastRequestDate: undefined,
            mediaContact: undefined,
            mediaOutlet: undefined,
        });
    }, [outletId, contactEmail, contactPhones, doesNotWorkHere]);

    const styles = useStyles();
    // Expose the validate method to the parent component

    const handlePhoneNumberChange = (index: number, phoneNumber: any | undefined) => {
        const updatedPhones = [...contactPhones];
        updatedPhones[index] = phoneNumber;
        setContactPhones(updatedPhones);
    };
  
    return (
        <div id="outlets-section" className={styles.outletsSection}>
            <Field label="Media organization"
                required
                validationMessage={showValidation ? "Must select an organization" : undefined}
                validationState={showValidation ? "error" : "none"}
            >
                <Select
                    onChange={(_, data) => {
                        setOutletId(parseInt(data.value))
                    }}
                >
                    <option/>
                    {outlets.map((outlet) => (
                        <option value={outlet.id.toString()}
                            key={outlet.id.toString()}
                        >
                            {outlet.outletName}
                        </option>
                    ))}
                </Select>
            </Field>
            <Field label="Job title" required>
                <Select
                    onChange={(_, data) => {
                        setJobTitle(data.value)
                    } }
                >
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
                        onPhoneNumberChange={(data: PhoneNumber) => handlePhoneNumberChange(index, data)}
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