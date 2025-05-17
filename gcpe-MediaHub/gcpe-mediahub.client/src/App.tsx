import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { initializeKeycloak } from './services/Keycloak';
import { createContext } from 'react';
import {
    FluentProvider,
    makeStyles,
    webLightTheme,
} from "@fluentui/react-components";
// Pages
import Home from './pages/Home/homePage';
import Media from './pages/MediaRequests/requests';
import Contacs from './pages/Contacts/contacts'; 


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/Media',
        element: <Media/>
    },
    {
        path: '/Contacts',
        element: <Contacs/>
    },
]);
const useStyles = makeStyles({
    root: {
        fontFamily: "BCSans-Regular'",
    },
});
export const AuthenticationContext = createContext('authentication');

function App() {
    /* authentication stuff */
    const [keycloak, setKeycloak] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const initKeycloak = useCallback(async () => {
        const _keycloak: any = await initializeKeycloak();
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
