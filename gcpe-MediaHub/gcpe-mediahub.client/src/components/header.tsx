import { makeStyles, } from "@fluentui/react-components";

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
                <div className={styles.div}><a href="/"><img src="./src/assets/bc-gov-theme/dist/images/bcid-mstile-70x70.png" /></a></div>
        </header>
    );
}

export default Header;
