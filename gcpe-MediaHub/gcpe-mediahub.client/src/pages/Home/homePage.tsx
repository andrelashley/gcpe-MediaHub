import { useContext } from 'react';
import { AuthenticationContext } from '../../App';
//import { logout } from '../../services/Keycloak';
import Layout from '../../components/Layout';



const Home = () => {
    const keycloak = (useContext(AuthenticationContext)) as any;

    return (
        <>

                <Layout title={"Home Page"} selectedNavItem={'1'}>
                        <div>Select a navigation option from the navigation pane to the left</div>
                </Layout >   
   
        </>
    );
    
}

export default Home;
