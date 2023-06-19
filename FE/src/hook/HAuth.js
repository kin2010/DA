import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { apiURL } from "../Context/constant";
import { serviceFetch } from "../ultis/service";

export const login = async ({ email, password }) => {
  const data = await serviceFetch(
    {
      url: apiURL + "/api/auth/login",
      method: "POST",
      data: {
        email,
        password,
      },
    },
    apiURL,
    null,
    true
  );
  return data;
};

export const register = async (body) => {
  const data = await serviceFetch(
    {
      url: apiURL + "/api/auth/register",
      method: "POST",
      data: { ...body },
    },
    apiURL,
    null,
    true
  );
  return data;
};

export const useLogin = (email, password) => {
  return useQuery({
    queryKey: ["login"],
    queryFn: login({ email, password }),
  });
};

export const useLoginService = () => {
  const queryClient = useQueryClient();
  const loginMutation = useMutation(login, {
    onMutate: (data) => {
      // console.log(4343, data);
      // queryClient.setQueriesData("user",  {ada:"adad"});
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.setQueryData(["user"], data);
      } else {
        const dt = {
          user: {},
        };
        queryClient.setQueryData(["user"], dt);
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    login: async (email, password) => {
      console.log(777, loginMutation, email, password);
      return loginMutation.mutateAsync({ email, password });
    },
  };
};
