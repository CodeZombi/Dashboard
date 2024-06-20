import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  appState: "",
  mode: "dark",
}

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    
  },
})


export const { setMode } = appStateSlice.actions;

export const { setAppState } = appStateSlice.actions

export default appStateSlice.reducer;









