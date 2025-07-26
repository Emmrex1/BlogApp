import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "/api/comments", 
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    // 🟢 Post a comment
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),

    // 🔵 Get total comments
    getComments: builder.query({
      query: () => ({
        url: "/total-comments",
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    // 🟡 Get comments for specific blog post
    getCommentsByPost: builder.query({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "GET",
      }),
      providesTags: (result, error, postId) => [{ type: "Comments", id: postId }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetCommentsByPostQuery,
} = commentApi;

export default commentApi;
