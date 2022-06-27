const initialState = {
    all_transaction: [],
    customer_transaction: [],
    available_car:[],
    available_driver:[],
    savedTransaction: null,
    proceedCar: null,
    isOpenModal: false,
    message: null,
    errors: null,
    isLoading: false
}

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROCEED_CAR":
            return {
                ...state,
                message: null,
                errors: null,
                isLoading: false,
                proceedCar: action.payload
            }
        case "CREATE_SAVED_TRANSAKSI":
            return {
                ...state,
                savedTransaction: action.payload
            }
        case "RESET_AVAILABLE_CAR":
            return {
                ...state,
                available_car: []
            }
        case "GET_AVAILABLE_CAR_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "GET_AVAILABLE_CAR_SUCCESS":
            return {
                ...state,
                message: action.payload.message,
                available_car: action.payload.data,
                isLoading: false
            }
        case "GET_AVAILABLE_CAR_FAILED":
            return {
                ...state,
                errors: action.payload.message,
                isLoading: false
            }
        case "GET_AVAILABLE_DRIVER_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "GET_AVAILABLE_DRIVER_SUCCESS":
            return {
                ...state,
                available_driver: action.payload.data,
                errors: null,
                isLoading: false
            }
        case "GET_AVAILABLE_DRIVER_FAILED":
            return {
                ...state,
                message: null,
                errors: action.payload.data,
                isLoading: false
            }
        case "CREATE_TRANSAKSI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "DELETE_TRANSAKSI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "DELETE_TRANSAKSI_SUCCESS":
            return {
                ...state,
                errors: null,
                isOpenModal: false,
                isLoading: false,
                message: action.payload
            }
        case "UPDATE_TRANSAKSI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isLoading: true
            }
        case "UPDATE_TRANSAKSI_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_TRANSAKSI_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors: null,
                message: action.payload
            }
        case "CREATE_TRANSAKSI_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_TRANSAKSI_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors: null,
                message: action.payload
            }
        case "RESET_MESSAGES":
            return {
                ...state,
                message: null,
                errors: null
            }
        case "GET_TRANSAKSI_SUCCESS":
            return {
                ...state,
                isLoading: false,
                all_transaction: action.payload.data,
            }
        case "GET_TRANSAKSI_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            }
        case "REQUEST_TRANSAKSI":
            return {
                ...state,
                isLoading: true
            }
        case "GET_TRANSAKSI_CUSTOMER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                customer_transaction: action.payload.data,
                errors: null,
            }
        case "GET_TRANSAKSI_CUSTOMER_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            }
        case "REQUEST_TRANSAKSI_CUSTOMER":
            return {
                ...state,
                isLoading: true,
                errors: null,
            }
        default:
            return state
    }
}

export default transaction