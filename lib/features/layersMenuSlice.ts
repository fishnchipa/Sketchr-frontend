import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState = { 
	open: false,
	layers: [0],
	selected: 0,
	isHidden: [false]
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
		addNewLayer: (state) => {
			// TODO: implement add new layer better

			const id = state.layers.length;
			state.layers.push(id);
			state.isHidden.push(false);
		},
		changeLayer: (state, action: PayloadAction<number>) => {
			state.selected = action.payload;
		},
		changeVisibility: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			state.isHidden[id] = !state.isHidden[id];
		},
		
	}

})

export const { openMenu, closeMenu, cycleMenu, addNewLayer, changeLayer, changeVisibility } = LayerMenuSlice.actions;
export default LayerMenuSlice.reducer;