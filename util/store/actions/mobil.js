export const getMobil = () => {
    return {
        type: "REQUEST_MOBIL"
    }
}

export const createMobil = (mobil) => {
    return {
        type: "CREATE_MOBIL_REQUEST",
        payload: mobil
    }
}

export const deleteMobil = (mobil) => {
    return {
        type: "DELETE_MOBIL_REQUEST",
        payload: mobil
    }
}

export const updateMobil = (mobil) => {
    return {
        type: "UPDATE_MOBIL_REQUEST",
        payload: mobil
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}