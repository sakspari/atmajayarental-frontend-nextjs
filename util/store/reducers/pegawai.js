const initialState = {
    all_pegawai: [],
    modifiedPegawai: null,
    isOpenModal: false,
    message: null,
    errors: null,
    isLoading: false
}

const pegawai = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PEGAWAI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "DELETE_PEGAWAI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isOpenModal: false,
                isLoading: true
            }
        case "DELETE_PEGAWAI_SUCCESS":
            return {
                ...state,
                errors: null,
                isOpenModal: false,
                isLoading: false,
                message: action.payload
            }
        case "UPDATE_PEGAWAI_REQUEST":
            return {
                ...state,
                message: null,
                errors: null,
                isLoading: true
            }
        case "UPDATE_PEGAWAI_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "UPDATE_PEGAWAI_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errors: null,
                message: action.payload
            }
        case "CREATE_PEGAWAI_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
                message: null
            }
        case "CREATE_PEGAWAI_SUCCESS":
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
        case "GET_PEGAWAI_SUCCESS":
            return {
                ...state,
                isLoading: false,
                all_pegawai: action.payload.data,
            }
        // case "FILTER_PEGAWAI":
        //     console.log(state.all_pegawai)
        //     const filteredPegawai = state.all_pegawai.filter(row => {
        //         return (
        //             row.id.toString().toLowerCase().includes(action.payload.toLowerCase()) ||
        //             row.name.toLowerCase().includes(action.payload.toLowerCase())
        //         )
        //     })
        //     console.log(filteredPegawai)
        //     return {
        //         ...state,
        //         isLoading: false,
        //         all_pegawai: filteredPegawai
        //     }
        case "REQUEST_PEGAWAI":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export default pegawai