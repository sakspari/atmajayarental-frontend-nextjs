import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {base_api_url} from "./base_api_url";

const url_login = base_api_url+'/login'
const url_logout = base_api_url+'/logout'
const url_watch_user = base_api_url+'/user'

function* login(actions){
    const { payload } = actions
    try{
        const response = yield axios.post(url_login,payload,
            {
                headers: {
                    'Accept': 'application/json'
                },
                // validateStatus: () => true,
        })
        localStorage.setItem('token', response.data.access_token)
        yield put({type: "AUTH_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "AUTH_FAILED", payload: e.response.data.message})
        // console.log(e.response.data.message)
    }
}

export function* watchLogin(){
    yield takeEvery("AUTH_REQUEST", login)
}


function* getCurrentUser(actions){
    const { payload } = actions
    const token = localStorage.getItem("token");

    try{
        const response = yield axios.post(`${url_watch_user}${payload.id}`,payload,
            {
                headers: {
                    'Accept': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                // validateStatus: () => true,
        })
        localStorage.setItem('token', response.data.access_token)
        yield put({type: "REQUEST_LOGIN_USER_SUCCESS", payload: response.data})

    }catch (e) {
        yield put({type: "REQUEST_LOGIN_USER_FAILED", payload: e.response.data.message})
        console.log(e)
    }
}

export function* watchUserLogin(){
    yield takeEvery("REQUEST_LOGIN_USER_SUCCESS", getCurrentUser())
}

// function* logout(actions){
//     const { payload } = actions
//     const token = localStorage.getItem("token");
//     try{
//         const response = yield axios.post(url_logout,null,
//             {
//                 headers: {
//                     'Accept': 'application/json',
//                     "Authorization": 'Bearer ' + token,
//                 },
//                 // validateStatus: () => true,
//         })
//         localStorage.setItem('token', response.data.access_token)
//         yield put({type: "LOGOUT_SUCCESS", payload: response.data})
//
//     }catch (e) {
//         yield put({type: "LOGOUT_FAILED", payload: e.response.data})
//         console.log(e)
//     }
// }
//
// export function* watchLogout(){
//     yield takeEvery("LOGOUT_REQUEST", logout)
// }