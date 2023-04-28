import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL } from "../Context/constant";

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiURL}`,
    prepareHeaders: (headers, { getState }) => {
      // mutation-> query->settoken

      const token = getState().auths.token;
      console.log(token, getState().auths);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    user: builder.query({
      query: () => "/auth",
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["auth"],
    }),
    verify: builder.mutation({
      query: (body) => ({
        url: "/auth/verify",
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useUserQuery,
  useRegisterMutation,
  useVerifyMutation,
} = AuthApi;
