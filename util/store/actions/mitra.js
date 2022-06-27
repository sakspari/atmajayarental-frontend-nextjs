export const getMitra = () => {
    return {
        type: "REQUEST_MITRA"
    }
}

export const createMitra = (mitra) => {
    return {
        type: "CREATE_MITRA_REQUEST",
        payload: mitra
    }
}

export const deleteMitra = (mitra) => {
    return {
        type: "DELETE_MITRA_REQUEST",
        payload: mitra
    }
}

export const updateMitra = (mitra) => {
    return {
        type: "UPDATE_MITRA_REQUEST",
        payload: mitra
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}