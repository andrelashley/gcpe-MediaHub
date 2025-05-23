import { Button, makeStyles, } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
    header: {
        display: "flex",
        padding: "16px 0px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "Global.Size.120",
        alignself: "stretch",
    },
    button: {
        verticalAlign: "top",
    }
});
    interface HeadingProps{
        title: String;
        button: any;
    }

const PageHeading: React.FC<HeadingProps> = ({ title, button }) => {
    const styles = useStyles();

    return (
        <div className={styles.header}>
            <h2>{title}</h2>
                { button }
        </div>
    );
}

export default PageHeading