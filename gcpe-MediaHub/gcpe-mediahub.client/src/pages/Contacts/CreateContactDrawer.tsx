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
    Select,
    Divider,
    Combobox,
    Title1,
} from "@fluentui/react-components";
import { Dismiss24Regular, AddCircle24Regular, SubtractCircle24Regular } from "@fluentui/react-icons";
import type { TagPickerProps } from "@fluentui/react-components";


const useStyles = makeStyles({
    drawer: {
        width: "650px",
    },
    formGroup: {
        display: "inline-flex",
    },  
    addButton: {
        float: "right",
    },

    outletsSection: {
        border: "1px solid #ccc!important",
        padding: "8px",
    }
}
);

export const CreateContactDrawer = () => {
    const [isOpen, setIsOpen] = React.useState(false);
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
                        <Title1>New Contact</Title1>
                    </DrawerHeaderTitle>
                </DrawerHeader>

                <DrawerBody>
                    <p>General Information</p>
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
                    <div id="socialMedia" className={styles.formGroup}>
                    <Field label="Social Media">
                        <Select>
                            <option></option>
                            <option>Instagram</option>
                            <option>Social Media Option 3</option>
                        </Select>
                        <Input placeholder="https://" />
                            <Button icon={<SubtractCircle24Regular />} title="this has no functionality yet" />
                        </Field>
                    </div>
                    <Button className={styles.addButton} icon={<AddCircle24Regular />} title="this has no functionality yet">
                        Add Social Media
                    </Button>
                    <Divider />
                    <label htmlFor="outlets-section">Outlets</label>
                        {/*this should be its own component too*/}
                    <div id="outlets-section" className={styles.outletsSection}>
                        <Field label="Outlet" required>
                            <Combobox>
                                {/*need to map this bit from actual data, not hard coded */}
                                <option>Media Outlet 1</option>
                                <option>Media Outlet 2</option>
                                <option>Media Outlet 3</option>
                            </Combobox>
                        </Field>
                        <Field label="Job Title" required>
                            <Combobox>
                                {/*need to map this bit from actual data, not hard coded */}
                                <option>Reporter</option>
                                <option>Photographer</option>
                                <option>Hype Man</option>
                            </Combobox>
                        </Field>
                        <Field label="Email" required>
                            <Input/>
                        </Field>
              
                        <Field label="Phone" required>
                            <Combobox>
                                {/*need to map this bit from actual data, not hard coded */}
                                <option>Primary</option>
                                <option>Mobile</option>
                                <option>Studio Call In</option>
                            </Combobox>
                            <Input />
                            <Button icon={<AddCircle24Regular />} className={styles.addButton} title="this has no functionality yet">
                                Add phone
                            </Button>
                        </Field>
                     
                    </div>
                    <Button icon={<AddCircle24Regular />} className={styles.addButton} title="this has no functionality yet">
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