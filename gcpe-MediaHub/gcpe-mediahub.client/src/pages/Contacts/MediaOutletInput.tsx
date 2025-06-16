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
import { OutletAssociation } from "../../models/OutletAssociation";
import { useEffect } from "react";



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
    itemId: number;
}

const MediaOutletInput: React.FC<MediaOutletInputProps> = ({ onRemove, outlets, onAssociationDataChange, itemId}) => {
    const [phoneNumbers, setPhoneNumbers] = useState<number[]>([1])
    const [outletId, setOutletId] = useState<number>();
    const [contactEmail, setContactEmail] = useState<string>();
    const [jobTitle, setJobTitle] = useState<string>();
    const [phonePrimary, setPhonePrimary] = useState<number>();
    const [phoneMobile, setPhoneMobile] = useState<number>();
    const [phoneCallIn, setPhoneCallIn] = useState<number>();
    const [doesNotWorkHere, setDoesNotWorksHere] = useState<boolean>(false); 

    const association = new OutletAssociation;

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, phoneNumbers.length]);
    }
    const removePhoneNumber = (index: number) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
    };

    useEffect(() => {
        // Call onDataChange whenever the input changes
        onAssociationDataChange({
            id: itemId,
            contactId: 0,
            outletId: outletId,
            contactEmail: contactEmail,
            phoneMobile: phoneMobile,
            phonePrimary: phonePrimary,
            phoneCallIn: phoneCallIn,
            noLongerWorksHere: doesNotWorkHere,
            lastRequestDate: undefined,
            jobTitle: jobTitle,
        });
    }, [outletId, contactEmail, phonePrimary, phoneMobile, phoneCallIn, doesNotWorkHere]);

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
                {/*{phoneNumbers.map((_, index) => (*/}
                {/*    <OrgPhoneNumber key={index}*/}
                {/*        onRemove={() => removePhoneNumber(index)}*/}
                {/*        onInput={() => handlePhoneNumberChange(index)}*/}
                {/*    />*/}
                {/*))}*/}
                <Field>
                    <Field label="Primary phone" required>
                        <Input
                            onChange={(_, data) => {
                                setPhonePrimary(parseInt(data.value));
                            }}
                        />
                    </Field>
                    <Field label="Mobile phone">
                        <Input
                            onChange={(_, data) => {
                                setPhoneMobile(parseInt(data.value));
                            }}
                        />
                    </Field>
                    <Field label="Studio Call-In">
                        <Input
                            onChange={(_, data) => {
                                setPhoneCallIn(parseInt(data.value));
                            }}
                        />
                    </Field>
                </Field>
                {/*<p>*/}
                {/*<Button icon={<Add24Regular />}*/}
                {/*    className={styles.addButton}*/}
                {/*    title="Add another phone number"*/}
                {/*    onClick={addPhoneNumber}*/}
                {/*    appearance="subtle"*/}
                {/*>*/}
                {/*    Contact info*/}
                {/*    </Button>*/}
                {/*</p>*/}
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