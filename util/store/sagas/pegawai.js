import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url = base_api_url + '/pegawai'

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
        yield put({type: "GET_PEGAWAI_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_PEGAWAI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_PEGAWAI", get)
}

function* createPegawai(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('role_id', payload.role_id)
        formdata.append('name', payload.name)
        if (payload.picture !== null)
            formdata.append('picture', payload.picture, payload.picture.name)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('address', payload.address)
        formdata.append('phone', payload.phone)
        formdata.append('email', payload.email)

        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_PEGAWAI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "CREATE_PEGAWAI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreatePegawai() {
    yield takeEvery("CREATE_PEGAWAI_REQUEST", createPegawai)
}

function* deletePegawai(actions) {
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


        yield put({type: "DELETE_PEGAWAI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "DELETE_PEGAWAI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeletePegawai() {
    yield takeEvery("DELETE_PEGAWAI_REQUEST", deletePegawai)
}

function* updatePegawai(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('role_id', payload.role_id)
        formdata.append('name', payload.name)
        if (payload.picture) {
            formdata.append('picture', payload.picture, payload.picture.name)
        }
        else
            formdata.append('picture', null)
        formdata.append('birthdate', payload.birthdate)
        formdata.append('gender', payload.gender)
        formdata.append('address', payload.address)
        formdata.append('phone', payload.phone)
        formdata.append('email', payload.email)
        if(payload.old_password)
            formdata.append('old_password', payload.old_password)
        if(payload.password)
            formdata.append('password', payload.password)

        const response = yield axios.post(`${url}/${payload.id}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_PEGAWAI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "UPDATE_PEGAWAI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdatePegawai() {
    yield takeEvery("UPDATE_PEGAWAI_REQUEST", updatePegawai)
}