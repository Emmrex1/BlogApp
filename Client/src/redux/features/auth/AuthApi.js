
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4005/api/auth',
    credentials: 'include',
  }),
  tagTypes: ['User'], 
  endpoints: (builder) => ({

    // Register new user
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    // Login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    // ✅ Get all users 
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // Delete user by ID
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Update user role
updateUser: builder.mutation({
  query: ({ userId, role, status }) => ({
    url: `/users/${userId}`,
    method: "PUT",
    body: { role, status },  
  }),
  invalidatesTags: ["User"],
}),


  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUsersQuery,        
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;

export default authApi;
