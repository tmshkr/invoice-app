import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { nestAPI } from "../services/nestAPI";

export interface UserState {
  value: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    access_token: string;
  } | null;
}

const initialState: UserState = {
  value: JSON.parse(localStorage.getItem("user")!) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        state.value = null;
        return;
      }

      const { access_token } = action.payload;
      nestAPI.defaults.headers.common["Authorization"] =
        `Bearer ${access_token}`;

      state.value = action.payload;

      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error(error);
      }
    },
    clearUser: (state) => {
      nestAPI.defaults.headers.common["Authorization"] = "";
      state.value = null;

      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
export default userSlice.reducer;
