import { createSlice } from "@reduxjs/toolkit"


const initialState = { 
	open: false,
	layer: []
}

const LayerMenuSlice = createSlice({
	name: "layerMenu",
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
		},
	}

})

export const { openMenu, closeMenu, cycleMenu } = LayerMenuSlice.actions;
export default LayerMenuSlice.reducer;