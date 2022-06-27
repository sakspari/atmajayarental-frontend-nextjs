export const getDriver = () => {
    return {
        type: "REQUEST_DRIVER"
    }
}

export const createDriver = (driver) => {
    return {
        type: "CREATE_DRIVER_REQUEST",
        payload: driver
    }
}

export const deleteDriver = (driver) => {
    return {
        type: "DELETE_DRIVER_REQUEST",
        payload: driver
    }
}

export const updateDriver = (driver) => {
    return {
        type: "UPDATE_DRIVER_REQUEST",
        payload: driver
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}