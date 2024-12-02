import { createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "services/postService";

export const getPostsThunk = createAsyncThunk(
  "postService/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getPost();
      return response.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


