import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";
import {isBlob} from "next/dist/server/web/is";

const url = base_api_url + '/driver'

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
        yield put({type: "GET_DRIVER_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_DRIVER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_DRIVER", get)
}

function* createDriver(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {
        const formdata = new FormData()
        formdata.append('name', payload.name)
        if (payload.picture !== null)
            formdata.append('picture', payload.picture, payload.picture.name)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('address', payload.address)
        formdata.append('phone', payload.phone)
        formdata.append('email', payload.email)
        formdata.append('language', payload.language)
        formdata.append('price', payload.price)
        formdata.append('status', payload.status)
        formdata.append('file_sim', payload.file_sim, payload.file_sim.name)
        formdata.append('file_bebas_napza', payload.file_bebas_napza, payload.file_bebas_napza.name)
        formdata.append('file_sk_jiwa', payload.file_sk_jiwa, payload.file_sk_jiwa.name)
        formdata.append('file_sk_jasmani', payload.file_sk_jasmani, payload.file_sk_jasmani.name)
        formdata.append('file_skck', payload.file_skck, payload.file_skck.name)


        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_DRIVER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "CREATE_DRIVER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreateDriver() {
    yield takeEvery("CREATE_DRIVER_REQUEST", createDriver)
}

function* deleteDriver(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const response = yield axios.delete(`${url}/${payload.id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })


        yield put({type: "DELETE_DRIVER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "DELETE_DRIVER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeleteDriver() {
    yield takeEvery("DELETE_DRIVER_REQUEST", deleteDriver)
}

function* updateDriver(actions) {
    const { payload } = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('name', payload.name)
        console.log("PICTURE FROM SAGAS")
        console.log(payload.picture)
        if (payload.picture !== undefined && payload.picture !== null && payload.hasOwnProperty('picture') && isBlob(payload.picture))
            formdata.append('picture', payload.picture, payload.picture.name)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('address', payload.address)
        formdata.append('phone', payload.phone)
        formdata.append('email', payload.email)
        formdata.append('language', payload.language)
        formdata.append('price', payload.price)
        formdata.append('status', payload.status)
        if (payload.file_sim !== null && payload.hasOwnProperty('file_sim') && isBlob(payload.file_sim))
            formdata.append('file_sim', payload.file_sim, payload.file_sim.name)
        if (payload.file_bebas_napza !== null && payload.hasOwnProperty('file_bebas_napza') && isBlob(payload.file_bebas_napza))
            formdata.append('file_bebas_napza', payload.file_bebas_napza, payload.file_bebas_napza.name)
        if (payload.file_sk_jiwa !== null && payload.hasOwnProperty('file_sk_jiwa') && isBlob(payload.file_sk_jiwa))
            formdata.append('file_sk_jiwa', payload.file_sk_jiwa, payload.file_sk_jiwa.name )
        if (payload.file_sk_jasmani !== null && payload.hasOwnProperty('file_sk_jasmani') && isBlob(payload.file_sk_jasmani))
            formdata.append('file_sk_jasmani', payload.file_sk_jasmani, payload.file_sk_jasmani.name)
        if (payload.file_skck !== null && payload.hasOwnProperty('file_skck') && isBlob(payload.file_skck))
            formdata.append('file_skck', payload.file_skck, payload.file_skck.name)

        const response = yield axios.post(`${url}/${payload.id}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_DRIVER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "UPDATE_DRIVER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateDriver() {
    yield takeEvery("UPDATE_DRIVER_REQUEST", updateDriver)
}