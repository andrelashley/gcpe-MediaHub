import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/* import { initializeKeycloak } from './services/keycloak'; */
import { createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query client and provider
import {
    FluentProvider,
    makeStyles,
    webLightTheme,
} from "@fluentui/react-components";
import MediaLayout from './components/MediaLayout'; // Import MediaLayout

// Pages
import Home from './pages/Home/homePage';
import RequestsCardView from './pages/Requests/requestsCardView';
import Requests from './pages/Requests/requests';
import Media from './pages/MediaRequests/requests';
import Contacs from './pages/Contacts/Contacts'; 


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />, // Home page renders directly
    },
    {
        path: '/Media',
        element: <Media />, // Media page renders directly
    },
    {
        path: '/Contacts',
        element: <Contacs />, // Contacts page renders directly
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
                path: 'tableview',
                element: <Requests />,
            }
        ],
    },
]);
const useStyles = makeStyles({
    root: {
        fontFamily: "BCSans-Regular'",
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
            <FluentProvider theme={webLightTheme} className={styles.root} >
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
            </FluentProvider>
        </>
    );
}

export default App;