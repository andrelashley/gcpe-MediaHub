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
        //display: "flex",
        //flexDirection: "column",
        //alignItems: "flex-start",
        //gap: "Global.Size.80",
        //alignSelf: "stretch",
        //'& .fui-Field': {
        //    width: "100%",
        //}, 
        display: "inline",
        '& div, input, select, span': {
            display: "inline-block",
        },
    },
    platformSelector: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.20",
    },
    linkInput: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.20",
        flex: "1 0 0",
    },
});

interface SocialMediaInputProps {
    onRemove: () => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({onRemove}) => {
    const styles = useStyles();

    return (
            
            <div id="socialMedia" className={styles.socialMediaInput}>

                <div className={styles.platformSelector}>
                    <Select>
                        <option></option>
                        <option>Instagram</option>
                        <option>Social Media Option 3</option>
                    </Select>
                </div>
                <div className={styles.linkInput}>
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
    );
}

export default SocialMediaInput;
