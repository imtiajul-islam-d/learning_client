import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  if (auth) {
    if (auth === "admin") {
      return children;
    } else {
      dispatch(userLoggedOut());
      localStorage.removeItem("lws-auth")
    }
  } else {
    return <Navigate to="/admin" />;
  }
};

export default AdminRoute;
