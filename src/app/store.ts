import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { postApi } from '@/features/post/api/postApi';
import { teamApi } from '@/features/team/teamApi';
import { userApi } from '@/features/user/api/userApi';
import { socialApi } from '@/graphql/socialApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const apiMiddlewares = [
  postApi.middleware,
  teamApi.middleware,
  userApi.middleware,
  socialApi.middleware

  // commentApi.middleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...apiMiddlewares), // Thunk olmadan middleware çalıştır!
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
