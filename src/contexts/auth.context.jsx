import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

const AuthContext = createContext();
const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  const authenticateUser = useCallback(async () => {
    const theToken = localStorage.getItem("authToken");
    if (!theToken) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      console.log("No token present");
      return;
    }

    try {
      const responseToVerify = await axios.get(`${API_URL}/auth/verify`, {
        headers: { authorization: `Bearer ${theToken}` },
      });

      console.log("Token is valid", responseToVerify);

      setUser((prevUser) => {
        return prevUser?._id === responseToVerify.data.currentUser?._id
          ? prevUser
          : responseToVerify.data.currentUser;
      });

      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error validating the token", error);
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      authenticateUser();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [authenticateUser]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("authToken");
    setUser(null);
    setIsLoggedIn(false);
    nav("/");
  };

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
