const initialState = {
    all_mobil: [],
    message: null,
    errors:null,
    isLoading: false
}

const mobil = (state=initialState, action) => {
    switch(action.type){
        case "CREATE_MOBIL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_MOBIL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_MOBIL_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "DELETE_MOBIL_FAILED":
            return {
                ...state,
                message: null,
                errors: action.payload,
                isLoading: false
            }
        case "UPDATE_MOBIL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_MOBIL_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_MOBIL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_MOBIL_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_MOBIL_SUCCESS":
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
        case "GET_MOBIL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                all_mobil: action.payload.data
            }
        case "REQUEST_MOBIL":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default mobil