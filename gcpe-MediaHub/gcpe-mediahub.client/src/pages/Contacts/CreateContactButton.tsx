import * as React from "react";
import { makeStyles, Button } from "@fluentui/react-components";
import CreateContactDrawer from "./CreateContactDrawer";


export const CreateContactButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);


    return (
        <div>     
            <CreateContactDrawer/>
        </div>
    );

}


export default CreateContactButton;