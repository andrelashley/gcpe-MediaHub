import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/homePage';
import { useState, useEffect, useCallback } from 'react';
import { initializeKeycloak } from './services/keycloak';
import { createContext } from 'react';
import {
    FluentProvider,
    makeStyles,
    webLightTheme,
} from "@fluentui/react-components";

import Header from './components/header';



const router = createBrowserRouter([
    {
        path: '/',
        element: <Home keycloak />,
    },
]);
const useStyles = makeStyles({
    root: {
        fontFamily: "BCSans-Regular'",
   
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
                <Header />
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
