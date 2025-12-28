import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.items.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const {
    showNotification,
    removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
