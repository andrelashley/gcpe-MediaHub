import { makeStyles, } from "@fluentui/react-components";


/*Ask the team what they all think about tracking styles in this fashion. I think react supports a couple of different schemes,
and this one comes from the import above. One thing I definitely DON'T like is the user unfriendly names we get, like
.fkhj508 {
    font-size: var(--fontSizeBase300);
}
*/
const useStyles = makeStyles({
    header: {
        display: "flex",
        height: "56px",
        padding: "8px 80px",
        justifyContent: "center",
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
                <div className={styles.div} id="header-title">I fear no evil, for I am fear incarnate.</div>
        </header>
    );
}

export default Header;