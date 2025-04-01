// src/features/user/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  // Daha fazla alan eklenebilir
}

const initialState: UserState = {
  token: localStorage.getItem('token'), // Uygun görürseniz Local Storage'dan ilk değeri yükleyebilirsiniz
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    clearCredentials: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      // İstiyorsanız user bilgilerini de sıfırlayabilirsiniz
      state.userId = undefined;
      state.email = undefined;
      state.firstName = undefined;
      state.lastName = undefined;
    },
    setUserInfo: (
      state,
      action: PayloadAction<{
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setCredentials, clearCredentials, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
