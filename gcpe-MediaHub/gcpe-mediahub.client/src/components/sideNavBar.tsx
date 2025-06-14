import { makeStyles } from "@fluentui/react-components";

import {
    //AppItem,
    //Hamburger,
    //NavCategory,
    //NavCategoryItem,
    //NavDivider,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavDrawerProps,
    NavItem,
    //NavSectionHeader,
    //NavSubItem,
    //NavSubItemGroup,
} from "@fluentui/react-nav-preview";
import {
    //Label,
    //Radio,
    //RadioGroup,
    //Switch,
    tokens,
    //useId,
    //useRestoreFocusTarget,
} from "@fluentui/react-components";

/*styling goes here */
const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        display: "inline-flex",
        height: "100vh",
    },
    nav: {
        minWidth: "200px",
    },
    content: {
        flex: "1",
        padding: "16px",
        display: "grid",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    field: {
        display: "flex",
        marginTop: "4px",
        marginLeft: "8px",
        flexDirection: "column",
        gridRowGap: tokens.spacingVerticalS,
    },
});
/*type DrawerType = Required<DrawerProps>["type"];*/

export const SideNavbar = (props: Partial<NavDrawerProps>) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <NavDrawer
                open={true}
                type={'inline'}
                className={styles.nav}
                selectedValue={props.selectedValue ? props.selectedValue : "2"}
                defaultSelectedCategoryValue=""

            >
                <NavDrawerHeader>
                    {/*<Tooltip content="Close Navigation" relationship="label">*/}
                    {/*    <Hamburger onClick={() => setIsOpen(!isOpen)} />*/}
                    {/*</Tooltip>*/}
                </NavDrawerHeader>

                <NavDrawerBody>
                    <NavItem href={'./requests'} value="2">
                        Media Requests
                    </NavItem>
                    <NavItem href={'./Contacts'} value="3">
                        Contacts
                    </NavItem>
                    <NavItem href={'./Organizations'} value="4">
                        Organizations
                    </NavItem>
                </NavDrawerBody>
            </NavDrawer>
          
        </div>
    );
}


export default SideNavbar;

