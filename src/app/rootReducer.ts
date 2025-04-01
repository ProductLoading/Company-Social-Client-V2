import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice/postSlice';
import userReducer from '../features/user/userSlice';
import officeReducer from "../features/office/officeSlice"
import departmentReducer from "../features/department/departmentSlice"
import feedReducer from "../features/feed/feedSlice"
import { postApi } from '@/features/post/api/postApi';
import { teamApi } from '@/features/team/teamApi';
import { userApi } from '@/features/user/api/userApi';

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  office: officeReducer,
  department: departmentReducer,
  feed: feedReducer,
  [postApi.reducerPath]: postApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [userApi.reducerPath]: userApi.reducer,


});

export default rootReducer;
