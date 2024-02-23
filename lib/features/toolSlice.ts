import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Point } from "@/lib/types";

type toolOptions = "brush" | "eraser" | "cursor" | "fill" | "eyedrop"; 

type ToolType = {
	selected: toolOptions,
	size: number,
	opacity: number,
	color: string
}

const initialState: ToolType = {
	selected: "brush" as toolOptions,
	size: 5,
	opacity: 100,
	color: "#000000"
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
				
				
				
				case "fill":
				
				
				case "eyedrop":
			}

		},
		changeSize: (state, action: PayloadAction<number>) => {
			state.size = action.payload;
		},
		changeOpacity: (state, action: PayloadAction<number>) => {
			state.opacity = action.payload;
		}  
	}
})

export const { changeTool, changeSize, changeOpacity } = ToolSlice.actions;
export default ToolSlice.reducer;