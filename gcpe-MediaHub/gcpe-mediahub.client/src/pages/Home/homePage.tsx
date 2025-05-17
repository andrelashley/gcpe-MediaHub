import { useContext } from 'react';
import { AuthenticationContext } from '../../App';
//import { logout } from '../../services/Keycloak';
import Layout from '../../components/Layout';
//import React from 'react';

//const fetchRestictedContent = async (token: string, setMessage: any) => {
//    // Defaulting to 8080 for demo purposes
///*    const serverURI = import.meta.env.VITE_SERVER_URI ?? 'https://localhost:5173'*/
//    setMessage('Request in flight...')
//    const response = await fetch('mediacontacts');
//    setMessage(await response.json());
     
//}


const Home = () => {
    const keycloak = (useContext(AuthenticationContext)) as any;

    return (
        <>
            {keycloak.authenticated && (
                <Layout title={"Home Page"} selectedNavItem={'1'}>
                        <div> This is the homepage</div>
                </Layout >   
            )}
        </>
    );
    
}

export default Home;
