import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { hslToHSV, hslToRGB, hsvToHSL, hsvToRGB, rgbToHSL, rgbToHSV } from "../utils";
import { ColorType, HSLInputType, HSVInputType, RGBInputType } from "../types";



const initialState = {
  rgb: {
    red: 0,
    green: 0,
    blue: 0 
  }, 
  hsv: {
    hue: 0,
    saturation: 0,
    value: 0
  },
  hsl: {
    hue: 0,
    saturation: 0,
    lightness: 0
  },
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

      state.hsl = hsvToHSL(hueHSV, saturationHSV, valueHSV);
      state.rgb = hsvToRGB(hueHSV, saturationHSV, valueHSV);

    },
    changeHue: (state, action: PayloadAction<{ h: number }>) => {
      const hue = action.payload.h;
      state.hsl.hue = hue;
      state.hsv.hue = hue;

      state.rgb = hsvToRGB(state.hsv.hue, state.hsv.saturation, state.hsv.value);

    },

    hslChange: (state, action: PayloadAction<{value: number, mode:HSLInputType}>) => {
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
    
      state.hsv = hslToHSV(hueHSL, saturationHSL, lightnessHSL);
      state.rgb = hslToRGB(hueHSL, saturationHSL, lightnessHSL);
     

    },

    hsvChange: (state, action: PayloadAction<{value: number, mode:HSVInputType}>) => {
      
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
    
      state.hsl =  hsvToHSL(hueHSV, saturationHSV, valueHSV);
      state.rgb = hsvToRGB(hueHSV, saturationHSV, valueHSV);
    

    },

    rgbChange: (state, action: PayloadAction<{value: number, mode: RGBInputType}>) => {
      const graphic = action.payload.mode;

      let redRGB = state.rgb.red;
      let greenRGB = state.rgb.green;
      let blueRGB = state.rgb.blue;

      switch (graphic) {
        case "red":
          redRGB = action.payload.value;
          state.rgb.red = redRGB;
          break;
        case "green":
          greenRGB = action.payload.value;
          state.rgb.green = greenRGB;
          break;

        case "blue":
          blueRGB = action.payload.value;
          state.rgb.blue = blueRGB;
          break;
      }

      state.hsl = rgbToHSL(redRGB, greenRGB, blueRGB);
      state.hsv = rgbToHSV(redRGB, greenRGB, blueRGB);

    },

    resetColor: (state, action: PayloadAction<ColorType>) => {
      state.hsl = action.payload.hsl;
      state.hsv = action.payload.hsv;
      state.rgb = action.payload.rgb; 
    }
    
  }
})

export const { hsvChangeSV, changeHue, resetColor, hsvChange, hslChange, rgbChange } = localColorSlice.actions;
export default localColorSlice.reducer;