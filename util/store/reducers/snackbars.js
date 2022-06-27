const initialState = {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: ""
};

const snackbar = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SNACKBAR":
            const { snackbarOpen, snackbarMessage, snackbarType } = action;
            return {
                ...state,
                snackbarOpen: action.payload.snackbarOpen,
                snackbarType: action.payload.snackbarType,
                snackbarMessage: action.payload.snackbarMessage
            };
        default:
            return state;
    }
};

export default snackbar
