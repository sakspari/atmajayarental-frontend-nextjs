export const getPegawai = () => {
    return {
        type: "REQUEST_PEGAWAI"
    }
}

export const closeModal = () => {
    return {
        type: "CLOSE_MODAL",
    }
}
export const addModifiedPegawai = (pegawai) => {
    return {
        type: "ADD_MODIFIED_PEGAWAI",
        payload: pegawai
    }
}
export const createPegawai = (pegawai) => {
    return {
        type: "CREATE_PEGAWAI_REQUEST",
        payload: pegawai
    }
}

export const deletePegawai = (pegawai) => {
    return {
        type: "DELETE_PEGAWAI_REQUEST",
        payload: pegawai
    }
}

export const updatePegawai = (pegawai) => {
    return {
        type: "UPDATE_PEGAWAI_REQUEST",
        payload: pegawai
    }
}

export const filterPegawai = (searchKey) => {
    return {
        type: "FILTER_PEGAWAI",
        payload: searchKey
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}