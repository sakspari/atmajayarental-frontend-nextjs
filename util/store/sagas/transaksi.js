import {put, takeEvery} from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";
import {isBlob} from "next/dist/server/web/is";

const url = base_api_url + '/transaksi'

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
        yield put({type: "GET_TRANSAKSI_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_TRANSAKSI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGet() {
    yield takeEvery("REQUEST_TRANSAKSI", get)
}

//get transaksi dari customer tertentu
function* getCustomerTransaction(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {
        const response = yield  axios.get(`${url}-customer/${payload}`, {
            headers: {
                "Authorization": 'Bearer ' + token,
                'Accept': 'application/json'
            },
            // validateStatus: () => true,
        })
        yield put({type: "GET_TRANSAKSI_CUSTOMER_SUCCESS", payload: response.data})
    } catch (e) {
        yield put({type: "GET_TRANSAKSI_CUSTOMER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchGetCustomerTransaction() {
    yield takeEvery("REQUEST_TRANSAKSI_CUSTOMER", getCustomerTransaction)
}

//request car
function* getAvailableCar(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('waktu_mulai', payload.waktu_mulai)
        formdata.append('waktu_selesai', payload.waktu_selesai)

        const response = yield axios.post(base_api_url + '/mobil-available', formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "GET_AVAILABLE_CAR_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "GET_AVAILABLE_CAR_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchgetAvailableCar() {
    yield takeEvery("GET_AVAILABLE_CAR_REQUEST", getAvailableCar)
}

//request car
function* getAvailableDriver(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('waktu_mulai', payload.waktu_mulai)
        formdata.append('waktu_selesai', payload.waktu_selesai)

        const response = yield axios.post(base_api_url + '/driver-available', formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "GET_AVAILABLE_DRIVER_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "GET_AVAILABLE_DRIVER_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchgetAvailableDriver() {
    yield takeEvery("GET_AVAILABLE_DRIVER_REQUEST", getAvailableDriver)
}

function* createTransaksi(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const formdata = new FormData()
        formdata.append('id_mobil', payload.id_mobil)
        formdata.append('id_customer', payload.id_customer)
        formdata.append('waktu_mulai', payload.waktu_mulai)
        formdata.append('waktu_selesai', payload.waktu_selesai)
        formdata.append('status_transaksi', payload.status_transaksi)
        if (payload.id_driver !== null && payload.id_driver !== undefined)
            formdata.append('id_driver', payload.id_driver)
        if (payload.subtotal_mobil !== null && payload.subtotal_mobil !== undefined)
            formdata.append('subtotal_mobil', payload.subtotal_mobil)
        if (payload.subtotal_driver !== null && payload.subtotal_driver !== undefined && payload.subtotal_driver !== 0)
            formdata.append('subtotal_driver', payload.subtotal_driver)


        const response = yield axios.post(url, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "CREATE_TRANSAKSI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "CREATE_TRANSAKSI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchCreateTransaksi() {
    yield takeEvery("CREATE_TRANSAKSI_REQUEST", createTransaksi)
}

function* deleteTransaksi(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {

        const response = yield axios.delete(`${url}/${payload.id_transaksi}`,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })


        yield put({type: "DELETE_TRANSAKSI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "DELETE_TRANSAKSI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchDeleteTransaksi() {
    yield takeEvery("DELETE_TRANSAKSI_REQUEST", deleteTransaksi)
}

function* updatetransaksi(actions) {
    const {payload} = actions
    const token = localStorage.getItem("token");

    try {
        const formdata = new FormData()
        formdata.append('id_mobil', payload.id_mobil)
        formdata.append('id_transaksi', payload.id_transaksi)
        formdata.append('id_customer', payload.id_customer)
        formdata.append('waktu_mulai', payload.waktu_mulai)
        formdata.append('waktu_selesai', payload.waktu_selesai)
        formdata.append('status_transaksi', payload.status_transaksi)
        if (payload.waktu_pengembalian !== null && payload.waktu_pengembalian !== undefined)
            formdata.append('waktu_pengembalian', payload.waktu_pengembalian)
        if (payload.id_pegawai !== null && payload.id_pegawai !== undefined)
            formdata.append('id_pegawai', payload.id_pegawai)
        if (payload.id_driver !== null && payload.id_driver !== undefined)
            formdata.append('id_driver', payload.id_driver)
        if (payload.subtotal_mobil !== null && payload.subtotal_mobil !== undefined)
            formdata.append('subtotal_mobil', payload.subtotal_mobil)
        if (payload.subtotal_driver !== null && payload.subtotal_driver !== undefined && payload.subtotal_driver !== 0)
            formdata.append('subtotal_driver', payload.subtotal_driver)
        if (payload.total_denda !== null && payload.total_denda !== undefined)
            formdata.append('total_denda', payload.total_denda)
        if (payload.total_diskon !== null && payload.total_diskon !== undefined)
            formdata.append('total_diskon', payload.total_diskon)
        if (payload.grand_total !== null && payload.grand_total !== undefined)
            formdata.append('grand_total', payload.grand_total)
        if (payload.metode_pembayaran !== null && payload.metode_pembayaran !== undefined && payload.metode_pembayaran !== 0)
            formdata.append('metode_pembayaran', payload.metode_pembayaran)
        if (payload.bukti_pembayaran !== null && payload.bukti_pembayaran !== undefined && isBlob((payload.bukti_pembayaran)))
            formdata.append('bukti_pembayaran', payload.bukti_pembayaran, payload.bukti_pembayaran.name)
        if (payload.status_transaksi !== null && payload.status_transaksi !== undefined && payload.status_transaksi !== 0)
            formdata.append('status_transaksi', payload.status_transaksi)
        if (payload.rating_driver !== null && payload.rating_driver !== undefined && payload.rating_driver !== 0)
            formdata.append('rating_driver', payload.rating_driver)
        if (payload.review_driver !== null && payload.review_driver !== undefined && payload.review_driver !== 0)
            formdata.append('review_driver', payload.review_driver)
        if (payload.kode_promo !== null && payload.kode_promo !== undefined && payload.kode_promo !== 0)
            formdata.append('kode_promo', payload.kode_promo)

        const response = yield axios.post(`${url}/${payload.id_transaksi}?_method=PUT`, formdata,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
            })
        yield put({type: "UPDATE_TRANSAKSI_SUCCESS", payload: response.data})

    } catch (e) {
        yield put({type: "UPDATE_TRANSAKSI_FAILED", payload: e.response.data})
        console.log(e)
    }
}

export function* watchUpdateTransaksi() {
    yield takeEvery("UPDATE_TRANSAKSI_REQUEST", updatetransaksi)
}