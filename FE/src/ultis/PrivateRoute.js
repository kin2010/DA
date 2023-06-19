import React from "react";
import { Navigate, Outlet, Route, withRouter } from "react-router-dom";
import { getToken } from "./Common";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  if (!getToken()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
