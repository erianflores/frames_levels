import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  const authenticateUser = async () => {
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      try {
        const responseToVerify = await axios.get(
          "http://localhost:5005/auth/verify",
          { headers: { authorization: `Bearer ${theToken}` } }
        );
        console.log("Token is valid", responseToVerify);

        setUser(responseToVerify.data.currentUser);
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("eror validating the token", error);
        setIsLoading(false);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      console.log("No token present");
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
    nav("/");
  }

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthWrapper };
