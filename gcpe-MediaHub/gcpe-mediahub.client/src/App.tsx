import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/* import { initializeKeycloak } from './services/keycloak'; */
import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query client and provider
import {
    FluentProvider,
    makeStyles,
    webLightTheme,
    Toaster
} from "@fluentui/react-components";

const customTheme = {
    ...webLightTheme,
    fontFamilyBase: "'BC Sans', 'Noto Sans', Verdana, Arial, sans-serif",
    fontFamilyHeader: "'BC Sans', 'Noto Sans', Verdana, Arial, sans-serif",
};
import MediaLayout from './components/MediaLayout'; // Import MediaLayout

// Pages
import Home from './pages/Home/homePage';
import RequestsCardView from './pages/Requests/requestsCardView';
import Contacts from './pages/Contacts/contacts'; 
import OrganizationsLayout from './components/OrganizationsLayout';
import Organizations from './pages/Organizations/organizations';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />, // Home page renders directly
    },

    {
        path: '/Contacts',
        element: <MediaLayout />,
        children: [
            {
                index: true,
                element: <Contacts />,
            },
        ]
    },
    {
        path: '/organizations',
        element: <OrganizationsLayout />,
         children: [
            {
                index: true,
                element: <Organizations />
            }
        ]
    },
    {
        path: '/requests',
        element: <MediaLayout />,
        children: [
            {
                index: true,
                element: <RequestsCardView />,
            },
            {
                path: 'new',
                element: <RequestsCardView />,
            },
            {
                path: ':requestNo', // changed from :id to :requestNo
                element: <RequestsCardView key="requestNo" />, // force remount for param change
            },
        ],
    },
    {
        path: '*',
        element: <div>404 - Not Found</div>
    }
]);
const useStyles = makeStyles({
    root: {
        fontFamily: "BCSans-Regular",
    },
});
export const AuthenticationContext = createContext('authentication');

// Create a client
const queryClient = new QueryClient();

function App() {
    /* authentication stuff */
    /* const [keycloak, setKeycloak] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const initKeycloak = useCallback(async () => {
        const _keycloak = await initializeKeycloak();
        setIsAuthenticated(_keycloak?.authenticated);
        setKeycloak(_keycloak);
    }, []);

    useEffect(() => {
        initKeycloak();
    }, [initKeycloak]); */

    const styles = useStyles();
    return (
        <>
            <FluentProvider theme={customTheme} className={styles.root} >
                <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
                    {/* Ensure RouterProvider is active. If authentication is not yet implemented,
                        render it directly. For now, I'll assume it should be active. */}
                    <RouterProvider router={router} />
                    {/*
                    // Original authentication block, kept for reference if needed later
                    {isAuthenticated && (
                        <AuthenticationContext.Provider value={keycloak}>
                                <RouterProvider router={router} />
                        </AuthenticationContext.Provider>
                    )}
                    */}
                </QueryClientProvider>
                <Toaster position='top-end' offset={{ vertical: 75 }} />
            </FluentProvider>
        </>
    );
}

export default App;