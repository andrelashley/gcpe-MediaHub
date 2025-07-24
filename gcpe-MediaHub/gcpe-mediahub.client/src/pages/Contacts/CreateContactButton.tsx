
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import CreateContactDrawer from "./CreateContactDrawer";
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    marginLeftAuto: {
        marginLeft: "auto",
    }
});

interface CreateContactProps {
    updateList: () => void,
    socialMediaCompanies: SocialMediaCompany[],
    startOpen: boolean,
}


export const CreateContactButton: React.FC<CreateContactProps> = ({ updateList, socialMediaCompanies, startOpen }) => {
    const styles = useStyles();
    return (
        <div className={styles.marginLeftAuto}>
            <CreateContactDrawer updateList={() => updateList()} socials={socialMediaCompanies} startOpen={startOpen} />
        </div>
    );

}

export default CreateContactButton;
