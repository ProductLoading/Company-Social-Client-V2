// src/features/post/postSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_POSTS, GET_POST } from './postQueries';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './postMutations';
import { Post } from './types';

interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

// ✅ Postları getir
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const { data } = await apolloClient.query({ query: GET_POSTS });
  return data.getPosts;
});

// ✅ Tek post getir
export const fetchPostById = createAsyncThunk('post/fetchPostById', async (postId: string) => {
  const { data } = await apolloClient.query({ query: GET_POST, variables: { postId } });
  return data.getPost;
});

// ✅ Yeni post oluştur
export const createPost = createAsyncThunk('post/createPost', async (input: any) => {
  const { data } = await apolloClient.mutate({ mutation: CREATE_POST, variables: { input } });
  return data.createPost;
});

// ✅ Post güncelle
export const updatePost = createAsyncThunk('post/updatePost', async (input: any) => {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_POST, variables: { input } });
  return data.updatePost;
});

// ✅ Post sil
export const deletePost = createAsyncThunk('post/deletePost', async (postId: string) => {
  await apolloClient.mutate({ mutation: DELETE_POST, variables: { postId } });
  return postId;
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const idx = state.posts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.posts[idx] = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    });
  },
});

export default postSlice.reducer;
