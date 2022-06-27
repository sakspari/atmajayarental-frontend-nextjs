const initialState = {
    all_driver: [],
    message: null,
    errors:null,
    isLoading: false
}

const driver = (state=initialState, action) => {
    switch(action.type){
        case "CREATE_DRIVER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_DRIVER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_DRIVER_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "DELETE_DRIVER_FAILED":
            return {
                ...state,
                message: null,
                errors:action.payload,
                isLoading: false
            }
        case "UPDATE_DRIVER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_DRIVER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_DRIVER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_DRIVER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_DRIVER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "RESET_MESSAGES":
            return {
                ...state,
                message: null
            }
        case "GET_DRIVER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors: null,
                all_driver: action.payload.data
            }
        case "REQUEST_DRIVER":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default driver