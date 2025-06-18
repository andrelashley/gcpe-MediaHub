import { makeStyles, } from "@fluentui/react-components";
import logo from '../assets/logo.svg';

const useStyles = makeStyles({
    header: {
        display: "flex",
        height: "56px",
        padding: "8px 80px",
        alignItems: "center",
        alignSelf: "stretch",
        borderBottom: "1px solid #D1D1D1",
    },
    container: {
        display: "inline"
    },
    div: {
       display: "inline",
    },
});

const Header = () => {
    const styles = useStyles();

    return (
        <header className={styles.header}>
                <div className={styles.div}><a href="/"><img src={logo} /></a></div>
        </header>
    );
}

export default Header;
