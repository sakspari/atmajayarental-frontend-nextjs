const initialState = {
    jadwals: [],
    message: null,
    errors:null,
    isLoading: false
}

const jadwal = (state=initialState, action) => {
    switch(action.type){
        case "GET_JADWAL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                jadwals: action.payload.data
            }
        case "GET_JADWAL_FAILED":
            return {
                ...state,
                isLoading: false,
                jadwals: [],
                errors: action.payload
            }
        case "REQUEST_JADWAL":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default jadwal