
import CreateContactDrawer from "./CreateContactDrawer";
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
    marginLeftAuto: {
        marginLeft: "auto",
    }
});

export const CreateContactButton = () => {
    const styles = useStyles();
    return (
        <div className={styles.marginLeftAuto}>     
            <CreateContactDrawer />
        </div>
    );

}

export default CreateContactButton;
