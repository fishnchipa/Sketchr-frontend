import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

const HomeMenuSlice = createSlice({
  name: "homeMenu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.open = true;
    },
    closeMenu: (state) => {
      state.open = false;
    },
    cycleMenu: (state) => {
      state.open = !state.open;
    }
  }
})

export const { openMenu, closeMenu, cycleMenu } = HomeMenuSlice.actions;
export default HomeMenuSlice.reducer;