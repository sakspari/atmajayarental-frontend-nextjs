export const getPromo = () => {
    return {
        type: "REQUEST_PROMO"
    }
}

export const createPromo = (promo) => {
    return {
        type: "CREATE_PROMO_REQUEST",
        payload: promo
    }
}

export const deletePromo = (promo) => {
    return {
        type: "DELETE_PROMO_REQUEST",
        payload: promo
    }
}

export const updatePromo = (promo) => {
    return {
        type: "UPDATE_PROMO_REQUEST",
        payload: promo
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}