import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url = base_api_url+'/promo'

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
        yield put({type: "GET_PROMO_SUCCESS", payload: response.data})
    }catch (e) {
        yield put({type: "GET_PROMO_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet(){
    yield takeEvery("REQUEST_PROMO",get)
}

function* createPromo(actions){

    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const formdata = new FormData()
        formdata.append('kode_promo',payload.kode_promo)
        formdata.append('jenis_promo',payload.jenis_promo)
        formdata.append('picture',payload.picture)
        formdata.append('deskripsi_promo',payload.deskripsi_promo)
        formdata.append('persen_diskon',payload.persen_diskon)
        formdata.append('status_promo',payload.status_promo)

        const response = yield axios.post(url,formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_PROMO_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "CREATE_PROMO_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreatePromo(){
    yield takeEvery("CREATE_PROMO_REQUEST", createPromo)
}

function* deletePromo(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const response = yield axios.delete(`${url}/${payload.kode_promo}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })


        yield put({type: "DELETE_PROMO_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "DELETE_PROMO_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeletePromo(){
    yield takeEvery("DELETE_PROMO_REQUEST", deletePromo)
}

function* updatePromo(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{

        const formdata = new URLSearchParams()
        formdata.append('kode_promo',payload.kode_promo)
        formdata.append('jenis_promo',payload.jenis_promo)
        formdata.append('picture',payload.picture)
        formdata.append('deskripsi_promo',payload.deskripsi_promo)
        formdata.append('persen_diskon',payload.persen_diskon)
        formdata.append('status_promo',payload.status_promo)


        const response = yield axios.put(`${url}/${payload.kode_promo}`,formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer '+token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_PROMO_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "UPDATE_PROMO_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdatePromo(){
    yield takeEvery("UPDATE_PROMO_REQUEST", updatePromo)
}