
import { Badge, Field, Input, Label, makeStyles } from '@fluentui/react-components';
import { ViewDesktopMobileRegular, MailRegular, WarningRegular } from "@fluentui/react-icons";
interface OutletDetailsProps {
    outlet: any;
}

const useStyles = makeStyles({
    container: {
        border: "1px solid #ccc!important",
        padding: "4px",
        width: "100%",
        margin: "6px 6px 6px 0px",
        borderRadius: "6px",
    },
    inline: {
        display: "inline-flex",
    },
    outletName: {
        fontWeight: "600",
        marginRight: "8px",
    },
    warning: {
        color: "orange",
        display: "inline-flex",
    },
    badge: {
        marginLeft: "10%",
    },
    input: {
        marginTop: "5px",
        marginBottom: "5px",
        display: "inline-block",
        marginLeft: "20px",
    },
    label: {
        display: "inline-block",
        float: "left",
        paddingTop: "5px",
        textAlign: "right",
        width: "50px",
    },
    icon: {
        fontSize: "large",
        paddingTop: "5px",
    },
});

const OutletDetails: React.FC<OutletDetailsProps> = ({ outlet }) => {
    const styles = useStyles();

    return (
        <div className={styles.container }>
            <Field>
                <div className={styles.inline}>
                    <div className={styles.outletName}>{outlet.outletName}</div>
                    <div>
                        Reporter
                    </div>
                    {outlet.isMajorMedia &&
                        <div className={styles.badge}>
                        <Badge>! Major</Badge>
                    </div>
                    }
                </div>
            </Field>
            <Field className={styles.inline}>
                <ViewDesktopMobileRegular className={styles.icon} />
                <Label htmlFor="primaryPhone-input" style={{ paddingInlineEnd: "12px" }} className={styles.label}>Phone: </Label>
               
                    {outlet.contactPhones.map((phone, index) => (
                        <Input
                            readOnly={true}
                            value={phone}
                           /* type="tel"*/
                            className={styles.input}
                            key={index}
                        />
                    ))}
            </Field>
       
            <Field className={styles.inline}>
                <MailRegular className={styles.icon} />
                <Label htmlFor="email-input" style={{ paddingInlineEnd: "12px" }} className={styles.label}>Email:</Label>
                {outlet.contactEmails.map((email, index) => (

                    <Input
                        readOnly={true}
                        value={email}
                        id="email-input"
                        type="email"
                        className={styles.input}
                        key={index}
                    />
                )) }
            </Field>
            {outlet.lastRequestDate &&
            <div className={styles.warning} >
                    <WarningRegular />
                    <Input readOnly={true} value={outlet.lastRequestDate} type="date"/>
                </div>
           }
        </div>
    );
};

export default OutletDetails;
