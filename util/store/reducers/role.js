const initialState = {
    roles: [],
    isLoading: false
}

const roles = (state = initialState, action) => {
    switch (action.type){
        case "GET_ROLES_SUCCESS":
            return {
                isLoading: false,
                roles: action.payload.data
            }
        case "REQUEST_ROLES":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default roles