import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { getToken, removeToken } from "utils";
import { getUserByTokenThunk, loginThunk } from "./thunk";
type AuthServiceInitialState = {
  token: string | null;
  userLogin?: UserLogin;
  isFetchingLogin: boolean;
};
const initialState: AuthServiceInitialState = {
  token: getToken() ?? null,
  isFetchingLogin: false,
};

const authServiceSlice = createSlice({
  name: "authService",
  initialState,
  reducers: {
    //xử lý action đồng bộ
    logOut: (state, { payload }: PayloadAction<string>) => {
      console.log("payload: ", payload);
      state.token = undefined;
      state.userLogin = undefined;
      removeToken();
    },
  },
  extraReducers(builder) {
    //xử lý action bất đồng bộ => callAPI
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        //lưu token xg localStorage
        localStorage.setItem("TOKEN", payload.token);
        state.token = payload.token;
        //set lại user
        state.userLogin = payload;
        state.isFetchingLogin = false;
      })
      
      .addCase(getUserByTokenThunk.fulfilled, (state, { payload }) => {
        state.userLogin = payload;
      });
  },
});
export const { actions: authServiceActions, reducer: authServiceReducer } =
  authServiceSlice;
