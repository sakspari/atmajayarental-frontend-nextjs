export const loginAuth = (user) => {
    return{
        type: "AUTH_REQUEST",
        payload: user
    }
}

export const logout = () => {
    return{
        type: "LOGOUT"
    }
}
export const resetErrors = () => {
    return{
        type: "RESET_ERRORS"
    }
}
export const resetMessage = () => {
    return{
        type: "RESET_MESSAGE"
    }
}

export const getUserLogin = (user) => {
    return{
        type: "REQUEST_LOGIN_USER",
        payload: user
    }
}