import * as React from "react";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    OverlayDrawer,
    Button,
    useRestoreFocusSource,
    useRestoreFocusTarget,
    Field,
    Input,
    Checkbox,
    makeStyles,
    Divider,
} from "@fluentui/react-components";

import { Dismiss24Regular, Add24Regular } from "@fluentui/react-icons";
import SocialMediaInput from "./SocialMediaInput";
import { useState } from "react";
import MediaOutletInput from "./MediaOutletInput";
import PrimaryContactInfoInput from "./PrimaryContactInfoInput";


const useStyles = makeStyles({
    drawer: {
        width: "650px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontSize: "16px",
        gap: "Global.Size.20",
        '& div': {
            marginBottom: "10px",
        },
    },
    title: {
        fontSize: "var(--Font - size - 500, 20px)",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "var(--Line - height - 500, 28px)",
    },
    formGroup: {
        display: "inline-flex",
    },
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

    },
    maxWidth: {
        width: "100%",
    },
    saveCancelButtons: {
        marginTop: "20px",
        '& Button': {
            marginRight: "8px",
        },
    },
}
);


export const CreateContactDrawer = () => {
    const createContact = () => {
        console.log("create contact");
        setIsOpen(false)
    };
    const [isOpen, setIsOpen] = React.useState(false);

    //for primary contact info input tracking
    const [primaryContactInfoInputs, setPrimaryContactInfoInputs] = useState<number[]>([1]);
    const addPrimaryContactInfoInput = () => {
        setPrimaryContactInfoInputs([...primaryContactInfoInputs, primaryContactInfoInputs.length]);
    };
    const removePrimaryContactInfoInput = (index: number) => {
        setPrimaryContactInfoInputs(primaryContactInfoInputs.filter((_, i) => i !== index));
    };
    // for tracking social media link inputs
    const [socialMediaInputs, setSocialMediaInputs] = useState<number[]>([1]);
    const addSocialMediaInput = () => {
        setSocialMediaInputs([...socialMediaInputs, socialMediaInputs.length]);
    };
    const removeSocialMediaInput = (index: number) => {
        setSocialMediaInputs(socialMediaInputs.filter((_, i) => i !== index));
    };
    // end of social media link tracking
    // for tracking social media link inputs
    const [outletInputs, setOutletInputs] = useState<number[]>([1]);
    const addOutletInput = () => {
        setOutletInputs([...outletInputs, outletInputs.length]);
    };
    const removeOutletInput = (index: number) => {
        setOutletInputs(outletInputs.filter((_, i) => i !== index));
    };
    // end of social media link tracking

    const styles = useStyles();
    // all Drawers need manual focus restoration attributes
    // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
    const restoreFocusTargetAttributes = useRestoreFocusTarget();
    const restoreFocusSourceAttributes = useRestoreFocusSource();

    return (
        /*we can probably break some of this out into separate components*/
        <div>
            <OverlayDrawer
                as="aside"
                {...restoreFocusSourceAttributes}
                open={isOpen}
                onOpenChange={(_, { open }) => setIsOpen(open)}
                className={styles.drawer}
                position="end"
            >
                <DrawerHeader>
                    <DrawerHeaderTitle
                        action={
                            <Button
                                appearance="subtle"
                                aria-label="Close"
                                icon={<Dismiss24Regular />}
                                onClick={() => setIsOpen(false)}
                            />
                        }
                    >
                        <div className={styles.title}>New Contact</div>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <Field label="First name" required>
                        <Input />
                    </Field>
                    <Field label="Last name" required>
                        <Input />
                    </Field>
                    <Checkbox
                        label="Press gallery"
                    />

                    <Field label="Primary Contact Info" required>
                        <div id="primaryContactInfo">
                            {primaryContactInfoInputs.map((_, index) => (
                                <PrimaryContactInfoInput key={index} onRemove={() => removePrimaryContactInfoInput(index)} />
                            ))}
                        </div>
                    </Field>
                    <p>
                        <Button appearance="subtle"
                            className={styles.addButton}
                            icon={<Add24Regular />}
                            title="Add a new primary contact info input"
                            onClick={addPrimaryContactInfoInput}
                        >
                            Contact info
                        </Button>
                    </p> <br />
                    <Field label="Online Presence" className={styles.maxWidth}>
                        <div >
                            {socialMediaInputs.map((_, index) => (
                                <SocialMediaInput key={index} onRemove={() => removeSocialMediaInput(index)} />
                            ))}
                        </div>
                    </Field>
                    <p>
                        <Button appearance="subtle"
                            className={styles.addButton}
                            icon={<Add24Regular />}
                            title="Add a new social media input"
                            onClick={addSocialMediaInput}
                        >
                            Social Media
                        </Button>
                    </p>
                    <Divider />
                    <label htmlFor="outlets-section">Workplaces</label>


                    {outletInputs.map((_, index) => (
                        <MediaOutletInput key={index} onRemove={() => removeOutletInput(index)} />
                    ))}


                    <Button
                        icon={<Add24Regular />}
                        className={styles.addButton}
                        title="Add a media outlet"
                        appearance="subtle"
                        onClick={addOutletInput}
                    >
                        Workplace
                    </Button>

                    <div className={styles.saveCancelButtons}>
                        <Button
                            aria-label="Create this contact"
                            appearance="primary"
                            onClick={() => createContact()}
                        >
                            Save
                        </Button>
                        <Button
                            aria-label="Cancel and close this dialog"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </DrawerBody>
            </OverlayDrawer>

            <Button
                {...restoreFocusTargetAttributes}
                appearance="primary"
                onClick={() => setIsOpen(true)}
            >
                Create
            </Button>

        </div>
    );
};

export default CreateContactDrawer;