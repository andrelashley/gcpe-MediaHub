import {
    Button,
    Field,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { SubtractCircle24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    socialMediaInput: {
        display: "inline",
        '& div, input, select, span': {
            display: "inline-block",
        },
    },
});

interface SocialMediaInputProps {
    onRemove: () => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({onRemove}) => {
    const styles = useStyles();

    return (
            <Field label="Social Media">
        <div id="socialMedia" className={styles.socialMediaInput}>
                <div>
                    <Select>
                        <option></option>
                        <option>Instagram</option>
                        <option>Social Media Option 3</option>
                    </Select>
                </div>
                <div>
                    <Input placeholder="https://" />
                </div>
                <div>
                    <Button
                        appearance="subtle"
                        icon={<SubtractCircle24Regular />}
                        onClick={onRemove}
                        title="Remove this social media input"
                    />
                </div>
        </div>
            </Field>
    );
}

export default SocialMediaInput;
