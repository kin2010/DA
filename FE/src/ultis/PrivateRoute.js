import React from "react";
import { Navigate, Outlet, Route, withRouter } from "react-router-dom";
import { getRoleID, getToken } from "./Common";

export const ROLE_ID = {
  ADMIN: "649012513c190f6855bfbc9b",
  TEACHER: "638c6c5300702fc684d1d949",
  USER: "6367542a37d3783398b88eb7",
};
const ProtectedRoute = ({
  redirectPath = "/login",
  children,
  requirementRole,
}) => {
  if (!getToken()) {
    return <Navigate to={redirectPath} replace />;
  }
  if (requirementRole === "Admin") {
    if (getRoleID() !== ROLE_ID.ADMIN) {
      return <Navigate to={"/"} replace />;
    }
  }
  if (requirementRole === "Teacher") {
    if (getRoleID() !== ROLE_ID.TEACHER) {
      return <Navigate to={"/"} replace />;
    }
  }
  return children ? children : <Outlet />;
};
export default ProtectedRoute;
