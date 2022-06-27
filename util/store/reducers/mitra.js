const initialState = {
    all_mitra: [],
    message: null,
    errors:null,
    isLoading: false
}

const mitra = (state=initialState, action) => {
    switch(action.type){
        case "CREATE_MITRA_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_MITRA_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_MITRA_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "DELETE_MITRA_FAILED":
            return {
                ...state,
                message: null,
                errors:action.payload,
                isLoading: false
            }
        case "UPDATE_MITRA_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_MITRA_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_MITRA_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_MITRA_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_MITRA_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "RESET_MESSAGES":
            return {
                ...state,
                message: null,
                errors: null
            }
        case "GET_MITRA_SUCCESS":
            return {
                ...state,
                isLoading: false,
                all_mitra: action.payload.data
            }
        case "REQUEST_MITRA":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default mitra