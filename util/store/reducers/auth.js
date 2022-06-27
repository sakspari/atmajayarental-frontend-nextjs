const initialState = {
    isAuthenticate: false,
    userType: null,
    currentUser: null,
    isLoading: false,
    errors: null,
    message: null,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_REQUEST":
            return {
                ...state,
                isLoading: true,
                userType: null,
                currentUser: null,
            }
        // case "LOGOUT_REQUEST":
        // {
        //     localStorage.removeItem('token')
        //     localStorage.removeItem('persist:persist-auth')
        //     return {
        //         isAuthenticate: false,
        //         userType: null,
        //         currentUser: null,
        //         isLoading: false,
        //         errors: null,
        //     }
        // }break
        // case "LOGOUT_SUCCESS":
        //     localStorage.removeItem('token')
        //     localStorage.removeItem('persist:persist-auth')
        //     return {
        //         isAuthenticate: false,
        //         userType: null,
        //         currentUser: null,
        //         isLoading: false,
        //         errors: null,
        //         message: action.payload.message
        //     }
        // case "LOGOUT_FAILED":
        //     return{
        //         ...state,
        //         isLoading: false,
        //         errors: action.payload,
        //         message: null
        //     }
        case "AUTH_SUCCESS":
            return {
                currentUser: action.payload.user_detail,
                userType: action.payload.user.level,
                message: action.payload.message,
                isAuthenticate: true,
                isLoading: false,
                errors: null
            }
        case "AUTH_FAILED":
            return {
                ...state,
                isLoading: false,
                userType: null,
                currentUser: null,
                errors: action.payload
            }
        case "RESET_ERRORS":
            return {
                ...state,
                errors: null,
                isLoading: false
            }
        case "RESET_MESSAGE":
            return {
                ...state,
                message: null,
                isLoading: false
            }
        case "LOGOUT": {
            localStorage.removeItem('token')
            localStorage.removeItem('persist:persist-auth')
            return {
                isAuthenticate: false,
                userType: null,
                currentUser: null,
                isLoading: false,
                errors: null,
                message: "logout success!",
            }
        }
        case "REQUEST_LOGIN_USER_SUCCESS":
            return {
                ...state,
                currentUser: action.payload,
            }

        default:
            return state
    }
}

export default auth