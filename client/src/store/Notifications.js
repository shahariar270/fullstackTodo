import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    message: "",
    type: "info",
    duration: 2000
};

const notificationsSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.visible = true;
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
            state.duration = action.payload.duration || 1000
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