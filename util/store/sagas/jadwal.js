import {base_api_url} from "./base_api_url";
import axios from "axios";
import {put, takeEvery} from "redux-saga/effects"

const url = base_api_url + '/jadwal'

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
        yield put({type: "GET_JADWAL_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_JADWAL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_JADWAL", get)
}