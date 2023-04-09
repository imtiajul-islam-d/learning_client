import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPublicRoute = ({ children }) => {
  const auth = useAuth();
  if (auth === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return children;
  }
};

export default AdminPublicRoute;