import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice/postSlice';
import userReducer from '../features/user/userSlice';
import officeReducer from "../features/office/officeSlice"
import departmentReducer from "../features/department/departmentSlice"
import feedReducer from "../features/feed/feedSlice"
import { teamApi } from '@/features/team/teamApi';
import { userApi } from '@/features/user/api/userApi';
import { socialApi } from '@/graphql/socialApi';
// import { commentApi } from '@/features/comment/comment.api';

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  office: officeReducer,
  department: departmentReducer,
  feed: feedReducer,

  [teamApi.reducerPath]: teamApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [socialApi.reducerPath]: socialApi.reducer,


});

export default rootReducer;
