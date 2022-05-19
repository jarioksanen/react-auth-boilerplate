import { useContext } from 'react';
import { AuthContext } from './context';
export default function Authentication() {

    const authContext = useContext(AuthContext);

    const loginHandler = () => {
        // API call to server...
        
        // Response from server
        const userResponse = {
            token: "abcde12345"
        };

        authContext.login(userResponse.token); // Set AuthContext  
    };
    
    const logoutHandler = () => {
        authContext.logout();
    };

    return (
        <>
            {!authContext.isLoggedIn && <button className="login" onClick={loginHandler}>Login</button>}
            {authContext.isLoggedIn && <button className="logout" onClick={logoutHandler}>Logout</button>}
        </>
    )
}