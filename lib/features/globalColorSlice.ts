import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColorType } from "../types";

const initialState = {
  rgb: {
    red: 128,
    green: 64,
    blue: 64 
  }, 
  hsv: {
    hue: 0,
    saturation: 0.5,
    value: 0.5
  },
  hsl: {
    hue: 0,
    saturation: 0.333,
    lightness: 0.375
  }
}

const globalColorSlice = createSlice({
  name: "globalColor",
  initialState,
  reducers: {
    setGlobalColor: (state, action: PayloadAction<ColorType>) => {
      state.hsl = action.payload.hsl;
      state.hsv = action.payload.hsv;
      state.rgb = action.payload.rgb; 
    }
  }

})

export const { setGlobalColor } = globalColorSlice.actions;
export default globalColorSlice.reducer;