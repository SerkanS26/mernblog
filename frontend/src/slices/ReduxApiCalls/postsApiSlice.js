import { POSTS_URL, UPLOAD_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: POSTS_URL,
        params: { keyword, pageNumber },
      }),
      providesTags: ["Posts"],
      keepUnusedDataFor: 5,
    }),
    getPostDetails: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: () => ({
        url: POSTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/myposts`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} = postsApiSlice;
