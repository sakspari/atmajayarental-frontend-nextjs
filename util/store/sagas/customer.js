import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";
import {isBlob} from "next/dist/server/web/is";
import {applyMiddleware} from "redux";

const url = base_api_url + '/customer'
const url_verify = base_api_url + '/verify-customer'

function* get() {
    const token = localStorage.getItem("token");

    try {
        const response = yield  axios.get(`${url}`, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Accept': 'application/json'
            },
            // validateStatus: () => true,
        })
        yield put({type: "GET_CUSTOMER_SUCCESS", payload: response.data})
    } catch (e) {
        // yield put({type: "GET_CUSTOMER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_CUSTOMER", get)
}

function* createCustomer(actions) {
    const {payload} = actions
    // const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('name', payload.name)
        if (payload.picture !== null && isBlob(payload.picture))
            formdata.append('picture', payload.picture, payload.picture.name)
        formdata.append('address', payload.address)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('email', payload.email)
        formdata.append('phone', payload.phone)
        formdata.append('idcard', payload.idcard, payload.idcard.name)
        if (payload.sim !== null && isBlob(payload.sim))
            formdata.append('sim', payload.sim, payload.sim.name)

        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    // "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_CUSTOMER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "CREATE_CUSTOMER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreateCustomer() {
    yield takeEvery("CREATE_CUSTOMER_REQUEST", createCustomer)
}


function* updateCustomer(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('name', payload.name)
        if (payload.picture !== undefined && payload.picture !== null && payload.hasOwnProperty('picture') && isBlob(payload.picture))
            formdata.append('picture', payload.picture, payload.picture.name)
        formdata.append('address', payload.address)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('email', payload.email)
        formdata.append('phone', payload.phone)
        if (payload.idcard !== undefined && payload.idcard !== null && payload.hasOwnProperty('idcard') && isBlob(payload.idcard))
            formdata.append('idcard', payload.idcard, payload.idcard.name)
        if (payload.sim !== undefined && payload.sim !== null && payload.hasOwnProperty('sim') && isBlob(payload.sim))
            formdata.append('sim', payload.sim, payload.idcard.name)
        if (payload.old_password)
            formdata.append('old_password', payload.old_password)
        if (payload.password)
            formdata.append('password', payload.password)


        const response = yield axios.post(`${url}/${payload.id}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
            })
        yield put({type: "UPDATE_CUSTOMER_SUCCESS", payload: response.data})

    } catch (e) {
        // yield put({type: "UPDATE_CUSTOMER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateCustomer() {
    yield takeEvery("UPDATE_CUSTOMER_REQUEST", updateCustomer)
}

function* verifyCustomer(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new URLSearchParams()

        const response = yield axios.put(`${url_verify}/${payload.id}`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
            })
        yield put({type: "VERIFY_CUSTOMER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "VERIFY_CUSTOMER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchVerifyCustomer() {
    yield takeEvery("VERIFY_CUSTOMER_REQUEST", verifyCustomer)
}