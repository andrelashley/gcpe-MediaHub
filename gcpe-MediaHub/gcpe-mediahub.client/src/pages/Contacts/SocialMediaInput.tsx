import {
    Button,
    Input,
    Select,
    makeStyles,
} from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    socialMediaInput: {
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        alignSelf: "stretch",
    },
    platformSelector: {
        width: "128px",
    },
    linkInput: {
        width: "100%",
        '& span': {
            width: "95%",
        },
    },
    dismissButton: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "8px",
        '& Button': {
            maxWidth: "18px",
            minWidth: "18px",
            maxHeight: "18px",
        },
    },
});

interface SocialMediaInputProps {
    onRemove: () => void;
    socials: SocialMediaCompany[];
    onSocialMediaDataChange: (data: any) => void;
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ onRemove, socials, onSocialMediaDataChange }) => {
    const [companyId, setCompanyId] = useState<number>();
    const [url, setUrl] = useState<number>();
    const handleCompanyChange = (e) => {
        setCompanyId(e.target.value);
    };
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    useEffect(() => {
        // Call onDataChange whenever the input changes
        onSocialMediaDataChange({
            socialMediaCompanyId: companyId,
            socialProfileUrl: url,
        });
    }, [companyId, url]);
    const styles = useStyles();

    return (

        <div className={styles.socialMediaInput}>

            <div className={styles.platformSelector}>
                <Select
                    onChange={handleCompanyChange}
                    >
                    <option></option>
                    {socials.map((company) => (
                        <option value={company.id} key={company.id}>{company.company}</option>
                    ))}
                </Select>
            </div>
            <div className={styles.linkInput}>
                <Input
                    placeholder="https://"
                    onChange={handleUrlChange}
                />
            </div>
            <div className={styles.dismissButton}>
                <Button
                    icon={<Dismiss12Regular />}
                    onClick={onRemove}
                    title="Remove this social media input"
                />
            </div>
        </div>
    );
}

export default SocialMediaInput;
