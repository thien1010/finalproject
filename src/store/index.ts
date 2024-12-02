import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { getUserByTokenThunk } from "./authService";
import { getPostsThunk } from "./postService";
import { getStoriesThunk } from "./storyService";

export const store = configureStore({
  reducer: rootReducer,
});
//dispatch action khi client vào trang web
store.dispatch(getUserByTokenThunk());
store.dispatch(getPostsThunk());
store.dispatch(getStoriesThunk());
type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<(typeof store)["getState"]>;
