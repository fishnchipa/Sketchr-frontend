import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HSVType, toolOptions } from "@/lib/types";
import { hsvToRGB, rgbToHEX } from "../utils";



type ToolType = {
	selected: toolOptions,
	size: number,
	opacity: number,
	color: {
		hex: string,
		hsv: {
			hue: number,
			saturation: number,
			value: number
		}
	}
}

const initialState: ToolType = {
	selected: "brush" as toolOptions,
	size: 5,
	opacity: 100,
	color: {
		hex: "#000000",
		hsv: {
			hue: 0,
			saturation: 0,
			value: 0
		}
	}
}

const ToolSlice = createSlice({
	name: "toolSlice",
	initialState,
	reducers: {
		changeTool: (state, action: PayloadAction<toolOptions>) => {
			switch(action.payload) {
				case "brush":
					state.selected = "brush";
			
					break;

				case "eraser":
					state.selected = "eraser";
			
					break;

				case "cursor":
					state.selected = "cursor";
				
				
				case "fill":
				
				
				case "eyedrop":
			}

		},
		changeSize: (state, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
		changeOpacity: (state, action: PayloadAction<number>) => {
			state.opacity = action.payload;
		},
		changeColor: (state, action: PayloadAction<HSVType>) => {
			const hsv = action.payload;
			state.color.hsv = hsv;
			const rgb = hsvToRGB(hsv.hue, hsv.saturation, hsv.value);
			const hex = rgbToHEX(Math.round(rgb.red), Math.round(rgb.green), Math.round(rgb.blue));
			state.color.hex = hex;
			console.log(hex);
		}
	}
})

export const { changeTool, changeSize, changeOpacity, changeColor } = ToolSlice.actions;
export default ToolSlice.reducer;