/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { getToken } from "../ultis/Common";
import axios from "axios";
import { apiURL } from "./constant";
import { serviceFetch } from "../ultis/service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../hook/LessionHook";
export const AuthContextProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  const queryClient = useQueryClient();
  const { data: userData } = useQuery(["user"], getUserData);
  useEffect(() => {
    const token = getToken();
    if (!!token) {
      // getUser();
    }
  }, []);

  const data = {
    userData,
    setUser,
  };
  return (
    <AuthContextProvider.Provider value={data}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthContext;
