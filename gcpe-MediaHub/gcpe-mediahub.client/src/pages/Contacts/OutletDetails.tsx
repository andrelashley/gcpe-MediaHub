import React, { ReactNode } from 'react';
import { Field, Input, makeStyles } from '@fluentui/react-components';
import MediaOutlet from '../../models/MediaOutlet';


interface OutletDetailsProps {
    outlet: any;
}

const OutletDetails: React.FC<OutletDetailsProps> = ({ outlet }) => {


    return (
        <Field>
            <Input readOnly={true} value={outlet.name} />
        </Field>
    );
};

export default OutletDetails;