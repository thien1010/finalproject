import { createSlice } from "@reduxjs/toolkit";
import { getUserByTokenThunk } from "store/authService";
import { UserLogin } from "types";
type UserServiceInitialState = {
  userLogin?: UserLogin;
};
const initialState: UserServiceInitialState = {};

const userServiceSlice = createSlice({
  name: "userService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserByTokenThunk.fulfilled, (state, action) => {
      state.userLogin = action.payload;
    });
  },
});
export const { actions: userServiceActions, reducer: userServiceReducer } =
  userServiceSlice;
