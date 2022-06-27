const initialState = {
    detailJadwalList: [],
    message: null,
    errors:null,
    isLoading: false
}

const detailJadwal = (state=initialState, action) => {
    switch(action.type){
        case "CREATE_DETAIL_JADWAL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_DETAIL_JADWAL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "DELETE_DETAIL_JADWAL_SUCCESS":
            return {
                ...state,
                message: action.payload,
                errors:null,
                isLoading: false
            }
        case "DELETE_DETAIL_JADWAL_FAILED":
            return {
                ...state,
                message: null,
                errors:action.payload,
                isLoading: false
            }
        case "UPDATE_DETAIL_JADWAL_REQUEST":
            return {
                ...state,
                message: null,
                errors:null,
                isLoading: true
            }
        case "UPDATE_DETAIL_JADWAL_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_DETAIL_JADWAL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors:null,
                message: action.payload
            }
        case "CREATE_DETAIL_JADWAL_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_DETAIL_JADWAL_SUCCESS":
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
        case "GET_DETAIL_JADWAL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors: null,
                detailJadwalList: action.payload.data
            }
        case "REQUEST_DETAIL_JADWAL":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default detailJadwal