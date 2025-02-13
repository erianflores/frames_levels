import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
  
    try {
      const verifyResponse = await fetch("http://localhost:5005/users/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (verifyResponse.ok) {
        const userData = await verifyResponse.json();
        setUser((prevUser) => (JSON.stringify(prevUser) !== JSON.stringify(userData.currentUser) ? userData.currentUser : prevUser));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
