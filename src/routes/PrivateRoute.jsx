import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  if (isLoading) {
    return <Spinner />;
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
