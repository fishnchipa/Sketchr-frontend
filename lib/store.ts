import { configureStore } from "@reduxjs/toolkit";
import localColorReducer from "@/lib/features/localColorSlice";
import globalColorReducer from "@/lib/features/globalColorSlice";
import modalColorSlice from "@/lib/features/modalColorSlice";
import homeMenuSlice from "./features/homeMenuSlice";
import usersMenuSlice from "./features/usersMenuSlice";
import layersMenuSlice from "./features/layersMenuSlice";



export const makeStore = () => {
  return configureStore({
    reducer: {
      localColor: localColorReducer,
      globalColor: globalColorReducer,
      modalColor: modalColorSlice,
      homeMenu: homeMenuSlice,
      usersMenu: usersMenuSlice,
      layerMenu: layersMenuSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']