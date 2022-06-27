import {createStore, applyMiddleware, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import auth from "./reducers/auth";

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'persist-auth',
    storage,
    whitelist: ['auth'],
    blacklist:['errors']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(
        sagaMiddleware
    ))
)

const persistedStore = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
export {persistedStore}