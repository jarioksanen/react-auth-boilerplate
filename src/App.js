import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './context';
import Authentication from './authentication';
import ProtectedResource from './protectedPage';
import './styles.css';

let logoutTimer;
export default function App() {

  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationTime) => {
    setToken(token);

    const expiration = expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration); // Set expiration time one hour from current time

      localStorage.setItem(
        "userData",
        JSON.stringify({
          token,
          expirationTime: expiration.toISOString()
        })
      );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  // Hook to check if something is there in localStorage and logs user in accordingly
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new  Date(storedData.expirationTime) > new Date()) 
    {
       login(storedData.token, new Date(storedData.expirationTime));
    }
  }, [login]);

  // New useEffect hook to set the timer if the expiration time is in future otherwise we clear the timer here
  useEffect(() => {
    if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // !!token in value prop converts the token value to a boolean.
        token: token,
        login: login,
        logout: logout
      }}
    >
      <div className="center">
        <Authentication />
        <ProtectedResource />
      </div>
    </AuthContext.Provider>
   )
}