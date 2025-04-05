// src/features/comment/comment.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentState {
  selectedCommentId?: string;
  isCommentFormOpen: boolean;
}

const initialState: CommentState = {
  selectedCommentId: undefined,
  isCommentFormOpen: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setSelectedCommentId(state, action: PayloadAction<string | undefined>) {
      state.selectedCommentId = action.payload;
    },
    toggleCommentForm(state) {
      state.isCommentFormOpen = !state.isCommentFormOpen;
    },
  },
});

export const { setSelectedCommentId, toggleCommentForm } = commentSlice.actions;
export default commentSlice.reducer;
