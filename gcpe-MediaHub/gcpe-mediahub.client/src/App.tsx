import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/pages/Home/index';
import { useState, useEffect, useCallback } from 'react';
import { initializeKeycloak } from './services/keycloak';
import { createContext } from 'react';
import {
    FluentProvider,
    webLightTheme,
} from "@fluentui/react-components";
import Layout from './components/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home keycloak />,
    },
]);

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

    return (
        <>
            <FluentProvider theme={webLightTheme}>
            {isAuthenticated && (
                <AuthenticationContext.Provider value={keycloak}>
                   
                        <Layout title={"Index"} children={<RouterProvider router={router} /> } />
                </AuthenticationContext.Provider>
            )}
            </FluentProvider>
        </>
    );
}

export default App;
