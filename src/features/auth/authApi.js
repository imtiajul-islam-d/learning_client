import { apiSlice } from "../api/apiSlice";
import { studentError, adminError, userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    // registration route
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user?.role === "student") {
            localStorage.setItem(
              "lws-auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          }
        } catch (error) {}
      },
    }),
    // login route
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user?.role === "student") {
            localStorage.setItem(
              "lws-auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          } else {
            dispatch(adminError());
          }
        } catch (error) {}
      },
    }),
    // admin login
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user?.role === "admin") {
            localStorage.setItem(
              "lws-auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          } else {
            dispatch(studentError());
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterMutation,
  useLoginMutation,
  useAdminLoginMutation,
} = authApi;
