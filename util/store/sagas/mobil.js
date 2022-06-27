import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url = base_api_url + '/mobil'

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
        yield put({type: "GET_MOBIL_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_MOBIL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_MOBIL", get)
}

function* createMobil(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        if (payload.id_mitra !== null)
            formdata.append('id_mitra', payload.id_mitra)
        formdata.append('plat_mobil', payload.plat_mobil)
        formdata.append('no_stnk', payload.no_stnk)
        formdata.append('nama_mobil', payload.nama_mobil)
        formdata.append('tipe_mobil', payload.tipe_mobil)
        formdata.append('jenis_aset', payload.jenis_aset)
        formdata.append('jenis_transmisi', payload.jenis_transmisi)
        formdata.append('jenis_bahan_bakar', payload.jenis_bahan_bakar)
        formdata.append('volume_bahan_bakar', payload.volume_bahan_bakar)
        formdata.append('warna_mobil', payload.warna_mobil)
        formdata.append('fasilitas_mobil', payload.fasilitas_mobil)
        formdata.append('volume_bagasi', payload.volume_bagasi)
        formdata.append('kapasitas_penumpang', payload.kapasitas_penumpang)
        formdata.append('harga_sewa', payload.harga_sewa)
        formdata.append('servis_terakhir', payload.servis_terakhir)
        if (payload.foto_mobil !== null)
            formdata.append('foto_mobil', payload.foto_mobil)
        if (payload.periode_mulai)
            formdata.append('periode_mulai', payload.periode_mulai)
        if (payload.periode_selesai)
            formdata.append('periode_selesai', payload.periode_selesai)

        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_MOBIL_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "CREATE_MOBIL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreateMobil() {
    yield takeEvery("CREATE_MOBIL_REQUEST", createMobil)
}

function* deleteMobil(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const response = yield axios.delete(`${url}/${payload.id_mobil}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })


        yield put({type: "DELETE_MOBIL_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "DELETE_MOBIL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeleteMobil() {
    yield takeEvery("DELETE_MOBIL_REQUEST", deleteMobil)
}

function* updateMobil(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        if (payload.id_mitra !== null)
            formdata.append('id_mitra', payload.id_mitra)
        formdata.append('plat_mobil', payload.plat_mobil)
        formdata.append('no_stnk', payload.no_stnk)
        formdata.append('nama_mobil', payload.nama_mobil)
        formdata.append('tipe_mobil', payload.tipe_mobil)
        formdata.append('jenis_aset', payload.jenis_aset)
        formdata.append('jenis_transmisi', payload.jenis_transmisi)
        formdata.append('jenis_bahan_bakar', payload.jenis_bahan_bakar)
        formdata.append('volume_bahan_bakar', payload.volume_bahan_bakar)
        formdata.append('warna_mobil', payload.warna_mobil)
        formdata.append('fasilitas_mobil', payload.fasilitas_mobil)
        formdata.append('volume_bagasi', payload.volume_bagasi)
        formdata.append('kapasitas_penumpang', payload.kapasitas_penumpang)
        formdata.append('harga_sewa', payload.harga_sewa)
        formdata.append('servis_terakhir', payload.servis_terakhir)
        if (payload.foto_mobil !== null)
            formdata.append('foto_mobil', payload.foto_mobil)
        if (payload.periode_mulai)
            formdata.append('periode_mulai', payload.periode_mulai)
        if (payload.periode_selesai)
            formdata.append('periode_selesai', payload.periode_selesai)


        const response = yield axios.post(`${url}/${payload.id_mobil}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_MOBIL_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "UPDATE_MOBIL_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateMobil() {
    yield takeEvery("UPDATE_MOBIL_REQUEST", updateMobil)
}