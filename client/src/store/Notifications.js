const initialState = {
    visible: false,
    message: "",
    type: "info",
};

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return {
                visible: true,
                message: action.payload.message,
                type: action.payload.type || "info",
            };

        case "HIDE_NOTIFICATION":
            return initialState;

        default:
            return state;
    }
};
