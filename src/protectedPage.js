import { useContext } from 'react';
import { AuthContext } from './context';

export default function ProtectedResource() {

   const authContext = useContext(AuthContext);
   
   return authContext.isLoggedIn && <h2>Protected resource</h2>;

}