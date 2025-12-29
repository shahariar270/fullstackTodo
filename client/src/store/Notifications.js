import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.items.push(action.payload);
        },
       
    },
});

export const {
    showNotification,
    removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
