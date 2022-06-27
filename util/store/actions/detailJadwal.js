export const getDetailJadwal = () => {
    return {
        type: "REQUEST_DETAIL_JADWAL"
    }
}

export const createDetailJadwal = (detail_jadwal) => {
    return {
        type: "CREATE_DETAIL_JADWAL_REQUEST",
        payload: detail_jadwal
    }
}

export const deleteDetailJadwal = (detail_jadwal) => {
    return {
        type: "DELETE_DETAIL_JADWAL_REQUEST",
        payload: detail_jadwal
    }
}

export const updateDetailJadwal = (detail_jadwal) => {
    return {
        type: "UPDATE_DETAIL_JADWAL_REQUEST",
        payload: detail_jadwal
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}