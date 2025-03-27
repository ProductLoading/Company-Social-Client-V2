// 🧠 UI state yönetimi için örnek slice (isteğe bağlı)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostUIState {
    selectedPostId: string | null;
    modalOpen: boolean;
}

const initialState: PostUIState = {
    selectedPostId: null,
    modalOpen: false,
};

const postSlice = createSlice({
    name: 'postUI',
    initialState,
    reducers: {
        setSelectedPostId: (state, action: PayloadAction<string | null>) => {
            state.selectedPostId = action.payload;
        },
        toggleModal: (state) => {
            state.modalOpen = !state.modalOpen;
        },
    },
});

export const { setSelectedPostId, toggleModal } = postSlice.actions;
export default postSlice.reducer;
