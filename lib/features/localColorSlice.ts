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

type ModeType = "s" | "v";



const hsvChange: CaseReducer<ColorType, PayloadAction<{value: number, mode:ModeType}>> = (state, action) => {
	const graphic = action.payload.mode;

	let hueHSV = state.hsv.hue;
	let saturationHSV = state.hsv.saturation;
	let valueHSV = state.hsv.value;

	switch (graphic) {
		case "s":
			saturationHSV = action.payload.value;
			state.hsv.saturation = saturationHSV;
			break;
		case "v": 
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
		hsvChangeS: (state, action: PayloadAction<number>) => {
			const hueHSV = state.hsv.hue;
			const saturationHSV = action.payload;
			const valueHSV = state.hsv.value;

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
		hsvChangeV: (state, action: PayloadAction<number>) => {
			const hueHSV = state.hsv.hue;
			const saturationHSV = state.hsv.saturation;
			const valueHSV = action.payload;

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
		hslChangeS: (state, action: PayloadAction<number>) => {

		},
		hslChangeL: (state, action: PayloadAction<number>) => {

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
		resetColor: (state, action: PayloadAction<ColorType>) => {
			state.hsl = action.payload.hsl;
			state.hsv = action.payload.hsv;
			state.rgb = action.payload.rgb; 
		}
		
	}
})

export const { hsvChangeSV, changeHue, resetColor } = localColorSlice.actions;
export default localColorSlice.reducer;