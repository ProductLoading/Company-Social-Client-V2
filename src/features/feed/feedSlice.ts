// features/feed/feedSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';

interface FeedState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  items: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setFeed, setLoading, setError } = feedSlice.actions;
export default feedSlice.reducer;
