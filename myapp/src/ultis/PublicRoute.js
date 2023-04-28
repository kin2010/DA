import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getRoleID, getToken } from "./Common";
//admin route
const PublicRoute = ({ component: Component, ...rest }) => {
	console.log("ok");
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!getToken() && !getRoleID()) {
					console.log("log");
					return <Redirect to="/login" />;
					// return <Component {...rest} {...props} />;
				} else {
					const role = getRoleID();
					if (role !== "Admin") return <Redirect to="/shop" />;
					else if (role === "Customer") return <Redirect to="/shop" />;
					else return <Component {...rest} {...props} />;
					// else if (role === '0') return <Redirect to='/admin'/>;
				}
			}}
		/>
	);
};
export default PublicRoute;
