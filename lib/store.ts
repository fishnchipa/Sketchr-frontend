import { configureStore } from "@reduxjs/toolkit";
import localColorReducer from "@/lib/features/localColorSlice";
import globalColorReducer from "@/lib/features/globalColorSlice";
import modalColorSlice from "@/lib/features/modalColorSlice";
import homeMenuSlice from "@/lib/features/homeMenuSlice";
import usersMenuSlice from "@/lib/features/usersMenuSlice";
import layersMenuSlice from "@/lib/features/layersMenuSlice";
import toolSlice from "@/lib/features/toolSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      localColor: localColorReducer,
      globalColor: globalColorReducer,
      modalColor: modalColorSlice,
      homeMenu: homeMenuSlice,
      usersMenu: usersMenuSlice,
      layerMenu: layersMenuSlice,
      tools: toolSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']