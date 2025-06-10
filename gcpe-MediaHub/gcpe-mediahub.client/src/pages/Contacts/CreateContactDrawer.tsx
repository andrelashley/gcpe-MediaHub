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
    TagPicker,
    TagPickerList,
    TagPickerGroup,
    TagPickerInput,
    Tag,
    TagPickerControl,
    TagPickerOption,
    makeStyles,
    Divider,
    Combobox,
} from "@fluentui/react-components";

import { Dismiss24Regular, AddCircle24Regular} from "@fluentui/react-icons";
import type { TagPickerProps } from "@fluentui/react-components";
import SocialMediaInput from "./SocialMediaInput";
import { useState } from "react";
import MediaOutletInput from "./MediaOutletInput";


const useStyles = makeStyles({
    drawer: {
        width: "650px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.20",
    },
    title:{
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
        '& .fui-Field': {
            width: "100%",
        },
    },
}
);

export const CreateContactDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);

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
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const languageOptions = [
        "English",
        "French",
        "Chinese",
        "Tagalog",
        "Hindi",
    ];

    const onOptionSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
        if (data.value === "no-options") {
            return e;
        }
        setSelectedOptions(data.selectedOptions);
    };

    const tagPickerOptions = languageOptions.filter(
        (option) => !selectedOptions.includes(option)
    );

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
                        <div className={styles.title }>New Contact</div>
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
                    <Field label="Language" required>
                        <TagPicker
                            onOptionSelect={onOptionSelect}
                            selectedOptions={selectedOptions}
                        >
                            <TagPickerControl>
                                <TagPickerGroup aria-label="Selected Languages">
                                    {selectedOptions.map((option) => (
                                        <Tag
                                            key={option}
                                            shape="rounded"
                                            value={option}
                                        >
                                            {option}
                                        </Tag>
                                    ))}
                                </TagPickerGroup>
                                <TagPickerInput aria-label="Select languages" />
                            </TagPickerControl>
                            <TagPickerList>
                                {tagPickerOptions.length > 0 ? (
                                    tagPickerOptions.map((option) => (
                                        <TagPickerOption
                                           
                                            value={option}
                                            key={option}
                                        >
                                            {option}
                                        </TagPickerOption>
                                    ))
                                ) : (
                                    <TagPickerOption value="no-options">
                                        No options available
                                    </TagPickerOption>
                                )}
                            </TagPickerList>
                            </TagPicker>
                    </Field>
                    <Field label="Website" >
                        <Input placeholder="https://" />
                    </Field>
                    {/* social media stuff goes here*/}
         
                    {/*this should for shizz be its own component*/}
                    <Field label="Social Media">
                        <div id="socialMedia">
                            {socialMediaInputs.map((_, index) => (
                                <SocialMediaInput key={index} onRemove={() => removeSocialMediaInput(index)} />
                            ))}
                        </div>
                    </Field>
                    <Button appearance="subtle"
                        className={styles.addButton}
                        icon={<AddCircle24Regular />}
                        title="this has no functionality yet"
                        onClick={addSocialMediaInput}
                    >
                        Add Social Media
                    </Button>
                    <Divider />
                    <label htmlFor="outlets-section">Outlets</label>
                    
               
                        {outletInputs.map((_, index) => (
                            <MediaOutletInput key={index} onRemove={() => removeOutletInput(index)} />
                        ))}
                     
        
                    <Button
                        icon={<AddCircle24Regular />}
                        className={styles.addButton}
                        title="Add a media outlet"
                        appearance="subtle"
                        onClick={addOutletInput}
                    >
                        Add Outlet
                    </Button>
                    <Divider/>
                    <label htmlFor="interests-section">Interests and Outreach</label>
                    <div id="interests-section" className={styles.outletsSection}>
                        {/* this too should be a separate component */}
                        <Field label="Cities">
                            <Combobox>
                                <option>Prince George</option>
                                <option>Cranbrook</option>
                                <option>Kamloops</option>
                                <option>Kimberley</option>
                                <option>Vancouver</option>
                                <option>Victoria</option>
                            </Combobox>
                        </Field>
                        <Field label="Regions">
                            <Combobox>
                            </Combobox>
                        </Field>
                        <Field label="Topics">
                            <Combobox>
                            </Combobox>
                        </Field>
                        <Field label="Send to">
                            <Combobox>
                            </Combobox>
                        </Field>
                        <Field label="Distribution lists">
                            <Combobox>
                            </Combobox>
                        </Field>
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