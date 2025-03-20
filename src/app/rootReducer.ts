import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import userReducer from '../features/user/userSlice';
import officeReducer from "../features/office/officeSlice"


const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer, // ✅ Artık Promise değil, doğrudan reducer
  office: officeReducer
});

export default rootReducer;
