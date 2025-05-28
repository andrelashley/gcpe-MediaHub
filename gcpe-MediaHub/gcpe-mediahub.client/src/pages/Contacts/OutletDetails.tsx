import React, { ReactNode } from 'react';
import { Badge, Field, InfoLabel, Input, Label, makeStyles } from '@fluentui/react-components';
import MediaOutlet from '../../models/MediaOutlet';

import { ViewDesktopMobileRegular, MailRegular, WarningRegular } from "@fluentui/react-icons";
interface OutletDetailsProps {
    outlet: any;
}

const useStyles = makeStyles({
    border: {
        border: "1px solid #ccc!important",
        padding: "4px",
        width: "100%",
    },
    inline: {
        display: "inline-flex",
    },
    outletName: {
        fontWeight: "600",
    },
    warning: {
        color: "orange",
        display: "inline-flex",
    },
});

const OutletDetails: React.FC<OutletDetailsProps> = ({ outlet }) => {
    const styles = useStyles();

    return (
        <div className={styles.border }>
            <Field>
                <div className={styles.inline}>
                    <Input readOnly={true} value={outlet.outlet.name} className={styles.outletName} />
                    <div>
                        Reporter
                    </div>
                    {outlet.outlet.isMajorMedia &&
                    <div>
                        <Badge>! Major</Badge>
                    </div>
                    }
                </div>
            </Field>
            <Field className={styles.inline}>
                <ViewDesktopMobileRegular />
                <Label htmlFor="mobile-input">Mobile: </Label>
                <Input readOnly={true} value={outlet.phoneMobile} id="mobile-input" />
            </Field>
            <Field className={styles.inline}>
                <MailRegular />
                <Label htmlFor="email-input">Email:</Label>
                <Input readOnly={true} value={outlet.phoneMobile} id="email-input" />
            </Field>
            {/*  {outlet.lastRequestDate &&*/}
            <div className={styles.warning} >
                    <WarningRegular />
                    <Input readOnly={true} value={outlet.lastRequestDate} />
                </div>
           {/* }*/}
        </div>
    );
};

export default OutletDetails;