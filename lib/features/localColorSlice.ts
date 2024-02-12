import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { hsvToHSL, hsvToRGB } from "../utils";
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

type HSVInputType = "saturation" | "value";
type HSLInputType = "saturation" | "lightness";


const hsvChange: CaseReducer<ColorType, PayloadAction<{value: number, mode:HSVInputType}>> = (state, action) => {
  const graphic = action.payload.mode;

  let hueHSV = state.hsv.hue;
  let saturationHSV = state.hsv.saturation;
  let valueHSV = state.hsv.value;

  switch (graphic) {
    case "saturation":
      saturationHSV = action.payload.value;
      state.hsv.saturation = saturationHSV;
      break;
    case "value": 
      valueHSV = action.payload.value;
      state.hsv.value = valueHSV;
      break;
  }

  const { 
    hue: hueHSL, 
    saturation: saturationHSL, 
    lightness: lightnessHSL 
  } = hsvToHSL(hueHSV, saturationHSV, valueHSV);

  state.hsl.hue = hueHSL;
  state.hsl.saturation = saturationHSL;
  state.hsl.lightness = lightnessHSL;

  const { red, green, blue } = hsvToRGB(hueHSV, saturationHSV, valueHSV);

  state.rgb.red = red;
  state.rgb.green = green;
  state.rgb.blue = blue;
}

const hslChange: CaseReducer<ColorType, PayloadAction<{value: number, mode:HSLInputType}>> = (state, action) => {
  const graphic = action.payload.mode;

  let hueHSL =  state.hsl.hue;
  let saturationHSL = state.hsl.saturation;
  let lightnessHSL = state.hsl.lightness;

  switch (graphic) {
    case "saturation":
      saturationHSL = action.payload.value;
      state.hsl.saturation = saturationHSL;
      break;
    case "lightness": 
      lightnessHSL = action.payload.value;
      state.hsl.lightness = lightnessHSL
      break;
  }

  

}

const localColorSlice = createSlice({
  name: "localColor",
  initialState,
  reducers: {
    hsvChangeSV: (state, action: PayloadAction<{ s: number, v: number }>) => {
      const hueHSV = state.hsv.hue;
      const saturationHSV = action.payload.s;
      const valueHSV = action.payload.v;

      state.hsv.saturation = saturationHSV;
      state.hsv.value = valueHSV;

      const { 
        hue: hueHSL, 
        saturation: saturationHSL, 
        lightness: lightnessHSL 
      } = hsvToHSL(hueHSV, saturationHSV, valueHSV);

      state.hsl.hue = hueHSL;
      state.hsl.saturation = saturationHSL;
      state.hsl.lightness = lightnessHSL;

      const { red, green, blue } = hsvToRGB(hueHSV, saturationHSV, valueHSV);

      state.rgb.red = red;
      state.rgb.green = green;
      state.rgb.blue = blue;
    },
    changeHue: (state, action: PayloadAction<{ h: number }>) => {
      const hue = action.payload.h;
      state.hsl.hue = hue;
      state.hsv.hue = hue;

      const { red, green, blue } = hsvToRGB(state.hsv.hue, state.hsv.saturation, state.hsv.value);
      
      state.rgb.red = red;
      state.rgb.green = green;
      state.rgb.blue = blue;

    },

    hsvChange: hsvChange,


    resetColor: (state, action: PayloadAction<ColorType>) => {
      state.hsl = action.payload.hsl;
      state.hsv = action.payload.hsv;
      state.rgb = action.payload.rgb; 
    }
    
  }
})

export const { hsvChangeSV, changeHue, resetColor } = localColorSlice.actions;
export default localColorSlice.reducer;