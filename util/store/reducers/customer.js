const initialState = {
    customer: null,
    message: null,
    errors:null,
    isLoading: false
}

const customer = (state=initialState, action) => {
    switch(action.type){
        case "REQUEST_CUSTOMER":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "VERIFY_CUSTOMER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "VERIFY_CUSTOMER_FAILED":
            return {
                ...state,
                message: null,
                errors:action.payload,
                isLoading: false
            }
        case "VERIFY_CUSTOMER_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "CREATE_CUSTOMER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_CUSTOMER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_CUSTOMER_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_CUSTOMER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_CUSTOMER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_CUSTOMER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_CUSTOMER_SUCCESS":
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
        case "GET_CUSTOMER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                customer: action.payload.data
            }
        case "GET_CUSTOMER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload.data
            }
        // case "REQUEST_CUSTOMER":
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        default:
            return state
    }
}

export default customer