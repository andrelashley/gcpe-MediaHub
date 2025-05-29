import { useContext } from 'react';
import { AuthenticationContext } from '../../App';
//import { logout } from '../../services/Keycloak';
import Layout from '../../components/Layout';



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
