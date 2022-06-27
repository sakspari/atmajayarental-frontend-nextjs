export const getTransaksi = () => {
    return {
        type: "REQUEST_TRANSAKSI"
    }
}

export const setProceedCar = (car) => {
    return {
        type: "SET_PROCEED_CAR",
        payload: car
    }
}
export const resetAvailableCar = () => {
    return {
        type: "RESET_AVAILABLE_CAR"
    }
}

export const getAvailableCar = (time) => {
    return {
        type: "GET_AVAILABLE_CAR_REQUEST",
        payload: time
    }
}

export const getAvailableDriver = (time) => {
    return {
        type: "GET_AVAILABLE_DRIVER_REQUEST",
        payload: time
    }
}
export const getTransaksiCustomer = (id_customer) => {
    return {
        type: "REQUEST_TRANSAKSI_CUSTOMER",
        payload: id_customer
    }
}

export const createTransaksi = (transaksi) => {
    return {
        type: "CREATE_TRANSAKSI_REQUEST",
        payload: transaksi
    }
}

export const updateTransaksi = (transaksi) => {
    return {
        type: "UPDATE_TRANSAKSI_REQUEST",
        payload: transaksi
    }
}

export const createSavedTransaksi = (transaksi) => {
    return {
        type: "CREATE_SAVED_TRANSAKSI",
        payload: transaksi
    }
}

export const deleteTransaksi = (transaksi) => {
    return {
        type: "DELETE_TRANSAKSI_REQUEST",
        payload: transaksi
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}