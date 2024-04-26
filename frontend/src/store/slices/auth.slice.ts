import { RootState } from "@/store/store";
import { User } from "@/types/index";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  auth: User | null;
};

export const initialState: InitialStateType = {
  auth: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.auth = action.payload;
    },
    removeAuth: (state) => {
      state.auth = null;
    }
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
