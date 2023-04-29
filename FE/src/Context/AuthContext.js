/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { getToken } from "../ultis/Common";
import axios from "axios";
import { apiURL } from "./constant";
import { serviceFetch } from "../ultis/service";
export const AuthContextProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const token = getToken();
    if (!!token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const token = getToken();
    console.log("token", token);
    const res = await serviceFetch({
      url: apiURL + "/api/auth/get",
      method: "POST",
      data: { token: token },
    });
    if (res?.user) {
      setUser(res?.user);
    }
    console.log("res", res);
  };
  const data = {
    user,
    setUser,
  };
  return (
    <AuthContextProvider.Provider value={data}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
