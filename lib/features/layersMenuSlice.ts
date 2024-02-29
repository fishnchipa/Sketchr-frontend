import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid";


const initalId = uuidv4();
const initialState = { 
  open: false,
  layers: [
    {
      id: initalId,
      name: "Layer 0",
      isHidden: false,
    }
  ],
  selected: initalId,
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

      const newLayer = {
        id: uuidv4(),
        name: `Layer ${state.layers.length}`,
        isHidden: false,
      }
      state.layers = [...state.layers, newLayer];

    },
    changeLayer: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
    changeLayerPosition: (state, action: PayloadAction<{id: string, index: number}>) => {
      const layerIndex = state.layers.findIndex(value => value.id === action.payload.id);
      const layer = state.layers.find(value => value.id === action.payload.id);
      if (layer) {
        const tempArr = state.layers.slice();
        tempArr.splice(layerIndex, 1);
        tempArr.splice(state.layers.length - action.payload.index, 0, layer);
        state.layers = tempArr;
  
      }
    },
    deleteLayer: (state, action: PayloadAction<string>) => {
      const index = state.layers.findIndex(value => value.id === action.payload);
      state.layers.splice(index, 1);
    },
    changeVisibility: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.layers.findIndex((value) => value.id === id);
      if (index) {
   
        const result = state.layers[index];
        state.layers[index] = {...result, isHidden: true};
      }
      
    },
    
  }

})

export const { openMenu, closeMenu, cycleMenu, addNewLayer, changeLayer, changeVisibility, changeLayerPosition } = LayerMenuSlice.actions;
export default LayerMenuSlice.reducer;