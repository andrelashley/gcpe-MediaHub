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

const SocialMediaInput = () => {
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
                    <Button appearance="subtle" icon={<SubtractCircle24Regular />} title="this has no functionality yet" />
                </div>
        </div>
            </Field>
    );
}

export default SocialMediaInput;
