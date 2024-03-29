import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { 
  open: false,
  wheel: {
    square: {
      x: 0,
      y: 0
    },
    circle: {
      x: 0,
      y: 0
    }
  }
};

const modalColorSlice = createSlice({
  name: "modalColor",
  initialState,
  reducers: {
    openModalColor: (state) => {
      state.open = true;
    },
    closeModalColor: (state) => {
      state.open = false;
    },
    cycleModalColor: (state) => {
      state.open = !state.open;
    }
  }
})



export const { openModalColor, closeModalColor, cycleModalColor } = modalColorSlice.actions;
export default modalColorSlice.reducer;