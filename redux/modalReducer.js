import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        formdata: {
            modalVisible: false,
            onPress: {},
            type: '',
            headerText: '',
            message: '',
            buttonText: ''
        }
    },
    reducers: {
        modalFormdata: (state, action) => {
            state.formdata.modalVisible = action.payload.modalVisible;
            state.formdata.onPress = action.payload.onPress;
            state.formdata.type = action.payload.type;
            state.formdata.headerText = action.payload.headerText;
            state.formdata.message = action.payload.message;
            state.formdata.buttonText = action.payload.buttonText;
        }
    },
});

export const {
    modalFormdata,
} = modalSlice.actions;

export default modalSlice.reducer;
