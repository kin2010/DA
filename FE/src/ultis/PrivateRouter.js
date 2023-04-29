import { Navigate, Outlet } from "react-router-dom";
import { getRoleID, getToken } from "./Common";

const PrivateRoutes = () => {
  if (!getToken() && !getRoleID()) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default PrivateRoutes;
