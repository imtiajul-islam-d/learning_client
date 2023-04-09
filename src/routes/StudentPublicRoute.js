import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const StudentPublicRoute = ({ children }) => {
  const auth = useAuth();
  if (auth === "student") {
    return <Navigate to="/coursePlayer" />;
  } else {
    return children;
  }
};

export default StudentPublicRoute;
