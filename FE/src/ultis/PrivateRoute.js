/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import { getToken, getRoleID } from "./Common";
//user authen

import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (!getToken()) return <Navigate to="/login" />;
  else {
    return <Outlet />;
  }
};

export default PrivateRoute;
