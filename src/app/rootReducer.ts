import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice/postSlice';
import userReducer from '../features/user/userSlice';
import officeReducer from "../features/office/officeSlice"
import departmentReducer from "../features/department/departmentSlice"
import feedReducer from "../features/feed/feedSlice"

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer, 
  office: officeReducer,
  department: departmentReducer,
  feed: feedReducer,


});

export default rootReducer;
