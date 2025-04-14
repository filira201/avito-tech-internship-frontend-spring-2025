import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../../models/models";

const initialState: ModalState = {
  isOpen: false,
  isCreate: true,
  context: {
    fromBoard: false,
    fromTasks: false,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        isCreate: boolean;
        context?: Partial<ModalState["context"]>;
      }>
    ) => {
      state.isOpen = true;
      state.isCreate = action.payload.isCreate;
      state.context = {
        ...state.context,
        ...action.payload.context,
      };
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.context = initialState.context;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
