import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    message: "",
    type: "info",
};

const notificationsSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.visible = true;
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
        },
        hideNotification: (state, action) => {
            state.visible = false;
            state.message = "";
            state.type = "info";
        }
    }
})


export const {
    showNotification,
    hideNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;