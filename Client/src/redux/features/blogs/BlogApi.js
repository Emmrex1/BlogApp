import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4005/api/',
    credentials: 'include',
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
   
    fetchBlogs: builder.query({
      query: ({ search = '', category = '', location = '' }) =>
        `/blogs?search=${search}&category=${category}&location=${location}`,
      providesTags: ['Blogs'],
    }),
   
    fetchBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),
   
    fetchRelatedBlogs: builder.query({
      query: (id) => `/blogs/related/${id}`,
    }),
    
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: `/blogs/create-post`,
        method: "POST",
        body: newBlog,
        credentials: "include",
      }),
      invalidatesTags: ['Blogs'],
    }),
    
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/blogs/update-post/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Blogs'],
    }),
    
    
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ['Blogs'],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useFetchRelatedBlogsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
