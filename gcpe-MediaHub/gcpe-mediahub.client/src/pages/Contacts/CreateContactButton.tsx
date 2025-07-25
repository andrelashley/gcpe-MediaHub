
import { SocialMediaCompany } from "../../models/SocialMediaCompany";
import CreateContactDrawer from "./CreateContactDrawer";
import styles from './contacts.module.css';

interface CreateContactProps {
    updateList: () => void,
    socialMediaCompanies: SocialMediaCompany[],
    startOpen: boolean,
}


export const CreateContactButton: React.FC<CreateContactProps> = ({ updateList, socialMediaCompanies, startOpen }) => {
    return (
        <div className={styles.marginLeftAuto}>
            <CreateContactDrawer updateList={() => updateList()} socials={socialMediaCompanies} startOpen={startOpen} />
        </div>
    );

}

export default CreateContactButton;
