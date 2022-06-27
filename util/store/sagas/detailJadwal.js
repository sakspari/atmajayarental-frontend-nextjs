import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";
import {isBlob} from "next/dist/server/web/is";

const url = base_api_url + '/jadwal-pegawai'

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
        yield put({type: "GET_DETAIL_JADWAL_SUCCESS", payload: response.data})
    } catch (e) {
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_DETAIL_JADWAL", get)
}

function* createDetailJadwal(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {
        const formdata = new FormData()
        formdata.append('id_jadwal', payload.id_jadwal)
        formdata.append('id_pegawai', payload.id_pegawai)
        formdata.append('jam_mulai', payload.jam_mulai)
        formdata.append('jam_selesai', payload.jam_selesai)

        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_DETAIL_JADWAL_SUCCESS", payload: response.data})

    } catch (e) {
        console.log(e.toString())
        yield put({type: "CREATE_DETAIL_JADWAL_FAILED", payload: e.response.data})
    }
}

export function* watchCreateDetailJadwal() {
    yield takeEvery("CREATE_DETAIL_JADWAL_REQUEST", createDetailJadwal)
}

function* deleteDetailJadwal(actions) {
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


        yield put({type: "DELETE_DETAIL_JADWAL_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "DELETE_DETAIL_JADWAL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeleteDetailJadwal() {
    yield takeEvery("DELETE_DETAIL_JADWAL_REQUEST", deleteDetailJadwal)
}

function* updateDetailJadwal(actions) {
    const { payload } = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('name', payload.name)
        formdata.append('id_jadwal', payload.id_jadwal)
        formdata.append('id_pegawai', payload.id_pegawai)
        formdata.append('jam_mulai', payload.jam_mulai)
        formdata.append('jam_selesai', payload.jam_selesai)

        const response = yield axios.post(`${url}/${payload.id}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_DETAIL_JADWAL_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "UPDATE_DETAIL_JADWAL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateDetailJadwal() {
    yield takeEvery("UPDATE_DETAIL_JADWAL_REQUEST", updateDetailJadwal)
}