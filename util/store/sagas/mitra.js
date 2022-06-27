import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url = base_api_url+'/mitra'

function* get(){
    const token = localStorage.getItem("token");

    try{
        const response = yield  axios.get(`${url}`,{
            headers: {
                "Authorization": 'Bearer '+token,
                'Accept': 'application/json'
            },
            // validateStatus: () => true,
        })
        yield put({type: "GET_MITRA_SUCCESS", payload: response.data})
    }catch (e) {
        yield put({type: "GET_MITRA_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet(){
    yield takeEvery("REQUEST_MITRA",get)
}

function* createMitra(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const formdata = new FormData()
        formdata.append('nik_mitra',payload.nik_mitra)
        formdata.append('nama_mitra',payload.nama_mitra)
        formdata.append('alamat_mitra',payload.alamat_mitra)
        formdata.append('no_telp_mitra',payload.no_telp_mitra)

        const response = yield axios.post(url,formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_MITRA_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "CREATE_MITRA_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreateMitra(){
    yield takeEvery("CREATE_MITRA_REQUEST", createMitra)
}

function* deleteMitra(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const response = yield axios.delete(`${url}/${payload.id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })


        yield put({type: "DELETE_MITRA_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "DELETE_MITRA_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeleteMitra(){
    yield takeEvery("DELETE_MITRA_REQUEST", deleteMitra)
}

function* updateMitra(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const formdata = new URLSearchParams()
        formdata.append('nik_mitra',payload.nik_mitra)
        formdata.append('nama_mitra',payload.nama_mitra)
        formdata.append('alamat_mitra',payload.alamat_mitra)
        formdata.append('no_telp_mitra',payload.no_telp_mitra)


        const response = yield axios.put(`${url}/${payload.id}`,formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_MITRA_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "UPDATE_MITRA_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateMitra(){
    yield takeEvery("UPDATE_MITRA_REQUEST", updateMitra)
}