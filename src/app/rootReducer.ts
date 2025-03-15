// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postReducer from '../features/post/postSlice';
// ... diğer slice importları

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  // ...
});

export default rootReducer;
