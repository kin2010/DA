import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getToken, getRoleID } from "./Common";
//user authen
const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!getToken() && !getRoleID()) return <Redirect to="/login" />;
				else {
					// const role = getRoleID();
					// if (role === "1") return <Redirect to="/admin" />;
					// else if (role === "Customer") return <Redirect to="/shop" />;
					// else return <Redirect to="/shop" />;
					// else if (role === '0') return <Redirect to='/admin'/>;
					return <Component {...props} {...rest} />;
				}
			}}
		/>
	);
};
export default withRouter(PrivateRoute);
