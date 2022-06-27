export const getCustomer = () => {
    return {
        type: "REQUEST_CUSTOMER"
    }
}

export const createCustomer = (customer) => {
    return {
        type: "CREATE_CUSTOMER_REQUEST",
        payload: customer
    }
}

export const verifyCustomer = (customer) => {
    return {
        type: "VERIFY_CUSTOMER_REQUEST",
        payload: customer
    }
}

export const updateCustomer = (customer) => {
    return {
        type: "UPDATE_CUSTOMER_REQUEST",
        payload: customer
    }
}

export const resetMessage = () => {
    return{
        type: "RESET_MESSAGES"
    }
}