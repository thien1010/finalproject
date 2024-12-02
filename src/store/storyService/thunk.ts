import { createAsyncThunk } from "@reduxjs/toolkit";
import { storyService } from "services/storyService";

export const getStoriesThunk = createAsyncThunk(
  "storyService/getStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await storyService.getStory();
      return response.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
