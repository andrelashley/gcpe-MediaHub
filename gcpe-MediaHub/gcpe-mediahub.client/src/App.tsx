import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/homePage';
import { useState, useEffect, useCallback } from 'react';
import { initializeKeycloak } from './services/keycloak';
import { createContext } from 'react';
import {
    FluentProvider,
    makeStyles,
    webLightTheme,
    Nav
} from "@fluentui/react-components";

import Header from './components/header';
import SideNavbar from './components/sideNavBar';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home keycloak />,
    },
]);
const useStyles = makeStyles({
    root: {
        fontFamily: "BCSans-Regular'",
//        display: "flex",
//        width: "1365px",
//        minWidth: "var(--bp - min, 1024px)",
//maxWidth: "var(--bp - max, 1365px)",
//flexDirection: "column",
//alignItems: "center"
    }
});
export const AuthenticationContext = createContext('authentication');

function App() {
    /* authentication stuff */
    const [keycloak, setKeycloak] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const initKeycloak = useCallback(async () => {
        const _keycloak = await initializeKeycloak();
        setIsAuthenticated(_keycloak?.authenticated);
        setKeycloak(_keycloak);
    }, []);

    useEffect(() => {
        initKeycloak();
    }, [initKeycloak]);

    const styles = useStyles();
    return (
        <>
            <FluentProvider theme={webLightTheme} className={styles.root} >
              
            {isAuthenticated && (
                <AuthenticationContext.Provider value={keycloak}>              
                        <RouterProvider router={router} />
                </AuthenticationContext.Provider>
            )}
            </FluentProvider>
        </>
    );
}

export default App;
