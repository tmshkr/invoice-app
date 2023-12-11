import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export interface ModalState {
  name: any | null;
  data: any | null;
  isVisible: boolean;
}

const initialState: ModalState = {
  name: null,
  data: null,
  isVisible: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.name = action.payload.name;
      state.data = action.payload.data;
      state.isVisible = action.payload.isVisible;
    },
  },
});

export const { setModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
