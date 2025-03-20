import { combineReducers } from '@reduxjs/toolkit';
import postReducer from '../features/post/postSlice';
import userReducer from '../features/user/userSlice';
import officeReducer from "../features/office/officeSlice"
import departmentSlice from "../features/department/departmentSlice"


const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer, 
  office: officeReducer,
  department: departmentSlice
});

export default rootReducer;
