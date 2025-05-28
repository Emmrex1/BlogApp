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
        `/blogs?search=${search}&category=${category}&location=${location}`, providesTags: ['Blogs'],
    }),
    fetchBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),

    fetchRelatedBlogs: builder.query({
      query: (id) => `/blogs/related/${id}`,
    }),

    postBlog: builder.mutation({
      query: (newBlog) => ({
        url:  `/blogs/create-post`,
        method: "POST",
        body:  newBlog,
        credentials: "include",
      })
    }),
    
    updateBlog: builder.mutation({
      query: (id, ...rest) => ({
        url:  `/update-post/${id}`,
        method: "PATCH",
        body:rest,
        credentials: "include",
      }),
      invalidatesTags: (result, error, {id}) => [{ types: `Blogs`, id}],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url:  `/blogs/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, {id}) => [{ types: `Blogs`, id}],
    })
  }),


});

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, useUpdateBlogMutation, usePostBlogMutation, useDeleteBlogMutation } = blogApi;
