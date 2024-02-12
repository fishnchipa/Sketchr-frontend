import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

const modalColorSlice = createSlice({
  name: "modalColor",
  initialState,
  reducers: {
    openModalColor: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    }
  }
})

export const { openModalColor } = modalColorSlice.actions;
export default modalColorSlice.reducer;