import {
    Button,
    Combobox,
    Field,
    Input,
    makeStyles,
} from "@fluentui/react-components";
import { AddCircle24Regular, SubtractCircle24Regular } from "@fluentui/react-icons";


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
                    <option>Hype Man</option>
                </Combobox>
            </Field>
            <Field label="Email" required>
                <Input />
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