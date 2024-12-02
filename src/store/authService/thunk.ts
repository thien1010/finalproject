//middle wares => callAPI => tạo req lên server => đợi server trả về rep => middle dispatch lên store redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchemaType } from "schema";
import { authService, userService } from "services";
import { getToken, sleep } from "utils";

//payload chính là 1 cái response trả về từ server
export const loginThunk = createAsyncThunk(
  "authService/login",
  async (payload: LoginSchemaType, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(payload);
      //console.log("data: ", data.data.content);
      await sleep();

      return data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserByTokenThunk = createAsyncThunk(
  "userService/getUserByToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      // console.log("token:", token);
      if (!token) {
        console.error("No token found in storage.");
        throw new Error("No token found");
      }
      const response = await userService.getUserByToken({ token });
      if (response.data && response.data.content) {
        return response.data.content;
      } else {
        throw new Error("Invalid user data structure");
      }
    } catch (err) {
      console.error("Error fetching user by token:", err);
      return rejectWithValue({
        message: err.message || "An unknown error occurred",
      });
    }
  }
);
