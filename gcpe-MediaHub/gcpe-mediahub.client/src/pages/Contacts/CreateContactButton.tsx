
import CreateContactDrawer from "./CreateContactDrawer";
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    marginLeftAuto: {
        marginLeft: "auto",
    }
});

interface CreateContactProps {
    updateList: () => void,
}


export const CreateContactButton: React.FC<CreateContactProps> = ({updateList }) => {
    const styles = useStyles();
    return (
        <div className={styles.marginLeftAuto}>
            <CreateContactDrawer updateList={() => updateList()} />
        </div>
    );

}

export default CreateContactButton;
