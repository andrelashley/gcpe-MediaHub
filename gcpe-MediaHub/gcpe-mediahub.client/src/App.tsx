import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/pages/Home/index';
import { useState, useEffect, useCallback } from 'react';
import { initializeKeycloak } from './services/keycloak';
import { createContext } from 'react';
import Header from './components/header';
import {
    FluentProvider,
    webLightTheme,
    Button
} from "@fluentui/react-components";

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

    /*Fluent UI stuff */

    return (
        <>
            <FluentProvider theme={webLightTheme}>
            <Header/>
                <Button appearance="primary">Hello Fluent UI React</Button>
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
