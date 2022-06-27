const initialState = {
    promos: [],
    message: null,
    errors:null,
    isLoading: false
}

const promo = (state=initialState, action) => {
    switch(action.type){
        case "CREATE_PROMO_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_PROMO_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_PROMO_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "DELETE_PROMO_FAILED":
            return {
                ...state,
                message: null,
                errors: action.payload,
                isLoading: false
            }
        case "UPDATE_PROMO_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_PROMO_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_PROMO_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_PROMO_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_PROMO_SUCCESS":
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
        case "GET_PROMO_SUCCESS":
            return {
                ...state,
                isLoading: false,
                promos: action.payload.data
            }
        case "REQUEST_PROMO":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default promo