import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePost } from "types";
import { getPostsThunk } from "./thunk";

type PostServiceInitialState = {
  postsList?: CreatePost[];
  isFetchingPosts?: boolean;
};

const initialState: PostServiceInitialState = {
};

const postServiceSlice = createSlice({
  name: "postService",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<CreatePost>) {
      state.postsList = [...(state.postsList || []), action.payload];
    },
    setPosts(state, action: PayloadAction<CreatePost[]>) {
      state.postsList = action.payload;
    },
    deletePost(state, action: PayloadAction<number>) {
      state.postsList = state.postsList?.filter(
        (post) => post.post_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state) => {
        state.isFetchingPosts = true;
      })
      .addCase(getPostsThunk.fulfilled, (state, { payload }) => {
        state.postsList = payload;
        state.isFetchingPosts = false;
      })
      .addCase(getPostsThunk.rejected, (state) => {
        state.isFetchingPosts = false;
      });
  },
});

export const { actions: postServiceActions, reducer: postServiceReducer } =
  postServiceSlice;
