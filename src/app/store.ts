import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import rootReducer from './rootReducer';
import { thunk } from 'redux-thunk';
// import thunk from 'redux-thunk'; // Tekrar default olarak kullanın

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'], // hangi slice'ları saklamak isterseniz
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Persist işlemi nedeniyle serileştirilebilirlik uyarısını kapatabilirsiniz
    }).concat(thunk),
});

export const persistor = persistStore(store);

// Tipler
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
