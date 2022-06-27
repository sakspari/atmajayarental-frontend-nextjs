import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url = base_api_url + '/role'

function* get(){
    console.log(url)
    // const token = localStorage.getItem("token")
    try{
        const response = yield  axios.get(`${url}`, {
            headers: {
                // "Authorization": token
            }
        })
        yield put({type: "GET_ROLES_SUCCESS", payload: response.data})
        console.log(response)
    }catch (e){
        console.log(e)
    }
}

export function* watchGet(){
    yield takeEvery("REQUEST_ROLES", get)
}