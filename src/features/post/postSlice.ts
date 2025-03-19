import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_POSTS, GET_POST } from './postQueries';
import { CREATE_POST, DELETE_POST, UPDATE_POST } from './postMutations';
import { RootState } from '@/app/store';
import type { Post, CreatePostInput, UpdatePostInput } from './types';

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

// **FETCH ALL POSTS (posts)**
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const { data } = await apolloClient.query({ query: GET_POSTS });
  return data.posts;
});

// **FETCH SINGLE POST (post)**
export const fetchPostById = createAsyncThunk('post/fetchPostById', async (postId: string) => {
  const { data } = await apolloClient.query({
    query: GET_POST,
    variables: { postId },
  });
  return data.post;
});

// **CREATE POST**
export const createPost = createAsyncThunk(
  'post/createPost',
  async (input: CreatePostInput, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token; // Redux store'dan token al
    const { data } = await apolloClient.mutate({
      mutation: CREATE_POST,
      variables: { createPostInput: input },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return data.createPost;
  }
);

// **DELETE POST**
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    await apolloClient.mutate({
      mutation: DELETE_POST,
      variables: { postId },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return postId;
  }
);

// **UPDATE POST (Opsiyonel)**
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (input: UpdatePostInput, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_POST,
      variables: { updatePostInput: input },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return data.updatePost;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((p) => p.postId !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.posts.findIndex((p) => p.postId === updated.postId);
        if (idx !== -1) state.posts[idx] = updated;
        if (state.selectedPost?.postId === updated.postId) {
          state.selectedPost = updated;
        }
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;
export default postSlice.reducer;
