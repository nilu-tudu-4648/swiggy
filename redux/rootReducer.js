import { createSlice } from "@reduxjs/toolkit";

export const rootSlice = createSlice({
    name: "root",
    initialState: {
        openSheet: {
            open: false,
            food: {}
        }
    },
    reducers: {
        toggleBottomSheet: (state, action) => {
            state.openSheet.open = action.payload.open;
            state.openSheet.food = action.payload.food;
        }
    },
});

export const {
    toggleBottomSheet,
} = rootSlice.actions;

export default rootSlice.reducer;
