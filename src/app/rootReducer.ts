import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
// import postReducer from '../features/post/postSlice';
// import commentReducer from '../features/comment/commentSlice';
// ... diğer slice importları

const rootReducer = combineReducers({
  user: userReducer,
  // post: postReducer,
  // comment: commentReducer,
  // group: groupReducer,
  // event: eventReducer,
  // poll: pollReducer,
});

export default rootReducer;
