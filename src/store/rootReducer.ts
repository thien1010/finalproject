import { combineReducers } from "@reduxjs/toolkit";
import { authServiceReducer } from "./authService";
import { userServiceReducer } from "./userService";
import { postServiceReducer } from "./postService";
import { storyServiceReducer } from "./storyService";

export const rootReducer = combineReducers({
  authService: authServiceReducer,
  userService: userServiceReducer,
  postService: postServiceReducer,
  storyService: storyServiceReducer,
});
